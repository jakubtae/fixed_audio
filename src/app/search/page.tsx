import AudioLayout from "@/components/audio_elements/AudioLayout";
import { Header1 } from "@/components/elements/h1";

export default function Home() {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-8 lg:gap-6 sm:p-10 w-full">
      <Header1>Search viral audio</Header1>
      <AudioLayout cdnUrl={CDNurl} />
    </div>
  );
}
