import React from 'react'
import logo from './logo.svg';
import './App.css';

import Home from './components/Home'
import CreatePlaceOption from './components/CreatePlaceOption'

import {GoogleMapDemo} from "./googleApiDemo/GoogleMapDemo";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">
        <header className='App-header'>
          <h1 className="App-title">Travel Planner</h1>
          <Link className="navlink" to="/placeoption">Place Option</Link>
        </header>
        <br/>
        <div className='App-body'>
          <Route exact path="/" component={GoogleMapDemo}/>
          <Route exact path="/placeoption" component={CreatePlaceOption}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
