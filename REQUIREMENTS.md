# IFLEET602 Business Requirements

## Overview

This document defines the core user journeys for the two primary audiences: **Franchise Leads** (entrepreneurs seeking to own an IFLEET franchise) and **Renters** (customers seeking to rent a Tesla).

---

## Franchise Lead Journey

A franchise lead must be able to:

| Step | Action | Page | Status |
|------|--------|------|--------|
| 1 | **See available territories** | Territory Finder (`/territory`) | ✅ Implemented |
| 2 | **View territory details** (population, investment, revenue potential) | Territory Finder | ✅ Implemented |
| 3 | **Apply for a franchise** | Apply Now (`/apply`) | ✅ Implemented |
| 4 | **Receive follow-up** (48-hour response commitment) | Backend + Email | ⚠️ Needs email integration |

### Franchise Lead Requirements Checklist

- [x] Interactive territory map showing Arizona locations
- [x] Territory cards with availability status (Available, Under Review, Sold)
- [x] Investment range and projected revenue displayed
- [x] Franchise application form with validation
- [x] Application stored in database
- [ ] Email notification to owner on new application
- [ ] Automated follow-up email to applicant

---

## Renter Journey

A renter must be able to:

| Step | Action | Page | Status |
|------|--------|------|--------|
| 1 | **See available cars** | Fleet (`/fleet`) | ✅ Implemented |
| 2 | **View car details** (specs, pricing, images) | Fleet | ✅ Implemented |
| 3 | **Choose rental dates** | Book Now (`/book`) | ✅ Implemented |
| 4 | **Request booking** | Book Now | ✅ Implemented |
| 5 | **Complete booking** (confirmation + payment) | Book Now | ⚠️ Needs payment integration |

### Renter Requirements Checklist

- [x] Fleet page showing Model 3 and Model Y
- [x] Vehicle specs (range, acceleration, features)
- [x] Daily and weekly pricing displayed
- [x] Booking calendar with date selection
- [x] Booking form with customer details
- [x] Booking stored in database
- [ ] Real-time availability check against calendar
- [ ] Payment processing (Stripe integration)
- [ ] Booking confirmation email

---

## Sync Workflow: Cline ↔ GitHub ↔ Manus

To keep local Cline development and Manus in sync:

### Push from Cline to GitHub
```bash
cd tesla_rental_site
git add .
git commit -m "Description of changes"
git push origin main
```

### Pull from GitHub to Manus
After Cline pushes a stable version, Manus can pull updates:
1. Use Manus Management UI → Settings → GitHub
2. Or manually sync via terminal (requires auth setup)

### Recommended Workflow
1. **Cline** makes changes locally, tests, commits
2. **Cline** pushes stable version to GitHub
3. **Manus** pulls from GitHub to sync
4. **Manus** deploys via Publish button

---

## Priority Features (Next Sprint)

| Priority | Feature | Owner |
|----------|---------|-------|
| P0 | Payment integration (Stripe) | Manus |
| P0 | Email notifications | Manus |
| P1 | Google Calendar availability sync | Cline |
| P1 | Mobile responsive polish | Cline |
| P2 | Customer testimonials | Either |
| P2 | Partner trust logos | Either |

---

*Last updated: January 28, 2026*
