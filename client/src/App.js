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

import notfoundImage from "./Images/404.jpg";

function App() {
  useEffect(() => {
    console.clear();
  }, []);
  return (
    <WebStates>
      <Router basename="secret-message-react">
        <Navbars />
        {/* <Alerts /> */}
        <Modals />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/m/:reciepientId/:name"
            element={<SendMessage />}></Route>
          <Route
            path="/*"
            element={
              <div
                style={{
                  width: "100%",
                  alignItems: "center",
                  minHeight: "80vh",
                  display: "flex",
                  placeContent: "center",
                }}>
                <img style={{ width: "500px" }} src={notfoundImage} />
              </div>
            }
          />
        </Routes>
      </Router>
    </WebStates>
  );
}

export default App;
