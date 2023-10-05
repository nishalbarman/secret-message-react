import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Messages.module.css";
import ContainerCard from "../../containercard/ContainerCard";
import MessageCard from "./messagecard/MessageCard";
import { useRef } from "react";

import { socket } from "../../../socket";

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

  socket.on("new_message", (message) => {
    const new_message_array = [message, ...messageList];
    setMessageList(new_message_array);
  });

  socket.on("wrong_token", (message) => {
    console.log("Recieved wrong message => ", message);
  });

  useEffect(() => {
    setRef(() => {
      return ref;
    });
    getMessages();

    socket.connect();
    socket.emit("joined", context.WebDetails.token);

    return () => {
      socket.off("wrong_token");
      socket.off("new_message");
      socket.disconnect();
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
          messageList.map((msg, i) => {
            return (
              <MessageCard
                key={i}
                style={{
                  // backgroundColor: `${colorList[i % 2]}`,
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
