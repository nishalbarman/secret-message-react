import React, { useContext } from "react";
import styles from "./CreateCard.module.css";
import { Link } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";

function CreateCard() {
  const webContext = useContext(WebContext);
  const { WebDetails } = webContext;

  return (
    <ContainerCard
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
      <div className={styles.card}>
        <h2>Secret Messages 2023</h2>
        <p>😍</p>
        <p>Get anonymouse feedback from your freinds, coworkers and Fans.</p>
        <div className={styles.hor_line}></div>
        <p>
          <span
            style={{
              color: WebDetails.darkMode
                ? "rgb(46, 46, 46)"
                : "rgb(13,110,253)",
              textAlign: "left",
              width: "100%",
              lineHeight: "40px",
            }}>
            You can never know who messaged you! 🔮
          </span>
          <br />
          Please allow <strong>NOTIFICATION</strong> to receive notifications
          about new message.
        </p>
        <form>
          <label>Enter your name - </label>
          <input
            type="text"
            name="username"
            className={WebDetails.darkMode ? styles.darkinput : "inputField"}
            placeholder="Nickname"
            required={true}
          />
          <button className={WebDetails.darkMode ? styles.darkbutton : ""}>
            Create your link 😍
          </button>
          <input
            style={{ outline: "none" }}
            className="agreeCheck"
            type="checkbox"
            name="agree"
            required={true}
          />
          <p style={{ fontSize: "15px" }}>
            You agree to <Link to="privacy-policy">Privacy Policy</Link> and{" "}
            <Link to="terms_conditions">Terms and condition</Link> of our
            website.
          </p>
        </form>
      </div>
    </ContainerCard>
  );
}

export default CreateCard;
