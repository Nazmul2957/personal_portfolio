# 🌟 Personal Developer Portfolio (Connected to Admin Panel)

A high-converting personal developer portfolio frontend built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. 

It is connected to the **Admin Panel CMS** located in `D:\Portfolio`, consuming all of its **GET APIs** with real-time sync, graceful offline caching, and direct contact form submission.

---

## 🔌 Discovered Admin Panel GET APIs & Endpoints

From analyzing the Admin Panel codebase (`D:\Portfolio`), the portfolio connects to the following REST API endpoints:

| Section | Method | Endpoint / Route | Description |
| :--- | :---: | :--- | :--- |
| **Profile** | `GET` | `/profile` | User avatar, name, bio, tagline, location, phone, social links |
| **Skills** | `GET` | `/skills` or `/api/skills` | Technical skills matrix, category grouping, proficiency %, and years of experience |
| **Projects** | `GET` | `/projects` or `/api/projects` | Project case studies, tech stack badges, live demo / github URLs, and **Base64 image galleries** |
| **Experience** | `GET` | `/experiences` | Work timeline, company names, date ranges, achievements & technologies |
| **References** | `GET` | `/references` | Verified managerial endorsements (e.g. Google, Meta leaders) |
| **Testimonials**| `GET` | `/testimonials/public` | Client & peer recommendations with 1–5 star ratings and LinkedIn verification |
| **Blog Articles**| `GET` | `/articles/public` or `/api/blog` | Technical articles, reading time estimators, view counts, and like counters |
| **Single Article**| `GET` | `/articles/slug/:slug` | In-depth article reader with full Markdown body |
| **Inquiries** | `POST`| `/inquiries/public` or `/api/contact` | Public contact form routed directly to the Admin Panel's `/inbox` & `/messages` |
| **Article Reaction**| `POST`| `/articles/:id/like` | Interactive applause / like count increment |

---

## 🎨 Lucrative & Attractive Frontend Design Features

- 🌌 **High-End Glassmorphism & Ambient Lighting**: Sleek dark-mode aesthetic with custom background grid patterns, glowing radial backlights, and fluid micro-interactions.
- 🌓 **One-Click Theme Switcher**: Toggle between Dark and Light mode.
- ⚡ **Interactive Terminal & Telemetry**: Dynamic code showcase with key architecture highlights (sub-50ms latency, RBAC security, full-stack pipelines).
- 🗂️ **Categorized Skills Matrix**: Interactive category pills (`Frontend`, `Backend`, `Cloud & DevOps`, `Database`, `AI & ML`, `Tools`) with live search and glowing progress bars.
- 🖼️ **Multi-Image Base64 Gallery Modal**: Complete case study modal rendering multiple screenshot thumbnails, architecture overviews, and live links.
- 💼 **Career Timeline**: Clean vertical timeline with company badges, date ranges, current position indicators, and bulleted achievements.
- ⭐ **Client Testimonials & Executive References**: 5-star rating displays and verified endorsements.
- 📖 **Interactive Technical Blog**: Articles reader with Markdown rendering and an interactive "Applaud" reaction button.
- 📬 **Live Admin-Routed Contact Form**: Form with nature of collaboration selector, budget range selector, and instant confirmation dispatch.
- 🟢 **Live Admin API Status Inspector**: Floating top bar badge and diagnostic modal showing real-time endpoint latency and a 1-click **"Re-sync Now"** trigger.

---

## 🚀 Getting Started

### 1. Run the Portfolio Frontend
In `e:\Personal Portfolio`:
```bash
npm run dev
```
The portfolio will start on [http://localhost:3002](http://localhost:3002).

### 2. Run the Admin Panel
In `D:\Portfolio`:
```bash
npm run dev
```
The Admin Panel will run on [http://localhost:3001](http://localhost:3001).

### 3. Environment Variables (`.env.local`)
```env
# Backend REST API endpoint (where Admin Panel pushes updates)
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Admin Panel frontend URL
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001

# Graceful fallback to rich initial data if backend is offline
NEXT_PUBLIC_FALLBACK_TO_MOCK=true
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
