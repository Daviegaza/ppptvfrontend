# ppptv — The Pulse of Now

A full-featured, Africa-first news and social media platform — built with React, TypeScript, and Vite. Fully frontend, no backend required.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

Admin HQ is at [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts           # All TypeScript interfaces
├── data/
│   └── mockData.ts        # All demo data (posts, authors, streams, etc.)
├── context/
│   └── AppContext.tsx      # Global state (posts, theme, alerts, toasts)
├── components/
│   ├── layout/
│   │   ├── SideBar.tsx    # Desktop left nav
│   │   ├── RightPanel.tsx # Desktop right panel (trending, suggestions)
│   │   ├── BottomBar.tsx  # Mobile nav bar + drawer
│   │   └── LiveTicker.tsx # Scrolling news ticker
│   ├── feed/
│   │   ├── PostCard.tsx   # Full post card (likes, polls, fact-check)
│   │   ├── ComposeBox.tsx # Write a post
│   │   └── StoryRail.tsx  # Stories row
│   └── ui/
│       └── Toast.tsx      # Toast notifications
├── pages/
│   ├── HomePage.tsx       # Main feed with tabs + breaking banners
│   ├── ExplorePage.tsx    # Search + categories + trending
│   ├── LivePage.tsx       # Live streams hub
│   ├── NewsPage.tsx       # Editorial news layout
│   ├── PostPage.tsx       # Single post + replies
│   └── admin/
│       └── AdminPage.tsx  # Full admin HQ (6 sections)
├── index.css              # Complete design system
├── App.tsx                # Router + shell
└── main.tsx               # Entry point
```

---

## 🎛️ Admin HQ Features

| Section | What it does |
|---|---|
| **Dashboard** | Platform stats, recent activity table |
| **Publish Post** | Compose & publish any post type with image, region, source |
| **Breaking News** | Push urgent alerts to ticker + homepage banners |
| **Moderation** | Review flagged content, approve/remove posts, pin posts |
| **Trending Manager** | Add/remove trending hashtags, control what trends |
| **Live Streams** | Feature streams, end broadcasts |
| **Analytics** | Views, likes, reposts, post type breakdown, top post, weekly chart |

---

## 🌍 Demo Data

- **17 demo posts** covering AI policy, finance, health, sports, culture, and politics
- **10 authors** with diverse African backgrounds and verified/pro status
- **8 trending topics** with growth metrics
- **5 live streams** (4 live, 1 ended)
- **4 breaking alerts** across urgency levels
- **Story rail** with 6 anchors

---

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **React Router v6**
- **Vite**
- **Google Fonts**: Syne (display) + DM Sans (body) + JetBrains Mono
- Zero external UI libraries — all custom CSS

---

## 🎨 Design System

Dark-first editorial theme with full light mode support. CSS variables for all tokens. Responsive — sidebar layout on desktop, bottom nav on mobile.
