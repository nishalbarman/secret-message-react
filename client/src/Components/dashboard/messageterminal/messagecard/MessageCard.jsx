import React from "react";
import styles from "./MessageCard.module.css";

function MessageCard({ message, style }) {
  return (
    <div className={styles.messagecard} style={style}>
      <p>{message}</p>
    </div>
  );
}

export default MessageCard;
