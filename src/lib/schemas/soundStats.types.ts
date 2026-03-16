import { ObjectId } from "mongodb";

export interface SoundStat {
  _id?: ObjectId;
  soundId: string;
  date: string; // format: YYYY-MM-DD
  streams: number;
  createdAt: Date;
  updatedAt: Date;
}
