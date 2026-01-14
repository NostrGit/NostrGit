# NostrGit Experimental - Standalone Version

A single-file, zero-build Preact/HTM version of NostrGit Explore page.

## Why?

The main NostrGit project has a complex setup:
- Next.js 13 (app directory)
- TypeScript compilation
- 450+ npm packages
- Outdated dependencies
- Build/deployment complexity

This experimental version is:
- **One HTML file** - Just `index.html`
- **No build step** - Open directly in browser
- **No npm** - All dependencies from CDN
- **Same functionality** - Real Nostr integration
- **Same look** - Identical purple theme

## How to Run

```bash
# Option 1: Just open it
open experimental/index.html

# Option 2: Local server (recommended for CORS)
cd experimental
python3 -m http.server 8000
# Visit: http://localhost:8000
```

That's it! No `npm install`, no build, no nothing.

## What Works

✅ **Complete Site with 4 Pages**

**Navigation:**
- Sticky header with NostrGit branding
- Hash-based routing (no server needed!)
- Active page highlighting

**Home Page:**
- Hero section with gradient background
- 3 feature cards (Decentralized, Censorship Resistant, Community Owned)
- Call-to-action buttons
- Clean, modern landing page design

**Explore Page (Fully Functional):**
- Connects to 9 Nostr relays via WebSocket
- Displays kind 30617 repository announcements (NIP-34)
- Live stats (connected relays, repo count, events)
- Interactive repository cards
- Copy-to-clipboard git clone
- Clickable maintainer/owner profiles (nostr.eu)
- Topic tags
- Visit website buttons
- Filter tabs (All/Trending/New UI ready)
- Responsive design

**About Page:**
- Explanation of NostrGit and Nostr protocol
- Problem/Solution format
- NIP-34 information
- Styled content cards

**Docs Page (Stub):**
- "Under construction" notice
- 4 placeholder cards for future docs
- Links to NIP-34 spec

## Tech Stack

- **Preact + HTM** - React-like UI from CDN
- **Tailwind CSS** - Styling from CDN
- **Native WebSockets** - No libraries needed
- **Vanilla JS** - No TypeScript, no compilation

## File Structure

```
experimental/
├── index.html    # Everything in one file!
└── README.md     # This file
```

## Next Steps

1. ✅ Explore page with full Nostr integration
2. ✅ Navigation and hash-based routing
3. ✅ Home, About, Docs pages
4. ⏳ Make filters functional (Trending/New sorting)
5. ⏳ Add search functionality
6. ⏳ Repo detail pages?
7. ⏳ Make it a PWA?
8. ⏳ Deploy to GitHub Pages?

## Comparison

| Feature | Main Project | Experimental |
|---------|-------------|--------------|
| Files | 100+ | 1 |
| npm packages | 456 | 0 |
| Build time | ~30s | 0s |
| Dev server | Next.js | Any (or none) |
| TypeScript | Yes | No |
| Dependencies | Outdated | Always latest (CDN) |
| Setup time | 5-10 min | 0 sec |

## Philosophy

Sometimes simpler is better. This proves NostrGit's core functionality works without the complexity.
