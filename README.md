# AbdulQader Qassab - Portfolio

A modern, professional portfolio website built with cutting-edge technologies.

## 🚀 Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** Three.js, React Three Fiber, @react-three/drei
- **State Management:** Zustand
- **Icons:** Lucide React
- **Code Quality:** ESLint, Prettier
- **Deployment:** Docker, GitHub Actions

## 🛠️ Features

- ⚡ Lightning-fast performance with Vite
- 🎨 Modern UI with Tailwind CSS
- 🌊 Smooth animations with Framer Motion
- 🌍 **3D Open World Experience** with Three.js
- 🎮 Dual-mode portfolio (2D traditional + 3D interactive)
- 📱 Fully responsive design
- 🔍 SEO optimized
- ♿ Accessibility compliant
- 🐳 Docker containerization
- 🚀 CI/CD pipeline with GitHub Actions
- 📊 Type-safe with TypeScript
- 🎯 Component-based architecture

## 🌍 3D Open World Experience

Click the **"3D World"** button to enter an immersive 3D environment!

### 3D World Features

**Interactive Environment:**
- Cyberpunk-themed world with reflective floors and neon grid
- Central tower hub with glowing <AQ/> branding
- 4 section buildings representing portfolio categories
- Realistic lighting (ambient, directional, point, hemisphere)
- Dynamic sky with stars and atmospheric effects

**Exploration & Interaction:**
- **Orbital Controls:** Drag to rotate, scroll to zoom, click to interact
- **8 Collectibles:** Find floating XP orbs (⭐) and secret items (🎮💎🔮🏆)
- **Portal System:** Click glowing portals to navigate sections
- **Minimap:** Track your position and locate collectibles
- **Player Character:** Animated avatar with smooth bobbing effects

**Visual Effects:**
- Reflective materials with metalness and roughness
- Emissive glowing elements (portals, collectibles, buildings)
- Real-time shadows and lighting
- Particle rings around portals
- Smooth animations (rotating, floating, pulsing)

**Gamification Integration:**
- **50 XP** per XP orb collected
- **100 XP** per secret item collected
- **25 XP** per portal interaction
- Unlock **"Secret Hunter"** achievement by finding all secrets
- Particle effects on collection
- Progress tracked in real-time

**Controls:**
- **Mouse Drag:** Rotate camera view
- **Mouse Scroll:** Zoom in/out
- **Click:** Collect items or enter portals
- **Mode Toggle:** Switch between 2D and 3D anytime

## 🎮 Gamification Features

This portfolio includes a comprehensive gamification system that makes exploring the site fun and engaging!

### Achievement System (15 Achievements)
Unlock achievements by exploring the portfolio and completing challenges:

**Exploration Achievements:**
- 👋 **First Contact** - Welcome to the portfolio! (50 XP)
- 🗺️ **Section Explorer** - Visit all portfolio sections (100 XP)
- 🤝 **Social Connector** - Click on all social media links (75 XP)
- 🔄 **Return Visitor** - Visit the portfolio 5 times (200 XP)

**Challenge Achievements:**
- 💻 **Code Master** - Complete all coding challenges (300 XP)
- ⌨️ **Typing Wizard** - Type faster than 60 WPM (200 XP)
- 💯 **Perfectionist** - Get 100% on all quizzes (200 XP)

**Time-Based Achievements:**
- ⚡ **Speed Reader** - Spend less than 2 minutes (75 XP)
- 🎯 **Dedicated Visitor** - Spend more than 10 minutes (150 XP)

**Secret Achievements:**
- 🔍 **Secret Hunter** - Find all hidden easter eggs (250 XP)
- 🎮 **Old School** - Enter the Konami Code (↑↑↓↓←→←→BA) (150 XP)
- 🦉 **Night Owl** - Visit between midnight and 4 AM (100 XP)
- 🌅 **Early Bird** - Visit between 5 AM and 7 AM (100 XP)
- 🖥️ **Console Warrior** - Use secret console commands (150 XP)

**Milestone Achievements:**
- ⭐ **Rising Star** - Reach Level 10 (500 XP)

### XP & Leveling System
- Earn XP for completing achievements, challenges, and exploring
- Level up every 500 XP
- Visual progress bars showing level progression
- Track total XP and current level

### Interactive Code Challenges
Click the floating code button to access challenges:
- **Reverse a String** (Easy - 50 XP)
- **Fibonacci Sequence** (Medium - 100 XP)
- **Palindrome Checker** (Easy - 50 XP)
- **Two Sum** (Medium - 100 XP)
- **Typing Speed Test** (Medium - 75 XP)
- **Technology Quiz** (Easy - 50 XP)

### Easter Eggs & Secrets
Hidden features to discover:
- **Konami Code**: Press ↑ ↑ ↓ ↓ ← → ← → B A
- **Console Commands**: Type `portfolio.help()` in browser console
- **Time-Based**: Visit at specific times for secret achievements
- **Social Interactions**: Click all social links
- **Hidden Particles**: Achievements trigger particle effects

### Game HUD
- Compact floating HUD showing level and XP
- Expandable stats panel with detailed metrics:
  - Level and total XP
  - Achievement completion
  - Challenge completion
  - Secrets found
  - Visit count
  - Time spent

### Progress Persistence
All game progress is automatically saved to localStorage:
- Achievements unlocked
- Challenges completed
- Level and XP
- Visit count
- Time spent

### Console Commands
Open browser console and try these:
```javascript
portfolio.help()    // Show all commands
portfolio.stats()   // Display game statistics
portfolio.unlock()  // Unlock Console Warrior achievement
portfolio.cheat()   // Get a hint for the Konami Code
portfolio.reset()   // Reset all game progress
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t abdulqader-portfolio .

# Run container
docker run -p 8080:80 abdulqader-portfolio

# Or use Docker Compose
docker-compose up -d
```

## 📁 Project Structure

```
src/
├── components/
│   ├── game/            # Gamification components
│   │   ├── GameHUD.tsx
│   │   ├── AchievementNotification.tsx
│   │   ├── ChallengesPanel.tsx
│   │   ├── TypingGame.tsx
│   │   └── ParticleEffect.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   └── ...              # Other portfolio components
├── data/
│   ├── portfolio.ts     # Professional data
│   ├── achievements.ts  # Achievement definitions
│   └── challenges.ts    # Challenge definitions
├── hooks/
│   ├── useGameState.ts  # Game state management
│   ├── useEasterEggs.ts # Easter egg detection
│   ├── useSectionTracker.ts
│   └── ...              # Other custom hooks
├── types/
│   ├── game.ts          # Game-related types
│   └── index.ts         # Portfolio types
├── utils/               # Utility functions
├── App.tsx              # Main App component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Key Components

- **Navbar:** Dynamic navigation with active section tracking
- **Hero:** Animated landing section with code window
- **Experience:** Timeline-based work history
- **Skills:** Technical expertise showcase
- **Education:** Academic background
- **Achievements:** Awards and certifications
- **Contact:** Multiple contact methods

## 🚀 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on push to the main branch.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting service
```

## 📄 License

© 2025 AbdulQader Qassab. All rights reserved.

## 🤝 Contact

- Email: abduLqader_Q@hotmail.com
- LinkedIn: [abdulqader-qassab](https://www.linkedin.com/in/abdulqader-qassab)
- ICPC: [ZEL30F6JS098](https://icpc.global/ICPCID/ZEL30F6JS098)
