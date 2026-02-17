# LinkSphere 🌐

LinkSphere is a modern, real-time chat application built with React, Express, MongoDB, and Stream SDK. It features secure authentication, real-time messaging, and video calling capabilities.

## ✨ Features

- **🔐 Secure Authentication**: Google OAuth 2.0 integration for seamless login.
- **💬 Real-time Chat**: Instant messaging powered by Stream Chat SDK.
- **📹 Video Calls**: High-quality video communication integrated via Stream Video SDK.
- **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS and DaisyUI.
- **🛠️ State Management**: Efficient global state handling using Zustand.
- **🔄 Data Fetching**: Robust data management with React Query.

## 🚀 Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS + DaisyUI** (Styling)
- **Zustand** (State Management)
- **React Query** (Data Fetching)
- **Stream SDK** (Chat & Video)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose** (Database)
- **JSON Web Tokens (JWT)** (Session Management)
- **Stream API** (Server-side SDK)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB account
- Stream API account

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mananmeemroth/LinkSphere.git
   cd LinkSphere
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example (if available) or add:
   # PORT=5000
   # MONGODB_URI=your_mongodb_uri
   # JWT_SECRET=your_jwt_secret
   # STREAM_API_KEY=your_stream_api_key
   # STREAM_API_SECRET=your_stream_api_secret
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Create a .env file and add:
   # VITE_STREAM_API_KEY=your_stream_api_key
   npm run dev
   ```

## 📂 Project Structure

```text
LinkSphere/
├── backend/            # Express server & API logic
│   ├── src/
│   │   ├── controllers/# Route handlers
│   │   ├── models/     # Database schemas
│   │   └── routes/     # API endpoints
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # View components
│   │   └── store/      # Zustand state
└── README.md           # Project documentation
```

## 📄 License

This project is licensed under the ISC License.
