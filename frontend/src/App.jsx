import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import AdminDashboard from './pages/AdminDashboard';

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/quiz/:code" element={<Quiz />} />
        <Route path="/result/:code" element={<Result />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ✅ Add this route */}
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
