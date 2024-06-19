import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Roadmap from './pages/Roadmap';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  )
}