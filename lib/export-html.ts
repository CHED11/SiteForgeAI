import type { SiteConfig } from "./types";
import { withAlpha } from "./utils";

/**
 * Turns a SiteConfig into a single, self-contained, production-ready index.html.
 *
 * The export keeps the premium feel of the in-app renderer with zero build step:
 * Lenis smooth scrolling, GSAP-driven hero parallax, IntersectionObserver reveals,
 * glassmorphism nav, animated gradients, magnetic-ish buttons, a real pricing
 * grid, and a working contact form (Formspree when an endpoint is supplied,
 * mailto otherwise). Open the file in any browser and it just works.
 */

const ICON_PATHS: Record<string, string> = {
  spark:
    '<path d="M12 2v6m0 8v6m10-10h-6M8 12H2m15.07-7.07-4.24 4.24M9.17 14.83l-4.24 4.24m14.14 0-4.24-4.24M9.17 9.17 4.93 4.93"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  compass:
    '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  layers:
    '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  growth: '<path d="M23 6l-9.5 9.5-5-5L1 18"/><polyline points="17 6 23 6 23 12"/>',
  heart:
    '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>',
  gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
  tools:
    '<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6l-6.4 6.4 2.8 2.8 6.4-6.4a4 4 0 0 0 5.6-5.6l-2.5 2.5-2.1-2.1 2.5-2.5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
};

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function icon(name: string): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true">${
    ICON_PATHS[name] ?? ICON_PATHS.spark
  }</svg>`;
}

export type ExportOptions = {
  formspreeEndpoint?: string | null;
  inquiryEmail?: string;
};

export function buildStandaloneHtml(
  config: SiteConfig,
  opts: ExportOptions = {}
): string {
  const t = config.theme;
  const endpoint = opts.formspreeEndpoint || "";
  const mailto = opts.inquiryEmail || "";

  const navLinks = config.nav.links
    .map(
      (l) =>
        `<a href="${esc(l.href)}" class="nav-link">${esc(l.label)}</a>`
    )
    .join("");

  const highlights = config.hero.highlights
    .map(
      (h) =>
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="${esc(
          t.primary
        )}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="20 6 9 17 4 12"/></svg>${esc(
          h
        )}</li>`
    )
    .join("");

  const stats = config.stats
    .map(
      (s) =>
        `<div class="stat reveal"><span class="stat-value">${esc(
          s.value
        )}</span><span class="stat-label">${esc(s.label)}</span></div>`
    )
    .join("");

  const services = config.services.items
    .map(
      (s, i) => `<article class="card reveal" style="--d:${(i % 3) * 80}ms">
      <div class="card-icon">${icon(s.icon)}</div>
      <h3>${esc(s.name)}</h3>
      <p>${esc(s.description)}</p>
    </article>`
    )
    .join("");

  const aboutPoints = config.about.points
    .map(
      (p, i) => `<div class="point reveal" style="--d:${i * 90}ms">
      <div class="point-num">${String(i + 1).padStart(2, "0")}</div>
      <div><h4>${esc(p.title)}</h4><p>${esc(p.description)}</p></div>
    </div>`
    )
    .join("");

  const testimonials = config.testimonials.items
    .map(
      (q, i) => `<figure class="card reveal" style="--d:${(i % 3) * 80}ms">
      <div class="quote-mark">&ldquo;</div>
      <blockquote>${esc(q.quote)}</blockquote>
      <figcaption><span class="avatar">${esc(
        q.author.charAt(0)
      )}</span><span><strong>${esc(q.author)}</strong><em>${esc(
        q.role
      )}</em></span></figcaption>
    </figure>`
    )
    .join("");

  const pricing = config.pricing
    ? `<section id="pricing" class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="eyebrow">${esc(config.pricing.eyebrow)}</span>
        <h2>${esc(config.pricing.title)}</h2>
        <p class="lede">${esc(config.pricing.subtitle)}</p>
      </div>
      <div class="pricing-grid">
        ${config.pricing.tiers
          .map(
            (tier, i) => `<div class="tier reveal${
              tier.featured ? " tier-featured" : ""
            }" style="--d:${i * 80}ms">
          ${tier.featured ? '<span class="tier-badge">Most popular</span>' : ""}
          <h3>${esc(tier.name)}</h3>
          <div class="tier-price"><span>${esc(tier.price)}</span>${
              tier.period ? `<small>${esc(tier.period)}</small>` : ""
            }</div>
          <p class="tier-desc">${esc(tier.description)}</p>
          <ul class="tier-features">
            ${tier.features
              .map(
                (f) =>
                  `<li><svg viewBox="0 0 24 24" fill="none" stroke="${esc(
                    t.primary
                  )}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>${esc(
                    f
                  )}</li>`
              )
              .join("")}
          </ul>
          <a href="#contact" class="btn ${
            tier.featured ? "btn-primary" : "btn-ghost"
          } tier-cta">${esc(tier.cta)}</a>
        </div>`
          )
          .join("")}
      </div>
      <p class="pricing-note reveal">${esc(config.pricing.note)}</p>
    </div>
  </section>`
    : "";

  const c = config.contact;
  const interests = c
    ? c.interests
        .map((i) => `<option value="${esc(i)}">${esc(i)}</option>`)
        .join("")
    : "";

  const contactSection = c
    ? `<section id="contact" class="section">
    <div class="wrap contact-grid">
      <div class="contact-info reveal">
        <span class="eyebrow">${esc(c.eyebrow)}</span>
        <h2>${esc(c.title)}</h2>
        <p class="lede">${esc(c.subtitle)}</p>
        <ul class="contact-list">
          <li><span>Email</span><a href="mailto:${esc(c.email)}">${esc(
        c.email
      )}</a></li>
          <li><span>Phone</span><a href="tel:${esc(
            c.phone.replace(/[^0-9+]/g, "")
          )}">${esc(c.phone)}</a></li>
          <li><span>Where</span>${esc(c.location)}</li>
          <li><span>Hours</span>${esc(c.hours)}</li>
        </ul>
      </div>
      <form class="contact-form reveal" id="inquiry-form"${
        endpoint ? ` action="${esc(endpoint)}" method="POST"` : ""
      }>
        <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" required placeholder="Your name"></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" type="email" name="email" required placeholder="you@email.com"></div>
        <div class="field"><label for="f-phone">Phone <em>(optional)</em></label><input id="f-phone" name="phone" placeholder="Best number to reach you"></div>
        <div class="field"><label for="f-interest">I'm interested in</label><select id="f-interest" name="interest">${interests}</select></div>
        <div class="field"><label for="f-message">Message</label><textarea id="f-message" name="message" rows="4" required placeholder="Tell us about your project"></textarea></div>
        <input type="hidden" name="_subject" value="New enquiry — ${esc(
          config.businessName
        )}">
        <button type="submit" class="btn btn-primary btn-block">${esc(
          c.buttonLabel
        )}</button>
        <p class="form-status" id="form-status" role="status"></p>
      </form>
    </div>
  </section>`
    : "";

  const footerCols = config.footer.columns
    .map(
      (col) => `<div><h5>${esc(col.heading)}</h5><ul>${col.links
        .map((l) => `<li><a href="#top">${esc(l)}</a></li>`)
        .join("")}</ul></div>`
    )
    .join("");

  // The form script: progressively enhance to fetch+JSON when an endpoint
  // exists, otherwise fall back to a pre-filled mailto link.
  const formScript = c
    ? `
    (function () {
      var form = document.getElementById('inquiry-form');
      var status = document.getElementById('form-status');
      if (!form) return;
      var endpoint = ${JSON.stringify(endpoint)};
      var mailto = ${JSON.stringify(mailto)};
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = Object.fromEntries(new FormData(form).entries());
        status.textContent = 'Sending…';
        status.className = 'form-status';
        function fallbackMailto() {
          if (!mailto) { status.textContent = 'Could not send automatically. Please email us directly.'; status.className = 'form-status err'; return; }
          var body = 'Name: ' + (data.name||'') + '%0D%0AEmail: ' + (data.email||'') + '%0D%0APhone: ' + (data.phone||'') + '%0D%0AInterest: ' + (data.interest||'') + '%0D%0A%0D%0A' + (data.message||'');
          window.location.href = 'mailto:' + mailto + '?subject=' + encodeURIComponent('New enquiry — ${esc(
            config.businessName
          )}') + '&body=' + body;
          status.textContent = 'Opening your email app…';
          status.className = 'form-status ok';
        }
        if (!endpoint) { fallbackMailto(); return; }
        fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) {
            if (r.ok) { form.reset(); status.textContent = 'Thank you — we\\'ll be in touch shortly.'; status.className = 'form-status ok'; }
            else { fallbackMailto(); }
          })
          .catch(function () { fallbackMailto(); });
      });
    })();`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(config.businessName)} — ${esc(config.tagline)}</title>
