type ReportReason =
  | "copyright"
  | "hate_speech"
  | "explicit_content"
  | "harassment"
  | "spam"
  | "other";

export interface Report {
  _id?: string; // MongoDB automatically creates this as ObjectId, but we'll use string for client
  userId: string;
  soundId: string;
  reason: ReportReason;
  status: "open" | "in process" | "closed";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// For MongoDB operations, we need to handle ObjectId
export interface ReportsDocument extends Omit<Report, "_id"> {
  _id?: any; // MongoDB ObjectId
}
