import "./App.css";
import React from "react";
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
  return (
    <WebStates>
      <Router basename="/secret-message-react">
        <Navbars />
        <Alerts />
        <Modals />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/m/:reciepientId" element={<SendMessage />}></Route>
        </Routes>
      </Router>
    </WebStates>
  );
}

export default App;
