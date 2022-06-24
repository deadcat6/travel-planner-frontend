import React from 'react'
import logo from './logo.svg';
import './App.css';
import './ui/plan/styles/SearchBar.css'
import './ui/plan/styles/Map.css'

import CreatePlaceOption from './ui/plan/CreatePlaceOption'

import {GoogleMapDemo} from "./googleApiDemo/GoogleMapDemo";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import {PlanView} from "./ui/plan/PlanView.tsx";
import PlanAccordion from './ui/plan/PlanAccordion';
import RecipeReviewCard from './ui/plan/DayCard';
import DayCard from './ui/plan/DayCard';

function App() {
  return (
    <div>
      <PlanView/>
      <p> ------------ </p>
    </div>

  );
}
export default App;
