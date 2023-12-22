import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Watch from "./components/watch";
import Shoe from "./components/shoe";
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/shoe">Shoe</Link> </li>
            <li> <Link to="/watch">Watch</Link> </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/shoe" element={<Shoe/>}></Route>
          <Route path="/watch" element={<Watch />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Welcome to 3D website</h2>;
}
