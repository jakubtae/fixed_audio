export interface Sound {
  _id?: string; // MongoDB automatically creates this as ObjectId, but we'll use string for client
  title: string;
  soundId: string;
  createdAt: Date;
  updatedAt: Date;
  category:
    | "Anime & Manga"
    | "Games"
    | "Memes"
    | "Movies"
    | "Music"
    | "Politics"
    | "Pranks"
    | "Reactions"
    | "Sound Effects"
    | "Sports"
    | "Television"
    | "Tiktok Trends"
    | "Viral"
    | "other"
    | "Whatsapp Audios";
}

// For MongoDB operations, we need to handle ObjectId
export interface SoundDocument extends Omit<Sound, "_id"> {
  _id?: any; // MongoDB ObjectId
}
