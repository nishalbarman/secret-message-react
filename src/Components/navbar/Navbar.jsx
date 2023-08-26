import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { WebContext } from "../../Context/WebDetails";
import Button from "react-bootstrap/Button";

function Navbars() {
  const webContext = useContext(WebContext);
  const { WebDetails, setWebDetails } = webContext;
  return (
    <Navbar
      expand="xl"
      sticky="top"
      bg={WebDetails.darkMode ? "dark" : "primary"}
      data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Share Fun</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {WebDetails.token ? <Nav.Link to="/">Dashboard</Nav.Link> : ""}
            <NavDropdown title="Important Links" id="basic-nav-dropdown">
              <NavDropdown.Item to="/about">About</NavDropdown.Item>
              <NavDropdown.Item to="/terms-conditons">
                Terms & Condition
              </NavDropdown.Item>
              <NavDropdown.Item to="/privacy-policy">
                Privacy Policy
              </NavDropdown.Item>
              <NavDropdown.Item to="/disclaimer">Disclaimer</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="/support-me">Support Me?</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Button
            size="sm"
            variant={!WebDetails.darkMode ? "outline-light" : "outline-light"}>
            Create Account
          </Button>
          <div style={{ marginRight: "5px" }}></div>
          <Button
            size="sm"
            variant={!WebDetails.darkMode ? "outline-light" : "outline-light"}>
            Login
          </Button>

          <i
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
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
