import AudioLikedLayout from "@/components/audio_elements/AudioLikedLayout";

export default function Page() {
  return (
    <div className="w-full flex flex-1 flex-col gap-4">
      <h1 className="text-4xl lg:text-8xl font-bold  text-center uppercase mb-4">
        Liked songs
      </h1>
      <AudioLikedLayout
        cdnUrl={process.env.CDN_URL || "https://cdn.example.com"}
      />
    </div>
  );
}
