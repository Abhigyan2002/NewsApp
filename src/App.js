// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

import {
  
  Route,
  HashRouter as Router,
  Routes,
  
} from "react-router-dom";
import About from './Components/About';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<News key="general" pageSize={9} country='us' category='general'/>}></Route>
          <Route path='/business' element={<News key="business" pageSize={9} country='us' category='business'/>}></Route>
          <Route path='/entertainment' element={<News key="entertainment" pageSize={9} country='us' category='entertainment'/>}></Route>
          <Route path='/health' element={<News key="health" pageSize={9} country='us' category='health'/>}></Route>
          <Route path='/science' element={<News key="science" pageSize={9} country='us' category='science'/>}></Route>
          <Route path='/technology' element={<News key="technology" pageSize={9} country='us' category='technology'/>}></Route>
          <Route path='/sports' element={<News key="sports" pageSize={9} country='us' category='sports'/>}></Route>
          <Route path='/about' element={<About key="about" />}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}



