/**
 * Enquiry-delivery configuration.
 *
 * The enquiry form posts straight to this Formspree endpoint (configured in the
 * Formspree dashboard to deliver to forge100000@gmail.com). Posting directly
 * from the browser keeps the form working on any static/SSR host with no server
 * hop. Override per-environment with NEXT_PUBLIC_FORMSPREE_ENDPOINT if needed.
 */
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrevvglw";

export function publicFormspreeEndpoint(): string {
  return process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT;
}
