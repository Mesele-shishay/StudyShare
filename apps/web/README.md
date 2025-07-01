# StudyShare Web App

A modern, mobile-first e-learning platform built with Next.js, React, Redux Toolkit, Zustand, and TypeScript. StudyShare offers a beautiful, intuitive interface for discovering, purchasing, and taking online courses, with full PWA support for installable, offline-ready experiences.

---

## 🚀 Features

- **Course Discovery**: Browse and search a wide range of courses by category.
- **Course Details**: View detailed information, lessons, instructors, and reviews for each course.
- **User Authentication**: Sign up, sign in, and manage your profile securely.
- **Wishlist**: Save courses to your wishlist for later.
- **My Courses**: Track ongoing and completed courses.
- **Checkout & Payment**: Smooth checkout flow with payment method selection and coupon support.
- **Leave Reviews**: Rate and review courses after completion.
- **Help & Support**: Access FAQs and support resources.
- **Progressive Web App**: Installable, offline-capable, and mobile-optimized.

---

## 📁 Folder Structure

```
apps/web/
├── public/           # Static assets (icons, images, manifest, etc.)
├── src/
│   ├── app/          # Next.js app directory (pages, layouts, features)
│   ├── components/   # Reusable UI components
│   ├── constants/    # Theme, colors, fonts, etc.
│   ├── course/       # Course-related UI components
│   ├── data/         # Data fetching utilities
│   ├── items/        # List and item components
│   ├── routes/       # Route definitions
│   ├── scss/         # Global and modular SCSS styles
│   ├── stores/       # Zustand stores for state management
│   ├── svg/          # SVG React components
│   ├── text/         # Typography components
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── next.config.ts    # Next.js configuration (with PWA support)
├── package.json      # Project metadata and scripts
├── tsconfig.json     # TypeScript configuration
└── ...
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, SSR, SSG)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/), [Radix UI](https://www.radix-ui.com/), [SCSS](https://sass-lang.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), [Zustand](https://zustand-demo.pmnd.rs/)
- **Networking**: [Axios](https://axios-http.com/)
- **PWA**: [@ducanh2912/next-pwa](https://github.com/ducanh2912/next-pwa)
- **Carousel**: [Swiper](https://swiperjs.com/)

---

## ⚡ Getting Started

### 1. Install dependencies

```bash
pnpm install
# or
npm install
```

### 2. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 3. Build for production

```bash
pnpm build
# or
npm run build
```

---

## 🌐 PWA Support
- Fully installable on mobile and desktop
- Offline support via service worker
- Custom icons and splash screens (see `public/`)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -m 'Add feature' && git push`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements
- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Swiper](https://swiperjs.com/)
