export const YOUTUBE_SUBSCRIBE_TITLE = "Subscribe & Turn on notifications";

export function getTaskDisplayTitle(type: string, title: string): string {
  if (type === "youtube_subscribe") return YOUTUBE_SUBSCRIBE_TITLE;
  return title;
}
