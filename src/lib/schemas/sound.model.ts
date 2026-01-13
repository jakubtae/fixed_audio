import { Collection, ObjectId, WithId } from "mongodb";
import { Sound, SoundDocument } from "./sound.types";

export class SoundModel {
  constructor(private collection: Collection<SoundDocument>) {}

  async create(
    sound: Omit<Sound, "_id" | "createdAt" | "updatedAt">
  ): Promise<Sound> {
    const now = new Date();
    const soundDoc: SoundDocument = {
      ...sound,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.collection.insertOne(soundDoc);

    return {
      _id: result.insertedId.toString(),
      ...sound,
      createdAt: now,
      updatedAt: now,
    };
  }

  async findById(id: string): Promise<Sound | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id) });
    return doc ? this.mapDocumentToSound(doc) : null;
  }

  async findBySoundId(soundId: string): Promise<Sound | null> {
    const doc = await this.collection.findOne({ soundId });
    return doc ? this.mapDocumentToSound(doc) : null;
  }

  async update(
    id: string,
    updates: Partial<Omit<Sound, "id">>
  ): Promise<Sound | null> {
    if (!ObjectId.isValid(id)) return null;

    const updateData = {
      ...updates,
      updatedAt: new Date(),
    };

    delete (updateData as any).id;

    // The return type is WithId<SoundDocument> | null
    const updatedDoc = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    return updatedDoc ? this.mapDocumentToSound(updatedDoc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async list(): Promise<Sound[]> {
    const docs = await this.collection.find().toArray();
    return docs.map((doc) => this.mapDocumentToSound(doc));
  }

  private mapDocumentToSound(doc: WithId<SoundDocument>): Sound {
    return {
      _id: doc._id.toString(),
      title: doc.title,
      soundId: doc.soundId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      category: doc.category,
      views: doc.views,
      likes: doc.likes,
    };
  }
}
