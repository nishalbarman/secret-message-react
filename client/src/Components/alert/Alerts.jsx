import React, { useContext } from "react";
import WebContext from "../../Context/WebDetails";
import Alert from "react-bootstrap/Alert";
import { Col, Row } from "react-bootstrap";
import styles from "./Alert.module.css";

function Alerts() {
  const {
    alert: {
      alert: { isVisible, type, message },
    },
  } = useContext(WebContext);

  return (
    <>
      {isVisible ? (
        <div className={styles.alert}>
          <Row>
            <Col className={styles.alertcol}></Col>
            <Col>
              <Alert variant={type}>{message}</Alert>
            </Col>
            <Col className={styles.alertcol}></Col>
          </Row>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Alerts;
