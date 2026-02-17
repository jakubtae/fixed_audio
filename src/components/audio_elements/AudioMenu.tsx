import Link from "next/link";
import ReportDialog from "./ReportDialog";
import EmbedButtonEditor from "./IFramePreview";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { authClient } from "@/auth-client";
import { Audio } from "@/lib/list";

type AudioElementProps = Audio & {
  cdnUrl: string;
  onUnlike?: (action: OptimisticAction) => void;
  fullSound?: Sound;
};

import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  Angry,
  DownloadIcon,
  ExternalLink,
  Heart,
  MoreVerticalIcon,
  Paintbrush,
  Share2,
} from "lucide-react";
import { Sound } from "@/lib/schemas/sound.types";
import { OptimisticAction } from "./AudioLikedLayout";

const AudioMenu = ({
  title,
  soundId,
  cdnUrl,
  type,
  onUnlike,
  fullSound,
}: AudioElementProps) => {
  const { data: session } = authClient.useSession();
  const baseLink = typeof window !== "undefined" ? window.location.origin : "";
  const [ShowCustomizeDialog, setShowCustomizeDialog] = useState(false);
  const [ShowShareDialog, setShowShareDialog] = useState(false);
  const [ShowReportDialog, setShowReportDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(
    session?.user?.liked?.includes(soundId) || false,
  );
  const audioUrl = `${cdnUrl}/${soundId}.mp3`;

  const handleLiked = async () => {
    if (!session?.user) {
      alert("You need to be logged in to like an audio.");
      return;
    }

    const wasLiked = isLiked;

    // 🔥 Optimistic UI
    setIsLiked(!isLiked);

    if (wasLiked && onUnlike && fullSound) {
      onUnlike({ type: "remove", sound: fullSound });
    }

    try {
      const res = await fetch(`/api/sounds/likeAudio`, {
        method: "POST",
        body: JSON.stringify({
          soundId,
          userId: session?.user.id,
        }),
      });

      if (!res.ok) throw new Error("Failed");
    } catch (error) {
      console.error("Like failed:", error);

      // 🔥 ROLLBACK
      setIsLiked(wasLiked);

      if (wasLiked && onUnlike && fullSound) {
        onUnlike({ type: "restore", sound: fullSound });
      }
    }
  };

  const handleShare = async (title: string, link: string) => {
    await navigator.share({
      title: title,
      text: "Check out this sound 🔊 - " + title,
      url: link,
    });
  };
  return (
    <>
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
      <Dialog open={ShowCustomizeDialog} onOpenChange={setShowCustomizeDialog}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Customize your button</DialogTitle>
            <DialogDescription>
              <EmbedButtonEditor soundId={soundId} initialText={title} />
            </DialogDescription>
          </DialogHeader>
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
    </>
  );
};
export default AudioMenu;
