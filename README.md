<div align="center">

# 🧩 AI Gesture Puzzle Game

### 🤚 AI-Powered Gesture-Controlled Sliding Puzzle

An interactive puzzle game that combines **Computer Vision**, **Artificial Intelligence**, and **Modern Web Technologies**. Solve sliding puzzles using **real-time hand gestures** or traditional **drag-and-drop** controls.

<p>
  <a href="https://gesture-puzzle-ai-49i3-five.vercel.app/"><img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Website-blue?style=for-the-badge"></a>
  <a href="https://github.com/Dikshit781/gesture-puzzle-ai"> <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github"></a>
</p>

</div>

---

# 📖 Overview

**AI Gesture Puzzle Game** is a full-stack web application that transforms any image into an interactive sliding puzzle. Players can control the puzzle using either:

- 🤚 Real-time hand gestures detected through a webcam
- 🖱️ Mouse or trackpad drag-and-drop

The project demonstrates practical applications of **Computer Vision**, **Image Processing**, and **Frontend–Backend Integration**.

---

# ✨ Features

### 🎮 Gameplay

- Sliding puzzle gameplay
- Easy (3×3), Medium (4×4), and Hard (5×5) difficulty levels
- Timer and move counter
- Best score tracking
- Interactive result screen
- Restart and Play Again functionality

### 🤖 AI Gesture Control

- Real-time hand tracking
- Pinch gesture detection
- Virtual cursor movement
- Pick-and-drop puzzle pieces
- Gesture status indicator

### 🖼️ Image Options

- 📷 Capture image using webcam
- 📁 Upload custom image
- 🖼️ Choose from built-in sample images

### 🎨 User Experience

- Glassmorphism-inspired UI
- Responsive design
- Loading screen with progress bar
- Sound effects
- Confetti celebration
- Smooth page transitions

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- DnD Kit
- Framer Motion
- React Webcam

## Backend

- FastAPI
- Python
- OpenCV
- Pillow
- NumPy

## AI & Computer Vision

- MediaPipe Hand Landmarker
- TensorFlow.js

## Deployment

- Frontend: Vercel
- Backend: Render
- Version Control: Git & GitHub

---

# 🏗️ System Architecture

```text
                 User
                   │
                   ▼
      React + Vite Frontend (Vercel)
                   │
          REST API Requests
                   │
                   ▼
       FastAPI Backend (Render)
                   │
      OpenCV Image Processing
                   │
      Generate Puzzle Pieces
                   │
                   ▼
      Return Image URLs to Frontend
```

---

# 📂 Project Structure

```text
gesture-puzzle-ai
│
├── backend
│   ├── app.py
│   ├── puzzle.py
│   ├── requirements.txt
│   └── uploads/
│
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🚀 Live Demo

🌐 **Frontend**

https://gesture-puzzle-ai-49i3-five.vercel.app/

⚙️ **Backend API**

https://gesture-puzzle-backend.onrender.com

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/Dikshit781/gesture-puzzle-ai.git

cd gesture-puzzle-ai
```

---

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🎮 How to Play

1. Launch the application.
2. Select an image:
   - Capture using camera
   - Upload image
   - Built-in image
3. Choose a difficulty level.
4. Generate the puzzle.
5. Solve using:
   - Mouse / Trackpad
   - Hand Gestures
6. Complete the puzzle and view your statistics.

---

# 🤚 Gesture Controls

| Gesture | Action |
|----------|--------|
| 👋 Open Hand | Move Cursor |
| 🤏 Pinch | Pick Up Puzzle Piece |
| ✋ Release | Drop Puzzle Piece |

---

# 💡 Challenges Solved

- Image upload and processing
- Dynamic puzzle generation
- Real-time hand gesture recognition
- REST API integration
- CORS configuration
- Deployment using Render and Vercel
- Client-side routing with React Router
- Responsive UI design

---

# 🚀 Future Enhancements

- Multiplayer mode
- Online leaderboard
- Additional gesture controls
- Voice commands
- Puzzle themes
- User authentication
- Cloud save support
- Mobile optimization

---

# 👨‍💻 Author

**Dikshit Dhiman**

- GitHub: https://github.com/Dikshit781
- LinkedIn: www.linkedin.com/in/dikshit-dhiman-89a7b1249

---


# 🎯 Why I Built This

The goal of this project was to explore the integration of AI-powered hand gesture recognition with a modern web application.

It demonstrates how Computer Vision can create natural, touch-free user interactions while combining React, FastAPI, OpenCV, and MediaPipe into a complete full-stack application.

---

# 🙌 Acknowledgements

- MediaPipe for real-time hand tracking
- OpenCV for image processing
- FastAPI for backend development
- React & Vite for frontend development

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a Star on GitHub!

Made by **Dikshit Dhiman**

</div>