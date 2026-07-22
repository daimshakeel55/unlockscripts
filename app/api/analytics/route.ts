import { NextRequest, NextResponse } from "next/server";
import { trackAnalyticsEvent } from "@/lib/analytics-server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      lockerId,
      ownerId,
      eventType,
      country,
      browser,
      device,
      sessionId,
    } = body;

    if (!lockerId || !ownerId || !eventType) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (eventType !== "view" && eventType !== "unlock") {
      return NextResponse.json(
        { success: false, error: "Invalid event type." },
        { status: 400 }
      );
    }

    const result = await trackAnalyticsEvent({
      lockerId,
      ownerId,
      eventType,
      country,
      browser,
      device,
      sessionId,
    });

    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      skipped: result.skipped ?? false,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
