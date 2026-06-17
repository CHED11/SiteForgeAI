/**
 * NEXT RELEASE COUNTDOWN
 * ----------------------
 * Set the next drop date/time here. When the timer reaches zero the UI shows
 * "NEXT DROP NOW LIVE".
 *
 * Use an ISO 8601 string (include timezone offset for accuracy).
 * Example: "2026-06-24T17:00:00Z"
 */

export const COUNTDOWN_CONFIG = {
  /** Next release target time (ISO 8601). */
  releaseDate: "2026-06-24T17:00:00Z",
  heading: "NEXT RELEASE",
  subheading: "1 NEW POSTER ADDED TO EACH COLLECTION EVERY WEEK",
  liveLabel: "NEXT DROP NOW LIVE",
} as const;