<meta name="description" content="${esc(config.hero.subheadline)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:${t.background};--surface:${t.surface};--primary:${t.primary};
  --accent:${t.accent};--text:${t.text};--muted:${t.muted};
  --primary-a:${withAlpha(t.primary, 0.4)};--line:${withAlpha(t.text, 0.1)};
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.5}
h1,h2,h3,h4,.display{font-family:Fraunces,Georgia,serif;font-weight:500;letter-spacing:-0.02em;line-height:1.05}
a{color:inherit;text-decoration:none}
img{max-width:100%}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px}
.section{padding:112px 0;position:relative}
.eyebrow{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--accent)}
.section-head{max-width:640px;margin:0 auto 64px;text-align:center}
.section-head h2{font-size:clamp(30px,4vw,48px);margin-top:14px}
.lede{margin-top:18px;font-size:18px;color:var(--muted)}
/* nav */
.nav{position:fixed;inset:16px 16px auto;z-index:50;display:flex;justify-content:center}
.nav-inner{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1120px;padding:12px 20px;border-radius:999px;border:1px solid var(--line);background:${withAlpha(
    t.surface,
    0.55
  )};backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);transition:box-shadow .5s,background .5s}
.nav.scrolled .nav-inner{background:${withAlpha(
    t.surface,
    0.82
  )};box-shadow:0 18px 50px rgba(0,0,0,.45)}
