import AudioLayout from "@/components/audio_elements/AudioLayout";
import { Header1 } from "@/components/elements/h1";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-8 lg:gap-6 sm:p-10 w-full">
      <Header1>No B Sounds</Header1>

      <Button asChild variant="accent">
        <Link
          href="https://www.instagram.com/nobsounds"
          target="_blank"
          className="flex justify-center items-center gap-4 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:animate-pulse focus-visible:scale-105 focus-visible:shadow-lg focus-visible:animate-pulse"
        >
          <Instagram /> Visit us on Instagram
        </Link>
      </Button>
    </div>
  );
}
