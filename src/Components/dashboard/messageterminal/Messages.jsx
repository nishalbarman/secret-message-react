import React, { useEffect, useState } from "react";
import styles from "./Messages.module.css";
import ContainerCard from "../../containercard/ContainerCard";
import MessageCard from "./messagecard/MessageCard";
import { useRef } from "react";

function Messages({ setRef }) {
  const colorList = ["rgb(240,47,76)", "rgb(0,172,238)"];
  const [messageList, setMessageList] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    setRef(() => {
      return ref;
    });
  }, []);

  return (
    <ContainerCard
      style={{ marginTop: "20px", width: "100%", padding: "14px" }}>
      <p className={styles.title}>Anonymous Message Timeline</p>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgb(0,0,0, 0.1)",
        }}></div>
      <div style={{ width: "100%" }} ref={ref}>
        {messageList.length > 0 ? (
          messageList.map((msg) => {
            return (
              <MessageCard
                style={{
                  backgroundColor: `${colorList[Math.round(Math.random())]}`,
                  color: "white",
                }}
                message={msg.title}
              />
            );
          })
        ) : (
          <MessageCard
            style={{
              backgroundColor: `black`,
              color: "white",
            }}
            message="You don't have any messages yet. Newer messages will appear here!"
          />
        )}
      </div>
    </ContainerCard>
  );
}

export default Messages;