.brand{display:flex;align-items:center;gap:10px;font-weight:600}
.brand .mark{display:grid;place-items:center;width:28px;height:28px;border-radius:999px;background:var(--primary);color:var(--bg);font-weight:700;font-size:13px}
.nav-links{display:none;gap:4px}
.nav-link{padding:8px 14px;border-radius:999px;font-size:14px;font-weight:500;color:var(--muted);transition:color .3s}
.nav-link:hover{color:var(--text)}
@media(min-width:860px){.nav-links{display:flex}}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:13px 26px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s}
.btn:hover{transform:scale(1.04)}
.btn-primary{background:var(--primary);color:var(--bg);box-shadow:0 16px 44px var(--primary-a)}
.btn-ghost{border-color:${withAlpha(t.text, 0.2)};color:var(--text);background:transparent}
.btn-block{width:100%;justify-content:center;margin-top:8px}
.nav .btn{padding:10px 20px}
/* hero */
.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:140px 24px 80px;overflow:hidden}
.hero .glow{position:absolute;border-radius:50%;filter:blur(130px);opacity:.5;pointer-events:none}
.hero .g1{width:55vh;height:55vh;background:var(--primary);left:-10%;top:5%}
.hero .g2{width:50vh;height:50vh;background:var(--accent);right:-8%;top:20%}
.hero-inner{position:relative;z-index:2;max-width:880px}
.hero h1{font-size:clamp(42px,8vw,92px)}
.hero .sub{margin:26px auto 0;max-width:560px;font-size:19px;color:var(--muted)}
.hero-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid ${withAlpha(
    t.primary,
    0.3
  )};background:${withAlpha(
    t.primary,
    0.06
  )};color:var(--primary);border-radius:999px;padding:7px 16px;font-size:12px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;margin-bottom:26px}
