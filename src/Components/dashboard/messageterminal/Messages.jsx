import React from "react";
import styles from "./Messages.module.css";
import ContainerCard from "../../containercard/ContainerCard";
import MessageCard from "./messagecard/MessageCard";

function Messages() {
  return (
    <ContainerCard style={{ marginTop: "20px", width: "100%" }}>
      <p className={styles.title}>Anonymous Message Timeline</p>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgb(0,0,0, 0.1)",
        }}></div>
      <div>
        <MessageCard
          style={{
            backgroundColor: `rgb(${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255
            )})`,
          }}
          message="You don't have any messages yet. Newer messages will appear here!"
        />
        <MessageCard
          style={{
            backgroundColor: `rgb(${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255
            )})`,
          }}
          message="You don't have any messages yet. Newer messages will appear here!"
        />
        <MessageCard
          style={{
            backgroundColor: `rgb(${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255
            )})`,
          }}
          message="You don't have any messages yet. Newer messages will appear here!"
        />
        <MessageCard
          style={{
            backgroundColor: `rgb(${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255
            )})`,
          }}
          message="You don't have any messages yet. Newer messages will appear here!"
        />
      </div>
    </ContainerCard>
  );
}

export default Messages;
