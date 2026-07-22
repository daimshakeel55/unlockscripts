import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: lockers, error: lockerError } = await supabaseAdmin
      .from("lockers")
      .select("id, title, views, unlocks, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (lockerError) {
      return NextResponse.json({ error: lockerError.message }, { status: 500 });
    }

    const { data: events, error: eventsError } = await supabaseAdmin
      .from("analytics_events")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (eventsError) {
      return NextResponse.json({ error: eventsError.message }, { status: 500 });
    }

    return NextResponse.json({
      lockers: lockers ?? [],
      events: events ?? [],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
