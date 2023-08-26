import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreateCard from "./CreateCard";

function CreateAccount() {
  return (
    <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <CreateCard />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateAccount;
