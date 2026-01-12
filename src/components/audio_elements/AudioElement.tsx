"use client";
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
  Heart,
  MoreVerticalIcon,
  Paintbrush,
  Share2,
  Trash2Icon,
} from "lucide-react";

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

const gradientMap: Record<Audio["type"], string> = {
  game: "linear-gradient(to bottom, #b91c1c, #000000)", // red → black
  meme: "linear-gradient(to bottom, #facc15, #f97316)", // yellow → orange
  movies: "linear-gradient(to bottom, #2563eb, #7c3aed)", // blue → purple
  music: "linear-gradient(to bottom, #22c55e, #16a34a)", // green → darker green
  other: "linear-gradient(to bottom, #e5e7eb, #9ca3af)", // gray → white
};

const AudioElement = ({
  title,
  soundId,
  type,
  id,
  cdnUrl,
}: AudioElementProps) => {
  const audioUrl = `${cdnUrl}/${soundId}.mp3`;
  const [ShowCustomizeDialog, setShowCustomizeDialog] = useState(false);
  const [ShowShareDialog, setShowShareDialog] = useState(false);
  const [ShowReportDialog, setShowReportDialog] = useState(false);

  const getAllSoundTypes = (): Array<Audio["type"]> => {
    return ["music", "game", "meme", "movies", "other"];
  };

  const soundType =
    type ||
    getAllSoundTypes()[Math.floor(Math.random() * getAllSoundTypes().length)];

  const bgImage = useMemo(() => {
    const variant = Math.random() > 0.5 ? 1 : 2;
    return `/${soundType}_${variant}.svg`;
  }, []); // ← empty deps = run once per mount

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
          style={{ background: gradientMap[soundType] }}
        >
          <AnimatedAudioPlayer src={audioUrl} />
        </div>
        <div className="flex flex-col">
          <h3 className="text font-semibold capitalize">{title}</h3>
          <span className="text-xs font-semibold text-[#9F9F9F]">Autor</span>
        </div>
      </div>
      <div className="flex-center gap-2">
        <Badge className="py-1 px-4 text-xs bg-[#444444] text-white rounded-full">
          {" "}
          {soundType}
        </Badge>
        <Button
          variant="secondary"
          className="bg-[#EBF4DD] focus:bg-amber-50"
          asChild
        >
          <a href={audioUrl} download target="_blank" rel="noopener noreferrer">
            {" "}
            Download
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
              <DropdownMenuItem>
                <Heart />
                Add to favourites
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
                <Share2 />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowCustomizeDialog(true)}>
                <Paintbrush />
                Customize Button
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
                Make this button looke exactly how you WANT it to be on your
                website.
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
        {/* Share Dialog */}
        <Dialog open={ShowShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Share this audio</DialogTitle>
              <DialogDescription>
                Share this audio with your friends and colleagues!
              </DialogDescription>
            </DialogHeader>
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
      </div>
    </div>
  );
};

export default AudioElement;
