import React, { useContext, useState, useEffect } from "react";
import ContainerCard from "../../containercard/ContainerCard";
import styles from "./ShareCard.module.css";
import copy from "copy-to-clipboard";
import WebContext from "../../../Context/WebDetails";
// import { useParams } from "react-router-dom";
import axios from "axios";

function ShareCard({ callback }) {
  const {
    WebDetails: { userId: recipientID, name, token },
    modal: { setModal },
    setWebDetails,
    alert: { showAlert },
    baseurl,
    serverbaseurl,
  } = useContext(WebContext);

  const handleMessageTerminal = () => {
    callback?.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = () => {
    try {
      copy(`${baseurl}/m/${recipientID}/${name}`);
      alert("Link copied to clipboard! Paste it and have fun!");
    } catch (er) {
      alert("Error occured");
    }
  };

  const handleDeleteAccount = () => {
    setModal((prev) => {
      const object = {
        title: "Delete Account",
        message:
          "Are you sure, you want to continue? Deleting your account will erase all the messages and details related to this account...",
        isModalVisible: true,
        buttonText: "Delete Account",
        handleDelete: async () => {
          try {
            // handle delete is remaining
            const res = await axios.delete(`${serverbaseurl}/auth/delete`, {
              headers: {
                "Auth-Token": token,
              },
            });
            setModal({ ...prev, isModalVisible: false });
            console.log("delete button clicked");
            localStorage.removeItem("z-story-obj");
            setWebDetails({});
            showAlert(
              "Thank You for joining, your account is deleted now..",
              "success"
            );
          } catch (error) {
            console.log(error);
          }
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
        {`${baseurl}/m/${recipientID}`}
      </p>
      <button
        onClick={handleCopy}
        className={`${styles.sharebuttons} ${styles.copy}`}>
        <i className="fa-solid fa-copy fa-lg" />
        &nbsp;&nbsp;Copy To Clipboard
      </button>
      <button
        onClick={() => {
          window.open(
            `whatsapp://send?text=%2ASend%20a%20secret%20message%20to%20me%21%2A%0AIt%E2%80%99s%20fun%20%F0%9F%98%82%0A_I%20will%20never%20know%20who%20sent%20it_%20%F0%9F%99%88%0A${baseurl}/m/${recipientID}`,
            "_blank",
            "noreferrer"
          );
        }}
        className={`${styles.sharebuttons} ${styles.whatsapp}`}>
        <i className="fa-brands fa-whatsapp fa-lg" />
        &nbsp;&nbsp;Share To Whatspp
      </button>
      <button
        onClick={() => {
          window.open(
            `https://www.addtoany.com/add_to/facebook_messenger?linkurl=${baseurl}/m/${recipientID}&amp;linkname=`,
            "_blank",
            "noreferrer"
          );
        }}
        className={`${styles.sharebuttons} ${styles.messenger}`}>
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
