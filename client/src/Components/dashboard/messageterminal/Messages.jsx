import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./Messages.module.css";
import ContainerCard from "../../containercard/ContainerCard";
import MessageCard from "./messagecard/MessageCard";
import { useRef } from "react";
import { useToast } from "@chakra-ui/react";

import { socket } from "../../../socket";
import WebContext from "../../../Context/WebDetails";

function Messages({ setRef, context }) {
  const [loading, setLoading] = useState(true);

  const webContext = useContext(WebContext);

  const [messageList, setMessageList] = useState([]);

  const ref = useRef(null);

  const toast = useToast();

  const getMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${context.serverbaseurl}/m`, {
        headers: {
          "Auth-Token": context.WebDetails.token,
        },
      });

      if (res.status === 200) {
        setMessageList(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast({
          position: "top",
          title: "Messages cannot be retrieved",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        position: "top",
        title: "Messages cannot be retrieved",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  socket.on("new_message", (message) => {
    const new_message_array = [message, ...messageList];
    setMessageList(new_message_array);
  });

  socket.on("wrong_token", (message) => {
    toast({
      position: "top",
      title: "Unauthorised access!",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    webContext.setWebDetails(() => {
      localStorage.removeItem("z-story-obj");
      return {
        darkMode: false,
      };
    });
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
        {loading && (
          <MessageCard
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `rgb(240,47,76)`,
              color: "white",
              fontSize: "20px",
              fontWeight: "700",
              textAlign: "center",
            }}
            loading={true}
            // message="Please wait while we load"
          />
        )}
        {!loading &&
          messageList.length > 0 &&
          messageList.map((msg, i) => {
            return (
              <MessageCard
                key={i}
                style={{
                  color: "white",
                }}
                message={msg.message}
              />
            );
          })}
        {!loading && messageList.length <= 0 && (
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
