
# International Cargo Dispatch — Updated Blueprint

Updates from previous plan:
- Added a dedicated **Reviews page** (`/reviews`) with ~30 premium client testimonials, each with a unique randomuser.me avatar and a location.
- Set the company's generic location to **United States** across contact, footer, schema, and metadata.

---

## 1. New Page: `/reviews`

**Purpose:** Showcase social proof from premium clients (importers, exporters, enterprise shippers, e-commerce brands, manufacturers).

**Sections:**
- Hero: "Trusted by Businesses Worldwide" + aggregate rating block (e.g. 4.9/5 from 2,800+ shipments).
- Filter bar: All / Air Freight / Sea Freight / Road / Warehousing / Customs.
- Masonry/grid of ~30 review cards. Each card:
  - Avatar (unique randomuser.me image, no repeats)
  - Full name
  - Role + Company
  - **Location** (city, country) with a small map-pin icon
  - Star rating (mostly 5, a few 4.5)
  - Service type badge
  - Quote (2–4 sentences, premium corporate tone — focus on reliability, customs handling, on-time delivery, communication, white-glove service)
  - Date (relative, e.g. "2 weeks ago")
- Trust strip: logos / certifications (IATA, FIATA, ISO 9001 — visual badges).
- CTA banner: "Join thousands of satisfied shippers — Request a Quote".

**Avatar uniqueness strategy:**
Use deterministic, non-repeating randomuser.me URLs by indexing into the portraits collection:
```
https://randomuser.me/api/portraits/men/{n}.jpg
https://randomuser.me/api/portraits/women/{n}.jpg
```
Mix ~15 men + ~15 women with unique `n` values 1–99 — stored as a static array in the route file so no image repeats.

**Reviewer locations (sample, balanced globally with US-heavy mix since HQ is US):**
New York NY, Los Angeles CA, Houston TX, Miami FL, Chicago IL, Seattle WA, Atlanta GA, Boston MA, Dallas TX, San Francisco CA, Toronto Canada, London UK, Hamburg Germany, Rotterdam Netherlands, Dubai UAE, Singapore, Hong Kong, Shanghai China, Tokyo Japan, Mumbai India, Sydney Australia, São Paulo Brazil, Mexico City Mexico, Lagos Nigeria, Istanbul Turkey, Madrid Spain, Paris France, Milan Italy, Stockholm Sweden, Auckland New Zealand.

**Data source:** Static array in `src/routes/reviews.tsx` (no DB needed for the public reviews showcase). The existing `testimonials` table in admin remains for the smaller home-page carousel rotation.

**Navbar/Footer:** Add "Reviews" link between "Services" and "Blog".

---

## 2. Generic Location → United States

Apply across the site:
- **Contact page** (`/contact`):
  - Address line: `International Cargo Dispatch HQ, United States`
  - Office hours in EST
  - Embedded map centered on the United States (Leaflet, centered ~39.5°N, -98.5°W, zoom 4)
- **Footer:** "Headquartered in the United States" + copyright line.
- **About page:** Update company overview to state US headquarters with global network.
- **SEO `head()` metadata:**
  - Add `geo.region = US` and `geo.placename = United States` meta tags on key pages.
  - Update Organization JSON-LD `address.addressCountry = "US"`.
- **Quote form & Contact form:** keep formsubmit.co target unchanged (`info@internationalcargodispatch.com`), no location-specific routing needed.
- **Default phone placeholder:** US format `+1 (555) 010-0199` until you provide a real number.

---

## 3. Navigation Update

Updated public nav order:
`Home · About · Services · Tracking · Reviews · Blog · FAQ · Contact` + Track Shipment button + Login.

---

## 4. Everything Else From Prior Plan

All previously approved items remain unchanged:
- Tech stack (TanStack Start + Lovable Cloud + Leaflet + formsubmit.co)
- Pages: Home, About, Services (+ details), Tracking, Quote, Contact, FAQ, Blog, Login
- Admin panel: shipments CRUD with events, blog CRUD, testimonials CRUD, users view
- Database schema (shipments, shipment_events, blog_posts, testimonials) with RLS
- Tracking system with auto-generated `ICD-YYYY-XXXXXX` IDs and live map
- Floating WhatsApp + back-to-top + smooth animations
- Design system: deep navy + white + gold accent
- SEO: per-route metadata, sitemap, robots, JSON-LD

---

## Open Items (defaults will be used if not provided)

- WhatsApp number — placeholder until you share one
- Real US office address & phone — placeholder until provided
- Logo — text wordmark with gold accent until uploaded
