# ACME Bank - Digital Banking Landing Page

A modern, responsive landing page for ACME Bank built with React, Vite, and Tailwind CSS. Perfect for demo purposes showcasing a new digital bank.

## Features

- Fully responsive design (mobile, tablet, and desktop)
- Modern UI with smooth animations and transitions
- Hero section with call-to-action buttons
- Features/benefits showcase
- About section with statistics
- Comprehensive footer with links
- Mobile-friendly navigation with hamburger menu

## Tech Stack

- **React** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd acme-bank
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

## Easy Deployment Options

### Option 1: Netlify (Recommended)

1. Create a free account at [netlify.com](https://netlify.com)
2. Run `npm run build` to create the dist folder
3. Drag and drop the `dist` folder to Netlify's dashboard
4. Your site is live in seconds!

**Or use Git:**
- Connect your GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts
4. Your site is deployed!

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/acme-bank",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`

### Option 4: Cloudflare Pages

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your Git repository
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

## Project Structure

```
acme-bank/
├── src/
│   ├── App.jsx          # Main component with all sections
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind directives
├── public/              # Static assets
├── index.html           # HTML template
└── package.json         # Dependencies
```

## Customization

### Colors
Edit the Tailwind classes in `src/App.jsx`. The primary color scheme uses indigo/blue tones.

### Content
All text content is in `src/App.jsx`. Simply search and replace to customize:
- Company name
- Hero text
- Features
- About section
- Footer links

### Styling
Tailwind CSS makes it easy to customize. Common patterns:
- `bg-indigo-600` - Background colors
- `text-gray-900` - Text colors
- `px-4 py-2` - Padding
- `rounded-lg` - Border radius
- `shadow-lg` - Box shadows

## License

This project is for demo purposes. Feel free to use and modify as needed.
