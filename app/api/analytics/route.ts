import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

    if (sessionId && (eventType === "view" || eventType === "unlock")) {
      const { data: existing } = await supabaseAdmin
        .from("analytics_events")
        .select("id")
        .eq("locker_id", lockerId)
        .eq("event_type", eventType)
        .eq("ip_address", sessionId)
        .limit(1)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ success: true, skipped: true });
      }
    }

    const { error } = await supabaseAdmin.from("analytics_events").insert({
      locker_id: lockerId,
      owner_id: ownerId,
      event_type: eventType,
      country,
      browser,
      device,
      ip_address: sessionId || "",
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    if (eventType === "view") {
      const { error: rpcError } = await supabaseAdmin.rpc("increment_views", {
        locker_id_input: lockerId,
      });

      if (rpcError) {
        console.error("Failed to increment views:", rpcError);
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
