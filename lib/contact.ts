/**
 * Enquiry-delivery configuration.
 *
 * Every contact form (in-app and exported) posts straight to this Formspree
 * endpoint, which is configured in the Formspree dashboard to deliver to
 * forge100000@gmail.com. Posting directly from the browser means the form works
 * identically on the published Next.js site and in downloaded standalone sites,
 * with no server hop and no mailto fallback.
 *
 * Override per-environment with NEXT_PUBLIC_FORMSPREE_ENDPOINT if ever needed.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrevvglw";

export function publicFormspreeEndpoint(): string {
  return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT;
}
