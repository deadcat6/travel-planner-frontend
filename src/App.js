import React from 'react'
import logo from './logo.svg';
import './App.css';

import CreatePlaceOption from './ui/plan/CreatePlaceOption'

import {GoogleMapDemo} from "./googleApiDemo/GoogleMapDemo";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {PlanView} from "./ui/plan/PlanView.tsx";
import PlanAccordion from './ui/plan/PlanAccordion';

function App() {
  return (
    <div>
      <PlanView/>
      <p> ------------ </p>
      <PlanAccordion />
    </div>

  );
}

export default App;
