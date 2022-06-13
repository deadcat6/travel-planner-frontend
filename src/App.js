import React from 'react'
import logo from './logo.svg';
import './App.css';

import CreatePlaceOption from './components/CreatePlaceOption'

import {GoogleMapDemo} from "./googleApiDemo/GoogleMapDemo";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

function App() {
  return (
    <CreatePlaceOption/>
  );
}

export default App;
