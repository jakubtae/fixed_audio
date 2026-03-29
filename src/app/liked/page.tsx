import AudioLikedLayout from "@/components/audio_elements/AudioLikedLayout";
import { Header1 } from "@/components/elements/h1";

export default function Page() {
  return (
    <div className="w-full flex flex-1 flex-col gap-4 items-center">
      <Header1>Liked songs</Header1>

      <AudioLikedLayout
        cdnUrl={process.env.CDN_URL || "https://cdn.example.com"}
      />
    </div>
  );
}
