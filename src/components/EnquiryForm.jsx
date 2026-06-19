import { useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Phone, Send } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { BUSINESS } from '../data/site'

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT

const FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Smith', autoComplete: 'name' },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '0400 000 000', autoComplete: 'tel' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com', autoComplete: 'email' },
  { name: 'suburb', label: 'Suburb', type: 'text', placeholder: 'e.g. Burleigh Heads', autoComplete: 'address-level2' },
]

const EMPTY = { name: '', phone: '', email: '', suburb: '', details: '' }

// status: 'idle' | 'submitting' | 'success' | 'error'
export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!values.name.trim()) return 'Please enter your full name.'
    if (!values.phone.trim() && !values.email.trim())
      return 'Please provide a phone number or email so we can reach you.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      return 'Please enter a valid email address.'
    if (!values.details.trim()) return 'Please tell us a little about your project.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setStatus('error')
      setErrorMsg(validationError)
      return
    }

    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      setErrorMsg(
        'The enquiry form is not configured yet. Please call us on ' +
          BUSINESS.phoneDisplay +
          ' and we\'ll help straight away.',
      )
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          suburb: values.suburb,
          message: values.details,
          _subject: `New website enquiry from ${values.name}`,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setValues(EMPTY)
      } else {
        const data = await res.json().catch(() => null)
        const msg =
          data?.errors?.map((er) => er.message).join(' ') ||
          'Something went wrong sending your enquiry. Please try again.'
        setStatus('error')
        setErrorMsg(msg)
      }
    } catch {
      setStatus('error')
      setErrorMsg(
        'We couldn\'t reach the server. Please check your connection or call us on ' +
          BUSINESS.phoneDisplay +
          '.',
      )
    }
  }

  return (
    <section id="enquiry" className="bg-warm-white py-20 sm:py-28">
      <div className="container-content">
        <div className="overflow-hidden rounded-3xl bg-charcoal shadow-soft lg:grid lg:grid-cols-5">
          {/* Left: pitch */}
          <div className="relative p-8 sm:p-12 lg:col-span-2">
            <SectionHeading
              align="left"
              variant="light"
              eyebrow="Free Quote"
              title="Request your free, no-obligation quote"
              description="Fill out the form and our team will get back to you quickly with honest advice and a detailed quote."
            />

            <div className="mt-10 space-y-5 text-warm-white/80">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-3 text-warm-white transition-colors hover:text-beige"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-beige/15 text-beige">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-warm-white/60">
                    Prefer to talk?
                  </span>
                  <span className="font-display text-lg font-bold">
                    {BUSINESS.phoneDisplay}
                  </span>
                </span>
              </a>
              <p className="text-sm leading-relaxed text-warm-white/65">
                Servicing {BUSINESS.serviceArea}. Open {BUSINESS.hours}.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-warm-50 p-8 sm:p-12 lg:col-span-3">
            {status === 'success' ? (
              <div
                role="status"
                className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-beige/20 text-beige-dark">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-charcoal">
                  Thanks — enquiry received!
                </h3>
                <p className="mt-3 max-w-sm text-concrete">
                  We've got your details and will be in touch shortly. For anything
                  urgent, call us on{' '}
                  <a
                    href={BUSINESS.phoneHref}
                    className="font-semibold text-charcoal underline decoration-beige underline-offset-2"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-outline mt-8"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  {FIELDS.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-sm font-medium text-charcoal"
                      >
                        {field.label}
                        {field.name === 'name' && (
                          <span className="text-beige-dark"> *</span>
                        )}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal shadow-sm transition-colors placeholder:text-concrete-light focus:border-beige focus:outline-none focus:ring-2 focus:ring-beige/40"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="details"
                    className="mb-1.5 block text-sm font-medium text-charcoal"
                  >
                    Project Details<span className="text-beige-dark"> *</span>
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={values.details}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your property and what you'd like rendered…"
                    className="w-full resize-y rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal shadow-sm transition-colors placeholder:text-concrete-light focus:border-beige focus:outline-none focus:ring-2 focus:ring-beige/40"
                  />
                </div>

                {status === 'error' && (
                  <p
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send My Enquiry
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-concrete">
                  We'll only use your details to respond to this enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