.hero-pill .dot{width:6px;height:6px;border-radius:50%;background:var(--primary)}
.hero-cta{margin-top:40px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.hero-highlights{margin:48px 0 0;list-style:none;display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:center;font-size:14px;color:var(--muted)}
.hero-highlights li{display:flex;align-items:center;gap:8px}
.grid-overlay{position:absolute;inset:0;opacity:.06;background-image:linear-gradient(${withAlpha(
    t.text,
    0.5
  )} 1px,transparent 1px),linear-gradient(90deg,${withAlpha(
    t.text,
    0.5
  )} 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000,transparent);mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000,transparent)}
/* stats */
.stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:28px;overflow:hidden;max-width:1120px;margin:0 auto}
@media(min-width:768px){.stats{grid-template-columns:repeat(4,1fr)}}
.stat{background:var(--bg);padding:40px 24px;text-align:center;display:flex;flex-direction:column;gap:8px}
.stat-value{font-family:Fraunces,serif;font-size:clamp(30px,4vw,46px);color:var(--primary)}
.stat-label{font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:var(--muted)}
/* cards */
.cards{display:grid;grid-template-columns:1fr;gap:20px}
@media(min-width:640px){.cards{grid-template-columns:repeat(2,1fr)}}
@media(min-width:980px){.cards{grid-template-columns:repeat(3,1fr)}}
.card{position:relative;border:1px solid var(--line);background:${withAlpha(
    t.surface,
    0.55
  )};backdrop-filter:blur(16px);border-radius:28px;padding:32px;transition:transform .5s cubic-bezier(.16,1,.3,1),border-color .5s}
.card:hover{transform:translateY(-6px);border-color:${withAlpha(t.primary, 0.35)}}
.card-icon{display:grid;place-items:center;width:48px;height:48px;border-radius:16px;background:${withAlpha(
    t.primary,
    0.12
  )};color:var(--primary);margin-bottom:22px;transition:transform .5s}
.card:hover .card-icon{transform:scale(1.1) rotate(-6deg)}
.card h3{font-size:21px}
.card p{margin-top:12px;font-size:14px;color:var(--muted)}
/* about */
.about{background:var(--surface)}
.about-grid{display:grid;gap:56px;align-items:center}
@media(min-width:980px){.about-grid{grid-template-columns:1fr 1.1fr}}
.about-grid h2{font-size:clamp(30px,4vw,48px);margin-top:14px}
.about-grid .lede{margin-top:24px}
.point{display:flex;gap:20px;padding:24px;border:1px solid var(--line);background:${withAlpha(
    t.background,
    0.5
  )};border-radius:24px;margin-bottom:16px}
.point-num{flex:none;display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:${withAlpha(
    t.primary,
    0.14
  )};color:var(--primary);font-family:Fraunces,serif}
.point h4{font-family:Inter,sans-serif;font-size:17px;font-weight:600}
.point p{margin-top:6px;font-size:14px;color:var(--muted)}
/* testimonials */
.quote-mark{font-family:Fraunces,serif;font-size:48px;line-height:.6;color:${withAlpha(
    t.primary,
    0.4
  )}}
blockquote{margin-top:12px;font-size:16px}
figcaption{margin-top:26px;display:flex;align-items:center;gap:12px}
.avatar{display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:${withAlpha(
    t.primary,
    0.16
  )};color:var(--primary);font-weight:600}
figcaption strong{display:block;font-size:14px}
figcaption em{font-style:normal;font-size:12px;color:var(--muted)}
/* pricing */
.pricing-grid{display:grid;grid-template-columns:1fr;gap:20px;align-items:stretch}
@media(min-width:760px){.pricing-grid{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}}
.tier{position:relative;border:1px solid var(--line);background:${withAlpha(
    t.surface,
    0.55
  )};border-radius:28px;padding:32px;display:flex;flex-direction:column}
