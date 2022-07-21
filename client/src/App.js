import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import Auth from './hoc/auth'
import React,{ Suspense } from 'react';
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
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
      <Route path="/" element={Auth(LandingPage, null)} />
      <Route path="/login" element={Auth(LoginPage, false)} />
      <Route path="/register" element={Auth(RegisterPage, false)} />
    </Routes>
    </div>
  </Router>
  </Suspense>
  );
}

export default App;
