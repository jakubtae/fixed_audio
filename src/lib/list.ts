import { Sound } from "./schemas/sound.types";

export interface Audio {
  soundId: string;
  title: string;
  type: Sound["category"];
}
