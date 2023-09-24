import React from "react";
import styles from "./ContainerCard.module.css";

function ContainerCard({ children, style }) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

export default ContainerCard;
