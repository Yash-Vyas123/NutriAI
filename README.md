# 🥗 NutriAI — Your Smart Nutrition & Fitness Companion

NutriAI is a premium, full-stack web application designed to help users track their health, generate personalized AI-powered meal plans, and interact with an expert NutriBot for real-time nutritional advice.

![NutriAI Banner](https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **🧠 AI Meal Planner**: Generates daily meal plans tailored to your BMI, fitness goals, and food preferences.
- **💬 NutriBot**: An expert AI-powered nutritionist that answers your health queries and provides personalized advice.
- **📊 Health Dashboard**: Real-time tracking of BMI scores, target calories, and macronutrient balance.
- **🥗 Food Database**: Extensive database to search for nutritional values of thousands of food items.
- **📈 Progress Tracking**: Log your daily weight and monitor your fitness journey with intuitive charts.
- **💎 Premium UI**: Sleek, "Neural/Scientific" design with glassmorphism and smooth animations.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Recharts.
- **Backend**: Node.js, Express.js.
- **AI**: Google Gemini Pro (via `@google/generative-ai`).
- **Database**: MongoDB Atlas.
- **Auth**: JSON Web Tokens (JWT) & Bcryptjs.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API Key (get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/nutriai.git
   cd nutriai
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file from the example
   cp .env.example .env
   ```
   *Edit `backend/.env` with your actual MongoDB URI and Gemini API Key.*

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend server**:
   ```bash
   cd backend
   npm run dev
   ```
   *Server will run on `http://localhost:5001`*

2. **Start the Frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```
   *App will be available at `http://localhost:5173`*

## 📁 Project Structure

```text
nutriai/
├── backend/            # Express.js REST API
│   ├── controllers/    # Route controllers (AI, Health, Auth, etc.)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express router endpoints
│   ├── scripts/        # Database seeding scripts
│   └── server.js       # Entry point
├── frontend/           # React application (Vite)
│   ├── src/
│   │   ├── pages/      # View components
│   │   ├── components/ # Reusable UI pieces
│   │   └── api/        # Axios configuration
│   └── tailwind.config.js
└── README.md
```

## 🔐 Security Note

The `.env` file in the backend folder contains sensitive keys and is excluded from Git via `.gitignore`. Always use `.env.example` as a template for new environments.

## 📜 License

This project is licensed under the MIT License.
