import React, { useContext, useEffect, useState } from "react";
import CredentialsCard from "./credentialscad/CredentialsCard";
import WebContext from "../../Context/WebDetails";
import styles from "./DashBoard.module.css";
import Container from "react-bootstrap/Container";
import CredCollapsed from "./credcollapsed/CredCollapsed";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShareCard from "./sharedlinkscard/ShareCard";
import Messages from "./messageterminal/Messages";

function DashBoard() {
  const context = useContext(WebContext);
  const { token, darkMode, isCredVisible } = context.WebDetails;
  const [showCreds, setShowCreds] = useState(isCredVisible);
  const [ref, setRef] = useState(() => {});

  useEffect(() => {
    // todo
    document.title = "Inbox - Secret message sending 2023";
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col className={styles.mobileview}></Col>
          <Col>
            {!showCreds ? (
              <CredentialsCard
                styles={styles}
                token={token}
                darkMode={darkMode}
                setShowCred={setShowCreds}
              />
            ) : (
              <CredCollapsed setShowCred={setShowCreds} />
            )}
            <ShareCard callback={ref} />
            <Messages setRef={setRef} context={context} />
            <br />
          </Col>
          <Col className={styles.mobileview}></Col>
        </Row>
      </Container>
    </>
  );
}

export default DashBoard;
