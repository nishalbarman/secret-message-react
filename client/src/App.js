import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbars from "./Components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { WebStates } from "./Context/WebDetails";
import HomePage from "./Components/homepage/HomePage";
import Alerts from "./Components/alert/Alerts";
import Modals from "./Components/modal/Modals";
import Login from "./Components/login/Login";
import SendMessage from "./Components/sendmessage/SendMessage";

function App() {
  useEffect(() => {
    console.clear();
  }, []);
  return (
    <WebStates>
      <Router>
        <Navbars />
        {/* <Alerts /> */}
        <Modals />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/m/:reciepientId/:name"
            element={<SendMessage />}></Route>
        </Routes>
      </Router>
    </WebStates>
  );
}

export default App;
