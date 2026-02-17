import AudioLayout from "@/components/audio_elements/AudioLayout";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-8 lg:gap-6 sm:p-10 w-full">
      <h1 className="text-4xl lg:text-8xl font-bold  text-center uppercase">
        Main Page
      </h1>
      <Button asChild variant="accent">
        <Link
          href="https://www.instagram.com/nobsounds"
          target="_blank"
          className="flex justify-center items-center gap-4"
        >
          <Instagram /> Visit us on Instagram
        </Link>
      </Button>
    </div>
  );
}
