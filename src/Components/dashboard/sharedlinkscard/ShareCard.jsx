import React, { useContext } from "react";
import ContainerCard from "../../containercard/ContainerCard";
import styles from "./ShareCard.module.css";
import copy from "copy-to-clipboard";
import WebContext from "../../../Context/WebDetails";
import { useNavigate } from "react-router-dom";

function ShareCard({ callback }) {
  const {
    modal: { setModal },
    setWebDetails,
    alert: { showAlert },
  } = useContext(WebContext);

  const handleMessageTerminal = () => {
    callback?.current.scrollIntoView({ behavior: "smooth" });
  };

  const messagingLink = "http://localhost:3000/m/qqdafq45";
  const handleCopy = () => {
    try {
      copy(messagingLink);
      alert("Link copied to clipboard! Paste it and have fun!");
    } catch (er) {
      // window.clipboardData.setData(messagingLink);
      // navigator.clipboard.writeText(messagingLink);
      // alert("Link copied to clipboard! Paste it and have fun!");
      alert("Error occured");
    }
  };

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    setModal((prev) => {
      const object = {
        title: "Delete Account",
        message:
          "Are you sure, you want to continue? Deleting your account will erase all the messages and details related to this account...",
        isModalVisible: true,
        buttonText: "Delete Account",
        handleDelete: () => {
          // handle delete is remaining
          setModal({ ...prev, isModalVisible: false });
          console.log("delete button clicked");
          localStorage.removeItem("z-story-obj");
          setWebDetails({});
          showAlert(
            "Thank You for joining, your account is deleted now..",
            "success"
          );
        },
      };
      return object;
    });
  };
  return (
    <ContainerCard
      style={{
        marginTop: "20px",
        width: "100%",
        fontSize: "18px",
      }}>
      <h1 className={styles.animation}>Share this link 💙</h1>
      <p style={{ marginTop: "3px" }}>
        Share this link with your friends and collect Anonymous Messages
      </p>
      <div className={styles.hor_line}></div>
      <p onClick={handleCopy} className={styles.copy_url}>
        {messagingLink}
      </p>
      <button
        onClick={handleCopy}
        className={`${styles.sharebuttons} ${styles.copy}`}>
        <i className="fa-solid fa-copy fa-lg" />
        &nbsp;&nbsp;Copy To Clipboard
      </button>
      <button className={`${styles.sharebuttons} ${styles.whatsapp}`}>
        <i className="fa-brands fa-whatsapp fa-lg" />
        &nbsp;&nbsp;Share To Whatspp
      </button>
      <button className={`${styles.sharebuttons} ${styles.messenger}`}>
        <i className="fa-brands fa-facebook-messenger fa-lg" />
        &nbsp;&nbsp;Share To Messenger
      </button>
      <button
        onClick={handleMessageTerminal}
        style={{ width: "80%" }}
        className={`${styles.sharebuttons} ${styles.messages}`}>
        <i className="fa-solid fa-comment" />
        &nbsp;&nbsp;Check Messages
      </button>
      <button
        onClick={handleDeleteAccount}
        style={{ width: "80%" }}
        className={`${styles.sharebuttons} ${styles.delete}`}>
        <i className="fa-solid fa-gear" />
        &nbsp;&nbsp;Delete Account
      </button>
    </ContainerCard>
  );
}

export default ShareCard;
