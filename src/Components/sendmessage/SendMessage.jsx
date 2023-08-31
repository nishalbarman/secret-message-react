import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SendMForm from "./SendMForm.jsx";

function SendMessage() {
  return (
    <>
      <Container>
        <Row>
          <Col className="mobilecol"></Col>
          <Col>
            <SendMForm />
            <br />
          </Col>
          <Col className="mobilecol"></Col>
        </Row>
      </Container>
    </>
  );
}

export default SendMessage;