.tier-featured{border-color:var(--primary);box-shadow:0 24px 60px var(--primary-a)}
.tier-badge{position:absolute;top:-12px;left:32px;background:var(--primary);color:var(--bg);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border-radius:999px}
.tier h3{font-size:22px}
.tier-price{margin-top:16px;display:flex;align-items:baseline;gap:8px}
.tier-price span{font-family:Fraunces,serif;font-size:34px;color:var(--text)}
.tier-price small{font-size:13px;color:var(--muted)}
.tier-desc{margin-top:10px;font-size:14px;color:var(--muted)}
.tier-features{list-style:none;margin:22px 0;display:flex;flex-direction:column;gap:12px;font-size:14px;flex:1}
.tier-features li{display:flex;align-items:flex-start;gap:10px}
.tier-features svg{margin-top:3px;flex:none}
.tier-cta{justify-content:center}
.pricing-note{text-align:center;margin-top:40px;font-size:14px;color:var(--muted)}
/* contact */
.contact-grid{display:grid;gap:48px}
@media(min-width:900px){.contact-grid{grid-template-columns:1fr 1fr}}
.contact-info h2{font-size:clamp(28px,3.5vw,42px);margin-top:14px}
.contact-list{list-style:none;margin-top:32px;display:flex;flex-direction:column;gap:18px}
.contact-list li{display:flex;flex-direction:column;gap:3px;font-size:15px}
.contact-list span{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.contact-list a:hover{color:var(--primary)}
.contact-form{border:1px solid var(--line);background:${withAlpha(
    t.surface,
    0.55
  )};backdrop-filter:blur(16px);border-radius:28px;padding:32px}
.field{margin-bottom:18px;display:flex;flex-direction:column;gap:7px}
.field label{font-size:13px;font-weight:500;color:var(--muted)}
.field em{font-style:normal;opacity:.7}
.field input,.field select,.field textarea{font-family:inherit;font-size:15px;color:var(--text);background:${withAlpha(
    t.background,
    0.6
  )};border:1px solid var(--line);border-radius:14px;padding:13px 15px;transition:border-color .3s}
.field input:focus,.field select:focus,.field textarea:focus{outline:none;border-color:var(--primary)}
.field textarea{resize:vertical}
.form-status{margin-top:14px;font-size:14px;min-height:20px}
.form-status.ok{color:var(--primary)}
.form-status.err{color:#ff8a8a}
/* cta band */
.ctaband{padding:96px 24px}
.ctaband-inner{position:relative;max-width:980px;margin:0 auto;text-align:center;overflow:hidden;border:1px solid ${withAlpha(
    t.primary,
    0.2
  )};border-radius:40px;background:var(--surface);padding:80px 32px}
.ctaband h2{font-size:clamp(32px,5vw,60px)}
.ctaband p{margin:22px auto 0;max-width:560px;color:var(--muted);font-size:18px}
.ctaband .btn{margin-top:36px}
/* footer */
.footer{border-top:1px solid var(--line);padding:64px 0 40px}
.footer-grid{display:grid;gap:48px;grid-template-columns:1fr}
@media(min-width:760px){.footer-grid{grid-template-columns:1.4fr repeat(3,1fr)}}
.footer h5{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:16px}
.footer ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.footer a{font-size:14px;color:var(--text)}
.footer a:hover{color:var(--primary)}
.footer-tag{margin-top:16px;max-width:280px;font-size:14px;color:var(--muted)}
.footer-bottom{max-width:1120px;margin:48px auto 0;padding:28px 24px 0;border-top:1px solid var(--line);display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-size:12px;color:var(--muted)}
/* reveal */
.reveal{opacity:0;transform:translateY(28px);filter:blur(8px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1),filter .9s;transition-delay:var(--d,0ms)}
.reveal.in{opacity:1;transform:none;filter:none}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;filter:none;transition:none}}
</style>
</head>
<body id="top">
<header class="nav" id="nav">
  <div class="nav-inner">
    <a href="#top" class="brand"><span class="mark">${esc(
      config.businessName.charAt(0)
    )}</span><span>${esc(config.businessName)}</span></a>
    <nav class="nav-links">${navLinks}</nav>
    <a href="#contact" class="btn btn-primary">${esc(config.nav.cta)}</a>
  </div>
