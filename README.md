# Little Love — A Cute Gift Site 💖

A cozy, wholesome, playful single-page website made with Next.js (App Router) + TypeScript + Tailwind CSS. Designed to be easily customized and deployed on Vercel.

## ✨ Features
- Mobile-first responsive layout
- Floating background emojis and a cute cursor heart trail
- Hero section with configurable name/message
- Memories gallery with lightbox (click to enlarge)
- Mood Uplifter mini-game: random compliments, virtual hugs, and memories with heart/sparkle bursts
- Reasons list with animated cards
- Sweet footer message

## 🛠 Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS

## 🚀 Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

## 🔧 Customization

Edit text and content in:

- `lib/constants.ts`
  - `HER_NAME`: Set her name shown in the hero section.
  - `HERO_MESSAGE`: Edit the hero message.
  - `MEMORIES`: Update image paths/captions for the Memories gallery.
  - `COMPLIMENTS`, `VIRTUAL_HUGS`, `RANDOM_MEMORIES`: Messages for the Mood Uplifter.
  - `REASONS`: Items for the Reasons list.

Replace images:

- Add your photos in `public/friend/` and update paths like `friend/photo1.jpg` in `lib/constants.ts`.

Styling:

- Global styles and keyframes are in `app/globals.css`.
- Tailwind config is in `tailwind.config.ts`.

## 📦 Project Structure

```
app/
  layout.tsx          # App shell
  page.tsx            # Single page combining all sections
  globals.css         # Tailwind + custom styles
components/
  Hero.tsx
  MemoriesGallery.tsx # Lightbox on click
  MoodUplifter.tsx    # Mini-game (Option A)
  ReasonsList.tsx
  Footer.tsx
  FloatingEmojis.tsx  # Background floaty emojis
  CursorHearts.tsx    # Cute cursor heart trail
lib/
  constants.ts        # All editable text + lists
public/
  friend/             # Put your photos here
```

## 🌈 Deploying to Vercel

1) Push this repository to GitHub (or GitLab/Bitbucket).
2) Go to Vercel and import your repo.
3) Use default settings; Vercel will detect Next.js automatically.
4) Click Deploy — your site will be live in a minute or two.

## 📝 Notes

- This project uses the App Router and is compatible with Next.js 14+.
- All interactive effects (cursor hearts, confetti bursts) are lightweight and purely CSS/DOM-based.
- You can remove any section you don’t want by editing `app/page.tsx`.

Enjoy gifting! 💝


