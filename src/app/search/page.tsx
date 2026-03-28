import AudioLayout from "@/components/audio_elements/AudioLayout";
import { Header1 } from "@/components/elements/h1";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ filters?: string }>;
}) {
  const CDNurl = process.env.CDN_URL || "https://cdn.example.com";

  const { filters } = await searchParams;
  console.log("Search filters:", filters);
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-8 lg:gap-6 sm:p-0 w-full">
      <Header1>Search viral audio</Header1>
      <AudioLayout cdnUrl={CDNurl} filters={filters} />
    </div>
  );
}
