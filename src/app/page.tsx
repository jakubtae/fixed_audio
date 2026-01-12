import AudioLayout from "@/components/audio_elements/AudioLayout";

export default function Home() {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-8 lg:gap-6 sm:p-10 w-full">
      <h1 className="text-4xl lg:text-8xl font-bold  text-center uppercase">
        Browse viral audio
      </h1>
      <AudioLayout cdnUrl={CDNurl} />
    </div>
  );
}
