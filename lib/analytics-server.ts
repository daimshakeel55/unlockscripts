import { supabaseAdmin } from "@/lib/supabase-admin";

type TrackEventInput = {
  lockerId: string;
  ownerId: string;
  eventType: "view" | "unlock";
  country?: string;
  browser?: string;
  device?: string;
  sessionId?: string;
};

export async function trackAnalyticsEvent(
  input: TrackEventInput
): Promise<{ ok: true; skipped?: boolean } | { ok: false; error: string }> {
  const { lockerId, ownerId, eventType, country, browser, device, sessionId } =
    input;

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
      return { ok: true, skipped: true };
    }
  }

  const { error } = await supabaseAdmin.from("analytics_events").insert({
    locker_id: lockerId,
    owner_id: ownerId,
    event_type: eventType,
    country: country ?? "Unknown",
    browser: browser ?? "",
    device: device ?? "",
    ip_address: sessionId ?? "",
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: true, skipped: true };
    }
    return { ok: false, error: error.message };
  }

  if (eventType === "view") {
    await supabaseAdmin.rpc("increment_views", { locker_id_input: lockerId });
  }

  if (eventType === "unlock") {
    const { error: rpcError } = await supabaseAdmin.rpc("increment_unlocks", {
      locker_id_input: lockerId,
    });
    if (rpcError) {
      console.error("Failed to increment unlocks:", rpcError);
    }
  }

  return { ok: true };
}
