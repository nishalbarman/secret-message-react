import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginCard from "./LoginCard.jsx";
import styles from "./LoginCard.module.css";

function Login() {
  return (
    <>
      <Container>
        <Row>
          <Col className="mobilecol"></Col>
          <Col>
            <LoginCard />
          </Col>
          <Col className="mobilecol"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
