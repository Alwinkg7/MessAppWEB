# MessApp | Modern Canteen Management System

![MessApp Header](./public/assets/readme-header.png)

MessApp is a high-performance, full-stack canteen management platform designed for efficiency and speed. Built with a **Neubrutalism Design System**, it provides a bold, tactile, and highly interactive experience for both users and administrators.

---

## ⚡ Key Features

### 👤 User Dashboard
- **Instant Attendance**: Generate unique personal QR codes for quick meal verification.
- **Balance Tracking**: Real-time monitoring of account balances and meal credits.
- **Attendance History**: detailed logs of previous meal scans and transactions.
- **Neubrutal UI**: A responsive, "raw" interface that feels tactile and alive.

### 🛡️ Admin Power Panel
- **Smart Attendance Scanning**: Built-in camera-based QR scanning for real-time validation.
- **User Management**: Full CRUD capabilities to manage students, staff, and visitors.
- **Billing & Analytics**: Automated billing cycles and detailed financial reports.
- **Meal Management**: Dynamic configuration for meal types, pricing tiers, and service windows.
- **Live Monitoring**: Real-time polling-based tracking of active meal sessions.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Custom Neubrutalism Tokens
- **Logic**: [TypeScript](https://www.typescriptlang.org/)
- **Auth**: JWT-based Secure Authentication
- **QR Engine**: `html5-qrcode` & `qrcode.react`
- **Toasts**: `react-hot-toast`
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🎨 Design Philosophy: Neubrutalism

MessApp embraces **Neubrutalism**, moving away from typical "clean" designs towards something bold and impactful:
- **High Contrast**: Stark black borders (`border-3`) and vibrant neon accents.
- **Raw Geometry**: Sharp corners and rigid layouts for a "built-to-last" feel.
- **Tactile Feedback**: Heavy shadows (`shadow-brutal`) and active state animations that make the UI feel reactive.
- **Modern Typography**: Utilizing *Space Grotesk* for headings and *Inter* for maximum readability.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Alwinkg7/MessAppWEB.git
cd messappweb
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your backend API URL:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Project Structure

```text
src/
├── app/                  # Next.js App Router (Routes & Pages)
│   ├── admin/           # Admin Dashboard Features
│   ├── user-dashboard/  # User Personal Panel
│   ├── login/           # Auth Flow
│   └── home/            # Public Landing Page
├── components/           # Reusable Neubrutal UI Components
├── lib/                  # Utility Functions & API Services
└── styles/               # Global CSS & Tailwind Configuration
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by **Alwin K G**
