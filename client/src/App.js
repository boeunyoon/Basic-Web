import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandinPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
function App() {
  return (
    <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>

      <hr />

      <Routes>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/" element={<LandinPage/>} />
    </Routes>
    </div>
  </Router>
  );
}

export default App;
