import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbars from "./Components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { WebStates } from "./Context/WebDetails";
import HomePage from "./Components/homepage/HomePage";

function App() {
  return (
    <WebStates>
      <Router>
        <Navbars />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </WebStates>
  );
}

export default App;
