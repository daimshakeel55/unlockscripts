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
      ipAddress,
    } = body;

    // 1. Insert the analytics event
    const { error } = await supabaseAdmin
      .from("analytics_events")
      .insert({
        locker_id: lockerId,
        owner_id: ownerId,
        event_type: eventType,
        country,
        browser,
        device,
        ip_address: ipAddress,
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // 2. Increment the views count in the lockers table
    const { error: rpcError } = await supabaseAdmin.rpc("increment_views", {
      locker_id_input: lockerId,
    });

    if (rpcError) {
      console.error("Failed to increment views:", rpcError);
      // We do not fail the request if the view increment fails
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}