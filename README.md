# 🎓 StudyShare

> **A modern, AI-powered Telegram Web App for university students to manage, share, and supercharge their academic life.**

---

## 🧠 Concept Summary

StudyShare is a mobile-first, AI-integrated platform embedded in Telegram, enabling students to:

- 📤 **Upload** class notes or documents (PDF, DOCX)
- 🧠 **Generate smart summaries & flashcards** using AI
- 🔎 **Check for plagiarism**
- 🤝 **Share & browse study materials** by course/university
- 📱 **Access everything in a lightweight web interface** inside Telegram

---

## 🚀 Why StudyShare?

- **No new logins or installs** — just open via Telegram
- **AI-assisted learning** — save hours on manual work
- **Community-powered** — share and discover resources
- **Freemium model** — start free, upgrade for more

---

## 🔑 Key Features

### 1. 📤 Upload & Share Academic Materials

- Upload documents with metadata (title, course, department, year, tags)
- Browse, download, rate, and bookmark materials

### 2. 🧠 Smart AI Tools

- **Document Summarizer** (OpenAI-powered)
- **Flashcard Generator** (turns notes into Q&A)
- **Plagiarism Checker** (Copyleaks API)

### 3. 🔍 Browse & Search Library

- Public archive of shared materials
- Filters: department, course, university, keywords
- Preview and download PDFs

### 4. 👤 Personal Dashboard

- Upload & tool usage history
- Remaining credits (e.g., 10 free summaries/month)
- Profile info from Telegram

### 5. 💳 Payment System (Optional)

- Telegram Payments or Stripe
- Buy extra credits or Pro plan

---

## 📱 Telegram Web App Advantage

- Opens via Telegram bot with `/start`
- Seamless user auth (Telegram ID, HMAC verification)
- Full-screen, mobile-first UI
- Uses `window.Telegram.WebApp.initDataUnsafe` for user info

---

## 🧱 Tech Stack

| Layer        | Technology                            |
| ------------ | ------------------------------------- |
| Frontend     | Next.js 15, Tailwind CSS, shadcn/ui   |
| Backend API  | Express.js (REST)                     |
| ORM          | Prisma                                |
| Database     | PostgreSQL (Supabase)                 |
| File Storage | UploadThing / Cloudinary              |
| AI APIs      | OpenAI, Copyleaks                     |
| Telegram Bot | grammY                                |
| Auth         | Telegram WebApp + HMAC verification   |
| Payments     | Telegram Payments / Stripe (optional) |

---

## 💼 Business Model (Optional)

| Tier | Features                               |
| ---- | -------------------------------------- |
| Free | 10 credits/month, upload & browse only |
| Pro  | Unlimited AI tools, faster processing  |
| PAYG | Buy credits (e.g., 1 birr = 1 credit)  |

---

## 🏗️ MVP Scope

- ✅ Telegram Web App with basic UI
- ✅ Telegram-based authentication
- ✅ Upload form + store to DB
- ✅ AI summarizer (OpenAI)
- ✅ Material library with filters
- ✅ Credit system

---

## 🎨 Target UI Style

- Simple cards with icons and short actions
- Clean buttons, smooth modals (shadcn/dialog)
- Bottom tab or sidebar nav: Home / Tools / Library / Profile

---

## 👥 Who Will Use This?

- University students
- Lecturers sharing summaries
- Study group leaders, club members
- Self-learners needing fast learning assistance

---

## 📦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Mesele-shishay/StudyShare.git
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up environment variables** (see `.env.example`)
4. **Run the app:**
   ```bash
   pnpm dev
   ```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)
