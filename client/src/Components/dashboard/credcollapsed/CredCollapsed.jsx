import React, { useContext } from "react";
import styles from "../DashBoard.module.css";
import WebContext from "../../../Context/WebDetails";

function CredCollapsed({ setShowCred }) {
  const { WebDetails } = useContext(WebContext);
  return (
    <div
      className={styles.credcollapsed}
      onClick={() => {
        setShowCred((prev) => {
          localStorage.setItem(
            "z-story-obj",
            JSON.stringify({ ...WebDetails, isCredVisible: !prev })
          );
          return !prev;
        });
      }}>
      Show Login Details{" "}
      <i className="fa-solid fa-eye" style={{ color: "#000000" }} />
    </div>
  );
}

export default CredCollapsed;
