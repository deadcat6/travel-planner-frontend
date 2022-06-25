import React from 'react'
import logo from './logo.svg';
import './App.css';
import './ui/styles/SearchBar.css'
import './ui/styles/Map.css'
import './ui/styles/HomeSearch.css'
import './ui/styles/Home.css'

import CreatePlaceOption from './ui/plan/CreatePlaceOption'

import {GoogleMapDemo} from "./googleApiDemo/GoogleMapDemo";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {PlanView} from "./ui/plan/PlanView.tsx";
import PlanAccordion from './ui/plan/PlanAccordion.tsx';
import {Home} from './ui/home/Home.tsx';

function App() {
  return (
    <div>
      {/* <Home /> */}
      <PlanView/>
      <p> ------------ </p>
      <PlanAccordion />
    </div>

  );
}
export default App;
