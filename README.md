QuizNix

A sleek quiz platform with a yellow-and-black theme, featuring animations for an engaging experience. Users can join rooms, take quizzes, while admins create rooms and questions. Built with Express.js, MongoDB, and React, it ensures secure, interactive quizzing.

Features

User Authentication: Secure registration and login using JWT.
Room Management: Admins can create quiz rooms with unique codes, subjects, and difficulty levels.
Question Creation: Supports MCQ, True/False, and Fill-in-the-Blank questions
Quiz Participation: Users join rooms via codes and take quizzes with real-time feedback.
Results Tracking: Displays scores and results after quiz completion.
Theming & Animations: Yellow-and-black design with smooth Framer Motion animations.

Tech Stack

Backend: Express.js, MongoDB, Mongoose, JWT
Frontend: React, React Router, Axios, Framer Motion
Styling: Custom CSS with a yellow-and-black theme

Tech Stack





Backend: Express.js, MongoDB, Mongoose, JWT



Frontend: React, React Router, Axios, Framer Motion



Styling: Custom CSS with a yellow-and-black theme

Installation





Clone the repository:

git clone <your-repo-url>



Install backend dependencies:

cd backend && npm install


Install frontend dependencies:

cd ../frontend && npm install

Set up environment variables in backend/.env:

MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret_here
PORT=4000

Usage
Start the backend server:

cd backend && npm start

Start the frontend development server:

cd frontend && npm run dev

Open http://localhost:5173 in your browser.

Register/login, create or join a room, and start quizzing!

Folder Structure

backend/: API routes, models, and server logic

models/: User, Room, Question schemas

routes/: Auth, room, and question routes

frontend/: React app

pages/: Home, CreateRoom, JoinRoom, Quiz, Result

components/: Reusable UI components

Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

License

This project is licensed under the MIT License.
