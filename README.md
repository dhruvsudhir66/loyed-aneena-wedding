# Aneena & Abin — Wedding Invitation

A production-oriented, mobile-first wedding invitation built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Framer Motion.

## Design direction

The visual system follows the supplied sage/olive mood board: soft sage `#A8B09A`, olive `#747A5A`, warm cream `#F2EDE2`, sand `#D8C6A9`, taupe `#A69682`, and dark brown `#4E4035`. Typography pairs Cormorant Garamond for editorial headings with DM Sans for readable UI and Italianno for restrained handwritten accents.

No stock imagery or fabricated testimonials/metrics are used. The visual texture is generated in CSS so the invitation remains lightweight.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## RSVP email delivery

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`
- `RSVP_TO_EMAIL`
- `RSVP_FROM_EMAIL` (must use a verified Resend domain)

The API validates the submission server-side and sends it to the configured inbox.

## Guest photo uploads

The upload component uses S3-compatible presigned PUT URLs. Set:

- `S3_REGION`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`

For a public album, expose `S3_PUBLIC_BASE_URL` and add a separate gallery layer; this starter deliberately does not expose uploaded objects publicly by default.

For AWS S3, restrict the IAM principal to `s3:PutObject` for the `wedding-uploads/*` prefix and configure an appropriate bucket CORS policy for the production domain.

## Content to replace before launch

- Wedding date/time and venue details in `SaveTheDate`, `Hero`, `Countdown`, and `Footer`.
- Names and story copy.
- `metadataBase` in `app/layout.tsx`.
- Resend/S3 environment variables.
- Optional Open Graph image.

## Accessibility and responsive behavior

The site is mobile-first, uses semantic sections and labels, supports keyboard focus, uses `aria-live` for form feedback, and respects `prefers-reduced-motion`.
