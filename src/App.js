import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import './ui/styles/SearchBar.css'
import './ui/styles/Map.css'
import './ui/styles/HomeSearch.css'
import './ui/styles/Home.css'
import './ui/styles/Footer.css'
import './ui/styles/Header.css'

import CreatePlaceOption from './ui/plan/CreatePlaceOption'
import {PlanView} from "./ui/plan/PlanView.tsx";
import PlanAccordion from './ui/plan/PlanAccordion.tsx';
import {Home} from './ui/home/Home.tsx';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function App() {
  const [center, setCenter] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home setCenter={setCenter}/>}/>
          <Route path="/homePage/*" element={<Home setCenter={setCenter}/>}/>
          <Route path="/planView/*" element={<PlanView center={center}/>}/>
        </Routes>
      </Router>
      {/* <Home /> */}
      {/* <PlanView/>
      <p> ------------ </p>
      <PlanAccordion /> */}
    </div>

  );
}
export default App;
