import React from "react";
import ContainerCard from "../../containercard/ContainerCard";
import styles from "./ShareCard.module.css";

function ShareCard() {
  const messagingLink = "http://localhost:3000/m/qqdafq45";
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(messagingLink);
      alert("Link copied to clipboard! Paste it and have fun!");
    } catch (er) {
      window.clipboardData.setData(messagingLink);
      alert("Link copied to clipboard! Paste it and have fun!");
    }
  };
  return (
    <ContainerCard
      style={{
        marginTop: "20px",
        width: "100%",
        fontSize: "18px",
      }}>
      <h1 className={styles.animation}>Share this link 💙</h1>
      <p>Share this link with your friends and collect Anonymous Messages</p>
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
        &nbsp;&nbsp;Copy To Clipboard
      </button>
      <button className={`${styles.sharebuttons} ${styles.messenger}`}>
        <i className="fa-brands fa-facebook-messenger fa-lg" />
        &nbsp;&nbsp;Copy To Clipboard
      </button>
      <button
        style={{ width: "80%" }}
        className={`${styles.sharebuttons} ${styles.messages}`}>
        <i className="fa-solid fa-comment" />
        &nbsp;&nbsp;Check Messages
      </button>
      <button
        style={{ width: "80%" }}
        className={`${styles.sharebuttons} ${styles.delete}`}>
        <i className="fa-solid fa-gear" />
        &nbsp;&nbsp;Delete Account
      </button>
    </ContainerCard>
  );
}

export default ShareCard;
