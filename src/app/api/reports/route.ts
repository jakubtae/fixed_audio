import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

/* ----------------------------------------
   POST → Create a report
---------------------------------------- */
export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { soundId, reason, description } = body;

    if (!soundId || !reason) {
      return NextResponse.json(
        { error: "soundId and reason are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Dev");
    const reports = db.collection("reports");

    const now = new Date();

    const report = {
      userId: session.user.id,
      soundId,
      reason,
      description: description ?? "",
      status: "open",
      createdAt: now,
      updatedAt: now,
    };

    await reports.insertOne(report);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Duplicate report (same user + same sound)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "You already reported this sound" },
        { status: 409 }
      );
    }

    console.error("Create report error:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   GET → Get one OR many reports
---------------------------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status");
    const soundId = searchParams.get("soundId");

    const client = await clientPromise;
    const db = client.db("Dev");
    const reports = db.collection("reports");

    // 🔹 Get single report by ID
    if (id) {
      const report = await reports.findOne({ _id: new ObjectId(id) });

      if (!report) {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        ...report,
        _id: report._id.toString(),
      });
    }

    // 🔹 Get many (with filters)
    const query: any = {};
    if (status) query.status = status;
    if (soundId) query.soundId = soundId;

    const items = await reports.find(query).sort({ createdAt: -1 }).toArray();
    console.log(items);
    return NextResponse.json(
      items.map((r) => ({
        ...r,
        _id: r._id.toString(),
      }))
    );
  } catch (error) {
    console.error("Fetch reports error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

/* ----------------------------------------
   PATCH → Update report status (admin)
---------------------------------------- */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Dev");
    const reports = db.collection("reports");

    const result = await reports.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update report error:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
