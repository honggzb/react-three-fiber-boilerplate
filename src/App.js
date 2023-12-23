import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Watch from "./components/watch";
import Shoe from "./components/shoe";
import Basic from "./components/basic";
import RTexture from "./components/texture";
import Room from "./components/room-dome";
import IPhone from "./components/phone"
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/basic">Basic</Link> </li>
            <li> <Link to="/rtexxture">RenderTexture</Link> </li>
            <li> <Link to="/shoe">Shoe</Link> </li>
            <li> <Link to="/watch">Watch</Link> </li>
            <li> <Link to="/iphone">Iphone</Link> </li>
            <li> <Link to="/room">Room</Link> </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/shoe" element={<Shoe/>}></Route>
          <Route path="/watch" element={<Watch />}></Route>
          <Route path="/basic" element={<Basic/>}></Route>
          <Route path="/rtexxture" element={<RTexture/>}></Route>
          <Route path="/room" element={<Room/>}></Route>
          <Route path="/iphone" element={<IPhone/>}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return <h2>Welcome to 3D website</h2>;
}