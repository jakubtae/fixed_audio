import { Audio } from "./list";

export const gradientMap: Record<Audio["type"], string> = {
  Games: "linear-gradient(to bottom, #F7770F, #000000)", // red → black
  Memes: "linear-gradient(to bottom, #facc15, #f97316)", // yellow → orange
  Movies: "linear-gradient(to bottom, #715DF2, #120095)", // Purple → blue
  Music: "linear-gradient(to bottom, #3EFF00, #006406)", // green → darker green
  "Anime & Manga": "linear-gradient(to bottom, #F700FF, #640095)", // pink → purple
  Politics: "linear-gradient(to bottom, #C1C1C1, #404040)", // light gray → darker
  Pranks: "linear-gradient(to bottom, #00E8FF, #008981)", // light blue → gray
  Reactions: "linear-gradient(to bottom, #FF00D8, #1100BE)", // pink → dark blue
  "Sound Effects": "linear-gradient(to bottom, #5AC700, #4B2238)", // pomaranczowy → dark pink/red
  Sports: "linear-gradient(to bottom, #A9A9F6, #1E1E1E)", // light blue → dark gray
  Television: "linear-gradient(to bottom, #818181, #000000)", // gray → black
  "Tiktok Trends": "linear-gradient(to bottom, #FF0000, #01002D)", // red → dark blue
  Viral: "linear-gradient(to bottom, #E30000, #860082)", // red → pink
  "Whatsapp Audios": "linear-gradient(to bottom, #ffffff, #2F9B00)", // white → dark green
  other: "linear-gradient(to bottom, #e5e7eb, #9ca3af)", // gray → white
};
