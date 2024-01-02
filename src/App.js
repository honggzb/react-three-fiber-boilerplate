import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Watch, Shoe, Basic, RTexture, Room, IPhone, SkyboxDemo, Home, CarShow, GuildLine } from './components';
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
            <li> <Link to="/skybox">SkyboxDemo</Link> </li>
            <li> <Link to="/airplane">Airplane Following</Link> </li>
            <li> <Link to="/room">Room</Link> </li>
            {/* <li> <Link to="/carshow">CarShow</Link> </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/shoe" element={<Shoe />}></Route>
          <Route path="/watch" element={<Watch />}></Route>
          <Route path="/basic" element={<Basic />}></Route>
          <Route path="/rtexxture" element={<RTexture />}></Route>
          <Route path="/room" element={<Room />}></Route>
          <Route path="/iphone" element={<IPhone />}></Route>
          <Route path="/skybox" element={<SkyboxDemo />}></Route>
          <Route path="/airplane" element={<GuildLine />}></Route>
          {/* <Route path="/carshow" element={<CarShow />}></Route> */}
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
