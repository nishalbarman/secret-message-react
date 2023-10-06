import React, { useContext, useState, useEffect } from "react";
import ContainerCard from "../../containercard/ContainerCard";
import styles from "./ShareCard.module.css";
import copy from "copy-to-clipboard";
import WebContext from "../../../Context/WebDetails";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function ShareCard({ callback }) {
  const {
    WebDetails: { userId: recipientID, name, token },
    modal: { setModal },
    setWebDetails,
    baseurl,
    serverbaseurl,
  } = useContext(WebContext);

  const toast = useToast();

  const handleMessageTerminal = () => {
    callback?.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = () => {
    try {
      copy(`${baseurl}/m/${recipientID}/${name}`);
      toast({
        position: "top",
        title: "Copied:",
        description: "Link copied to clipboard! Paste it and have fun!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (er) {
      toast({
        position: "top",
        title: "There is an error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        handleDelete: async (setLoading) => {
          try {
            if (setLoading !== undefined) setLoading(true);
            // handle delete is remaining
            const res = await axios.delete(`${serverbaseurl}/auth/delete`, {
              headers: {
                "Auth-Token": token,
              },
            });
            setModal({ ...prev, isModalVisible: false });

            localStorage.removeItem("z-story-obj");
            setWebDetails({});
            toast({
              position: "top",
              title: "Deletion successful:",
              description:
                "Thank You for joining, your account has been deleted now.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            if (setLoading !== undefined) setLoading(false);
          } catch (error) {
            if (setLoading !== undefined) setLoading(false);
            toast({
              position: "top",
              title: "Try again",
              description: "Oh NO! there is an issue with deletion.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
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
            `whatsapp://send?text=%2ASend%20a%20secret%20message%20to%20me%21%2A%0AIt%E2%80%99s%20fun%20%F0%9F%98%82%0A_I%20will%20never%20know%20who%20sent%20it_%20%F0%9F%99%88%0A${baseurl}/m/${recipientID}/${name}`,
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
            `https://www.addtoany.com/add_to/facebook_messenger?linkurl=${baseurl}/m/${recipientID}/${name}&amp;linkname=`,
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
