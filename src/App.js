// import logo from './logo.svg';
import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

import { Route, HashRouter as Router, Routes } from "react-router-dom";
import About from "./Components/About";
import LoadingBar from "react-top-loading-bar";
import Spinner from "./Components/Spinner";


export default class App extends Component {
  state = {
    progress: 0,
    spinner: true,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  spinnerState = (x) => {
    this.setState({ spinner: x });
  };

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          {this.state.spinner && <Spinner />}
          
          <Routes>
            <Route
              path="/"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={9}
                  country="us"
                  category="general"
                />
              }
            ></Route>
            <Route
              path="/business"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={9}
                  country="us"
                  category="business"
                />
              }
            ></Route>
            <Route
              path="/entertainment"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={9}
                  country="us"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              path="/health"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={9}
                  country="us"
                  category="health"
                />
              }
            ></Route>
            <Route
              path="/science"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={9}
                  country="us"
                  category="science"
                />
              }
            ></Route>
            <Route
              path="/technology"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={9}
                  country="us"
                  category="technology"
                />
              }
            ></Route>
            <Route
              path="/sports"
              element={
                <News
                  spinnerState={this.spinnerState}
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={9}
                  country="us"
                  category="sports"
                />
              }
            ></Route>
            <Route path="/about" element={<About key="about" />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
