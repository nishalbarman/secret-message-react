import React from "react";
import { Spinner } from "@chakra-ui/react";
import styles from "./MessageCard.module.css";

function MessageCard({ message, style, loading }) {
  return (
    <div className={styles.messagecard} style={style}>
      {loading ? <Spinner size="lg" mr={"20px"} /> : <p>{message}</p>}
    </div>
  );
}

export default MessageCard;
