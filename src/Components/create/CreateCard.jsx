import React, { useContext } from "react";
import styles from "./CreateCard.module.css";
import { Link } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";

function CreateCard() {
  const webContext = useContext(WebContext);
  const { WebDetails, setWebDetails } = webContext;
  const { showAlert } = webContext.alert;

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.username.value;
      const agree = e.target.agree.checked;
      let error = [];
      if (name === "") {
        error.push("Name cannot be blank");
      }

      if (agree === false) {
        error.push("You need to agree terms and conditions to continue");
      }

      if (error.length > 0) {
        showAlert(error.join(", "), "danger");
      } else {
        // do the fetch request here
        const object = { ...WebDetails, token: Math.random() * 342 };
        localStorage.setItem("z-story-obj", JSON.stringify(object));
        setWebDetails(object);
      }
    } catch (err) {}
  };

  return (
    <ContainerCard
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
      <div className={styles.card}>
        <p className={styles.title}>Secret Messages 2023</p>
        <p className={styles.loveeye}>😍</p>
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
            }}
            className={styles.info_text}>
            You can never know who messaged you! 🔮
          </span>
          <br />
          Please allow <strong>NOTIFICATION</strong> to receive notifications
          about new message.
        </p>
        <form onSubmit={handleCreateAccount}>
          <label>Enter your name - </label>
          <input
            type="text"
            name="username"
            className={WebDetails.darkMode ? styles.darkinput : "inputField"}
            placeholder="Nickname"
            required={true}
            autoComplete="off"
          />
          <button
            type="submit"
            className={WebDetails.darkMode ? styles.darkbutton : ""}>
            Create your link 😍
          </button>
          <input
            style={{ outline: "none" }}
            className="agreeCheck"
            type="checkbox"
            name="agree"
          />
          <p style={{ fontSize: "15px" }}>
            By continuing, You agree to{" "}
            <Link to="privacy-policy">Privacy Policy</Link> and{" "}
            <Link to="terms_conditions">Terms and condition</Link> of our
            website.
          </p>
        </form>
      </div>
    </ContainerCard>
  );
}

export default CreateCard;
