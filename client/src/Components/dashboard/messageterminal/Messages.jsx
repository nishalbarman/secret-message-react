import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Messages.module.css";
import ContainerCard from "../../containercard/ContainerCard";
import MessageCard from "./messagecard/MessageCard";
import { useRef } from "react";

function Messages({ setRef, context }) {
  const colorList = ["rgb(240,47,76)", "rgb(0,172,238)"];
  const [messageList, setMessageList] = useState([]);

  const ref = useRef(null);

  const getMessages = async () => {
    try {
      const res = await axios.get(`${context.serverbaseurl}/m`, {
        headers: {
          "Auth-Token": context.WebDetails.token,
        },
      });
      console.log(res);
      if (res.status === 200) {
        setMessageList(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setRef(() => {
      return ref;
    });
    getMessages();
    let id = setInterval(() => {
      getMessages();
    }, 30000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <ContainerCard
      style={{ marginTop: "20px", width: "100%", padding: "14px" }}>
      <p className={styles.title}>Anonymous Message Timeline</p>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid rgb(0,0,0, 0.1)",
        }}></div>
      <div style={{ width: "100%" }} ref={ref}>
        {messageList.length > 0 ? (
          messageList.map((msg) => {
            return (
              <MessageCard
                style={{
                  backgroundColor: `${colorList[Math.round(Math.random())]}`,
                  color: "white",
                }}
                message={msg.message}
              />
            );
          })
        ) : (
          <MessageCard
            style={{
              backgroundColor: `black`,
              color: "white",
            }}
            message="You don't have any messages yet. Newer messages will appear here!"
          />
        )}
      </div>
    </ContainerCard>
  );
}

export default Messages;
