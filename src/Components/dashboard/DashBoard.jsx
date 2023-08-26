import React, { useContext, useEffect, useState } from "react";
import ContainerCard from "../containercard/ContainerCard";
import WebContext from "../../Context/WebDetails";
import styles from "./DashBoard.module.css";
import message_icon from "../../Images/message-icon.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DashBoard() {
  const context = useContext(WebContext);
  const { token, darkMode } = context.WebDetails;

  const [userId, setUserId] = useState("adfa");
  const [pin, setPin] = useState("adfa");

  const [showCreds, setShowCreds] = useState(true);

  useEffect(() => {
    // todo
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col className={styles.mobileview}></Col>
          <Col>
            <ContainerCard
              style={{
                border: darkMode
                  ? "1px solid black"
                  : "1px solid rgb(13,110,253)",
                marginTop: "30px",
                width: "100%",
              }}>
              <div className={styles.firsthalf}>
                <img src={message_icon} alt="" />
                <div className={styles.usercreds}>
                  <span>
                    User Id - <span>{userId}</span>
                  </span>
                  <span>
                    Pin - <span>{pin}</span>
                  </span>
                </div>
              </div>
              <div className={styles.url_link}>https://localhost:3000/</div>
              <div className={styles.bottompart}>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bolder",
                    marginBottom: "0px",
                  }}>
                  Please take a screenshot of these details
                </p>
                <p style={{ textAlign: "center" }}>
                  You need these details to login from anywhere! PIN cannot be
                  restored!
                </p>
              </div>
              <div className={styles.closediv}>
                <i
                  className="fa-solid fa-xmark fa-lg"
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </ContainerCard>
          </Col>
          <Col className={styles.mobileview}></Col>
        </Row>
      </Container>
    </>
  );
}

export default DashBoard;
