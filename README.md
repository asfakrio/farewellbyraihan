# Farewell Fiesta App

This is a Next.js application built with Firebase Studio to create a personalized farewell website.

## Getting Started

To get started, take a look at `src/app/page.tsx`.

### Prerequisites
- Node.js and npm (or yarn) installed.

### Installation
1. Clone the repository (if applicable).
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:9002](http://localhost:9002) (or the port specified in your `package.json`) with your browser to see the result.

## Features

- **Name Input**: Landing page with a name input form.
- **Personalized Message Display**: A dedicated page shows a personalized farewell message.
- **GSAP Animations**: Rich animations and transitions are implemented using the GSAP library.
- **Background Music**: The farewell page includes background music to enhance the emotional experience.

## Important Notes

### GSAP (GreenSock Animation Platform)
This project uses GSAP for animations. It has been added as a dependency in `package.json`.

### Background Music
The farewell page attempts to play background music.
- You **MUST** place your royalty-free audio file named `background-music.mp3` inside the `public/audio/` directory.
- If the file is not present, the music player will not function correctly.
- Background music autoplay is subject to browser policies and may require user interaction to start. A simple play/pause control is provided.

### Customization
- **Farewell Message**: The core farewell message from Raihan is located in `src/app/farewell/page.tsx`. You can edit it there.
- **Styling**: Colors, fonts, and other global styles are defined in `src/app/globals.css` and `tailwind.config.ts`.
- **Animations**: Animations are primarily handled using GSAP within the respective page/component files (`src/app/page.tsx`, `src/app/farewell/page.tsx`, `src/components/ConfettiAnimation.tsx`).

## Project Structure
- `src/app/`: Contains the main application pages and layout.
  - `page.tsx`: The landing page where users enter their name.
  - `farewell/page.tsx`: The page displaying the personalized farewell message.
  - `layout.tsx`: The main layout file, including font setup.
  - `globals.css`: Global styles and Tailwind CSS theme customizations.
- `src/components/`: Contains reusable React components.
  - `ConfettiAnimation.tsx`: GSAP-based confetti effect.
  - `MusicPlayer.tsx`: Component for background music.
  - `ui/`: ShadCN UI components.
- `public/`: Static assets.
  - `audio/`: **Place your `background-music.mp3` here.**
- `tailwind.config.ts`: Tailwind CSS configuration.
- `next.config.ts`: Next.js configuration.

## Deployment
You can deploy this Next.js application to platforms like Vercel, Netlify, or Firebase Hosting. Ensure your build process includes all necessary files and environment variables if any are added later.
```
