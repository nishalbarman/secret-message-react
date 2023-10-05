import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";
import { socket } from "../../socket";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import styles from "../commoncardstyles/CommonCardStyles.module.css";

function SendMForm() {
  const [loading, setLoading] = useState(false);

  const webContext = useContext(WebContext);
  const { WebDetails } = webContext;

  const navigate = useNavigate();

  if (WebDetails.token) {
    navigate("/");
  }

  const toast = useToast();

  const [reciepientId, setReciepientId] = useState(useParams().reciepientId);
  const [recieverName, setRecieverName] = useState(useParams().name);

  const handleSendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const message = e.target.messagefreciver;
      const agree = e.target.agree;
      let error = [];
      if (message.value === "") {
        error.push("Message should not be blank");
        message.focus();
      }

      if (agree.checked === false) {
        error.push(
          "You need to agree privacy polcy and terms & conditons to continue"
        );
        agree.focus();
      }

      if (error.length > 0) {
        toast({
          position: "top",
          title: "Required:",
          description: error.join(", "),
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      } else if (reciepientId === null || reciepientId === undefined) {
        toast({
          position: "top",
          title: "Required fileds are missing!",
          status: "warn",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      } else {
        socket.emit(
          "new-anonymouse-message",
          {
            uid: reciepientId,
            message: message.value,
          },
          (response) => {
            console.log(response);
          }
        );
      }
    } catch (err) {
      toast({
        position: "top",
        title: "Failed!",
        description: "Please try again later!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  socket.on("response-back", (data) => {
    toast({
      position: "top",
      title: data.message,
      status: data.status ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
    setLoading(false);
    if (data.status === true) {
      navigate(`/?r=${reciepientId}`);
    }
  });

  useEffect(() => {
    if (!WebDetails.token) {
      socket.connect();
    }

    return () => {
      socket.off("response-back");
      socket.disconnect();
    };
  }, []);

  return (
    <ContainerCard style={{ marginTop: "25px", width: "100%" }}>
      <div className={styles.card}>
        <p className={styles.title}>
          Send Secret Message to{" "}
          {recieverName[0].toUpperCase() + "" + recieverName.substring(1)}
        </p>
        <p>
          <span
            style={{
              color: WebDetails.darkMode
                ? "rgb(46, 46, 46)"
                : "rgb(13,110,253)",
              textAlign: "left",
              width: "100%",
            }}
            className={styles.info_text}>
            They will never know who messaged them 😉
          </span>
        </p>
        <form onSubmit={handleSendMessage}>
          <textarea
            type="text"
            name="messagefreciver"
            className={
              WebDetails.darkMode ? styles.darkinput : styles.ligttextarea
            }
            placeholder="Write your secret message here ..."
            autoComplete="off"></textarea>

          <label style={{ fontSize: "15px", marginBottom: "10px" }}>
            <input
              style={{
                outline: "none",
                display: "inline-block",
                width: "15px",
                height: "15px",
                marginRight: "10px",
              }}
              className="agreeCheck"
              type="checkbox"
              name="agree"
            />
            By continuing, You agree to{" "}
            <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
            <Link to="/terms_conditions">Terms and condition</Link> of our
            website.
          </label>

          <Button
            className={WebDetails.darkMode ? styles.darkbutton : ""}
            isLoading={loading}
            type="submit"
            loadingText="Please Wait"
            colorScheme="blue"
            variant="outline">
            Send the message 😎
          </Button>
        </form>
        <div className={styles.hor_line} style={{ margin: "20px 0px" }}></div>
        <h1
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: "13px",
            marginTop: "-5px",
          }}>
          How to use it?
        </h1>
        <p>
          Write your message in the message box above. Your friend will never
          know who messaged them!
        </p>
        <p>
          It is a fun way to confess, ask a question or open up to your friend
          without the fear of judgment.
        </p>
        <p>You can create your link and share it with your friends too:</p>
        <br />
        <p>
          <strong>Note:</strong> This website is just for fun. Please do not use
          it to spread hate. People use it to get pieces of advice and feedback
          anonymously. Do not ruin the fun for everyone!
        </p>
        <br />
        <p style={{ textAlign: "left", width: "100%" }}>
          <strong>Where are my messages?</strong>
          <br />
          If this is your link, you can log in here.
        </p>
      </div>
    </ContainerCard>
  );
}

export default SendMForm;
