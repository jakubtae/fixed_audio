"use client";
import { toast } from "sonner";
import { Audio } from "@/lib/list";
type AudioElementProps = Audio & {
  id: number;
  cdnUrl: string;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Angry,
  Download,
  DownloadIcon,
  ExternalLink,
  Heart,
  MoreVerticalIcon,
  Paintbrush,
  Share2,
  Trash2Icon,
} from "lucide-react";
import { authClient } from "@/auth-client";

import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AnimatedAudioPlayer from "./AudioPlayer";
import { gradientMap } from "@/lib/typeColors";
import Link from "next/link";
import ReportDialog from "./ReportDialog";
import EmbedButtonEditor from "./IFramePreview";

// const gradientMap: Record<Audio["type"], string> = {
//   game: "linear-gradient(to bottom, #b91c1c, #000000)", // red → black
//   meme: "linear-gradient(to bottom, #facc15, #f97316)", // yellow → orange
//   movies: "linear-gradient(to bottom, #2563eb, #7c3aed)", // blue → purple
//   music: "linear-gradient(to bottom, #22c55e, #16a34a)", // green → darker green
//   other: "linear-gradient(to bottom, #e5e7eb, #9ca3af)", // gray → white
// };

const AudioElement = ({
  title,
  soundId,
  type,
  id,
  cdnUrl,
}: AudioElementProps) => {
  const { data: session } = authClient.useSession();
  const baseLink = typeof window !== "undefined" ? window.location.origin : "";

  const audioUrl = `${cdnUrl}/${soundId}.mp3`;
  const [ShowCustomizeDialog, setShowCustomizeDialog] = useState(false);
  const [ShowShareDialog, setShowShareDialog] = useState(false);
  const [ShowReportDialog, setShowReportDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(
    session?.user?.liked?.includes(soundId) || false,
  );

  if (!type) {
    type = "other";
  }
  const bgImage = useMemo(() => {
    return `/${type}.svg`;
  }, []); // ← empty deps = run once per mount
  const handleLiked = () => {
    // Implement your logic to handle the "like" action here
    if (!session?.user) {
      alert("You need to be logged in to like an audio.");
      return;
    }
    toast.success("Event has been created");
    fetch(`/api/sounds/likeAudio`, {
      method: "POST",
      body: JSON.stringify({ soundId: soundId, userId: session?.user.id }),
    });
    setIsLiked(!isLiked);
  };

  const handleShare = async (title: string, link: string) => {
    await navigator.share({
      title: title,
      text: "Check out this sound 🔊 - " + title,
      url: link,
    });
  };

  return (
    <div
      className="flex items-center justify-between py-2 px-6 rounded-3xl
                 shadow-[0_0px_4px_rgba(255,255,255,0.2)]
                 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="flex-center gap-2">
        <span className="text-sm text-white w-6.25">{id}</span>
        <div
          className="w-8.75 h-8.75 rounded
             shadow-[0_0px_4px_rgba(255,255,255,0.2)] flex-center"
          style={{ background: gradientMap[type] }}
        >
          <AnimatedAudioPlayer src={audioUrl} title={title} artist={type} />
        </div>
        <div className="flex flex-col">
          <h3 className="text font-semibold capitalize max-w-54 text-xs sm:text-base">
            {title}
          </h3>
          {/* <span className="text-xs font-semibold text-[#9F9F9F]">Autor</span> */}
        </div>
      </div>
      <div className="flex-center gap-2">
        <Badge className="py-1 px-4 text-[8px] min-[500px]:text-xs  bg-[#444444] text-white rounded-full">
          {type}
        </Badge>

        <Button
          variant="secondary"
          className="bg-[#EBF4DD] focus:bg-amber-50 hidden lg:block"
          asChild
        >
          <a href={audioUrl} download target="_blank" rel="noopener noreferrer">
            {" "}
            <Download strokeWidth={3} />
          </a>
        </Button>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" aria-label="More Options">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleLiked}>
                {isLiked ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="red"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart-icon lucide-heart"
                    >
                      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                    </svg>
                    Liked
                  </>
                ) : (
                  <>
                    <Heart />
                    Add to favourites
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() =>
                  handleShare(title, `${baseLink}/sounds/${soundId}`)
                }
              >
                <Share2 />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/sounds/${soundId}`} target="_blank">
                  <ExternalLink />
                  Open in new tab
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowCustomizeDialog(true)}>
                <Paintbrush />
                Customize Button
              </DropdownMenuItem>{" "}
              <DropdownMenuItem className="lg:hidden" asChild>
                <a
                  href={audioUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadIcon />
                  Download
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setShowReportDialog(true)}
              >
                <Angry />
                Report
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Customization Dialog */}
        <Dialog
          open={ShowCustomizeDialog}
          onOpenChange={setShowCustomizeDialog}
        >
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Customize your button</DialogTitle>
              <DialogDescription>
                <EmbedButtonEditor soundId={soundId} initialText={title} />
              </DialogDescription>
            </DialogHeader>
            {/* <FieldGroup className="py-3">
              <Field>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="shadcn@vercel.com"
                  autoComplete="off"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Check out this file"
                />
              </Field>
            </FieldGroup> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Report Dialog */}
        <Dialog open={ShowReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle className="text-red-600">
                Report this audio
              </DialogTitle>
              <DialogDescription>
                Report this audio if you find it inappropriate or offensive.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <ReportDialog
          ShowReportDialog={ShowReportDialog}
          setShowReportDialog={setShowReportDialog}
          soundId={soundId}
        />
      </div>
    </div>
  );
};

export default AudioElement;
