import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { WebContext } from "../../Context/WebDetails";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Navbars() {
  const webContext = useContext(WebContext);
  const { WebDetails, setWebDetails } = webContext;

  const navigate = useNavigate();
  return (
    <Navbar
      expand="xl"
      sticky="top"
      bg={WebDetails.darkMode ? "dark" : "primary"}
      data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Share Fun</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {WebDetails.token ? <Nav.Link to="/">Dashboard</Nav.Link> : ""}
            <NavDropdown title="Important Links" id="basic-nav-dropdown">
              <NavDropdown.Item href="/about">About</NavDropdown.Item>
              <NavDropdown.Item href="/terms-conditons">
                Terms & Condition
              </NavDropdown.Item>
              <NavDropdown.Item href="/privacy-policy">
                Privacy Policy
              </NavDropdown.Item>
              <NavDropdown.Item href="/disclaimer">Disclaimer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/support-me">
                Support Me?
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {!WebDetails.token ? (
            <>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant={
                  !WebDetails.darkMode ? "outline-light" : "outline-light"
                }>
                Create Account
              </Button>
              <div style={{ marginRight: "5px" }}></div>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                variant={
                  !WebDetails.darkMode ? "outline-light" : "outline-light"
                }>
                Login
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={
                  !WebDetails.darkMode ? "outline-light" : "outline-light"
                }
                onClick={() => {
                  setWebDetails((object) => {
                    // let obj = { ...object, token: false };
                    localStorage.removeItem("z-story-obj");
                    return {
                      darkMode: false,
                    };
                  });
                }}>
                Logout
              </Button>
            </>
          )}

          {/* <i
            onClick={() => {
              const object = {
                ...WebDetails,
                darkMode: !WebDetails.darkMode,
              };

              localStorage.setItem("z-story-obj", JSON.stringify(object));
              setWebDetails(object);
            }}
            className={`fa-regular fa-moon fa-lg`}
            style={{
              color: WebDetails.darkMode ? "#000000" : "#ffffff",
              padding: "15px 10px",
              marginLeft: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: WebDetails.darkMode ? "#ffffff" : "#000000",
              marginTop: "5px",
            }}
          /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