</header>

<section class="hero" id="hero">
  <div class="glow g1"></div><div class="glow g2"></div>
  <div class="grid-overlay"></div>
  <div class="hero-inner">
    <span class="hero-pill"><span class="dot"></span>${esc(
      config.hero.eyebrow
    )}</span>
    <h1>${esc(config.hero.headline)}</h1>
    <p class="sub">${esc(config.hero.subheadline)}</p>
    <div class="hero-cta">
      <a href="#contact" class="btn btn-primary">${esc(
        config.hero.primaryCta
      )} →</a>
      <a href="#services" class="btn btn-ghost">${esc(
        config.hero.secondaryCta
      )}</a>
    </div>
    <ul class="hero-highlights">${highlights}</ul>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap"><div class="stats">${stats}</div></div>
</section>

<section id="services" class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">${esc(config.services.eyebrow)}</span>
      <h2>${esc(config.services.title)}</h2>
      <p class="lede">${esc(config.services.subtitle)}</p>
    </div>
    <div class="cards">${services}</div>
  </div>
</section>

<section id="about" class="section about">
  <div class="wrap about-grid">
    <div class="reveal">
      <span class="eyebrow">${esc(config.about.eyebrow)}</span>
      <h2>${esc(config.about.title)}</h2>
      <p class="lede">${esc(config.about.body)}</p>
    </div>
    <div>${aboutPoints}</div>
  </div>
</section>

<section id="testimonials" class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">${esc(config.testimonials.eyebrow)}</span>
      <h2>${esc(config.testimonials.title)}</h2>
    </div>
    <div class="cards">${testimonials}</div>
  </div>
</section>

${pricing}

<section class="ctaband">
  <div class="ctaband-inner reveal">
    <div class="glow g1" style="position:absolute;opacity:.25;width:340px;height:340px;left:50%;top:-40%;transform:translateX(-50%)"></div>
    <h2>${esc(config.cta.headline)}</h2>
    <p>${esc(config.cta.subheadline)}</p>
    <a href="#contact" class="btn btn-primary">${esc(config.cta.button)} →</a>
  </div>
</section>

${contactSection}

<footer class="footer">
  <div class="wrap footer-grid">
    <div>
      <a href="#top" class="brand"><span class="mark">${esc(
        config.businessName.charAt(0)
      )}</span><span>${esc(config.businessName)}</span></a>
      <p class="footer-tag">${esc(config.footer.tagline)}</p>
    </div>
    ${footerCols}
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} ${esc(
      config.businessName
    )}. All rights reserved.</span>
    <span>Crafted with SiteForge AI</span>
  </div>
</footer>

<script src="https://unpkg.com/lenis@1.3.11/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script>
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Lenis smooth scroll
  if (window.Lenis && !reduce) {
    var lenis = new Lenis({ duration: 1.1, easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }
  // Scroll reveals
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '-80px' });
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  // Sticky nav state
  var nav = document.getElementById('nav');
  function onScroll(){ if(window.scrollY > 24){ nav.classList.add('scrolled'); } else { nav.classList.remove('scrolled'); } }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  // Hero parallax glow
  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.to('.hero .glow', { y: 120, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }${formScript}
})();
</script>
</body>
</html>`;
}

/** A safe, lowercased filename for the downloaded site. */
export function exportFilename(config: SiteConfig): string {
  const slug = config.businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "site";
  return `${slug}.html`;
}
