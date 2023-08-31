import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";
import styles from "../commoncardstyles/CommonCardStyles.module.css";

function SendMForm() {
  const webContext = useContext(WebContext);
  const {
    WebDetails,
    setWebDetails,
    alert: { showAlert },
    baseurl,
    serverbaseurl,
  } = webContext;

  const navigate = useNavigate();

  const [reciepientId, setReciepientId] = useState(useParams().reciepientId);
  const [recieverName, setRecieverName] = useState("Admin");

  console.log("Reciepient ID => ", reciepientId);

  const handleSendMessage = async (e) => {
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
        showAlert(error.join(", "), "danger");
      } else if (reciepientId === null || reciepientId === undefined) {
        showAlert("Some technical error occured", "danger");
      } else {
        // const res = await fetch(`${serverbaseurl}/sendmessage/${reciepientId}`);
        // const data = await res.json();
        const data = { status: 200, success: true };
        if (data.status === 200 && data.success === true) {
          showAlert("Message sent successfully", "success");
          navigate(`/?r=${reciepientId}`);
        } else {
          showAlert("Some technical error occured", "danger");
        }
      }
    } catch (err) {
      showAlert("Some technical error occured", "danger");
    }
  };

  return (
    <ContainerCard style={{ marginTop: "25px", width: "100%" }}>
      <div className={styles.card}>
        <p className={styles.title}>Send Secret Message to {recieverName}</p>
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

          <button
            type="submit"
            className={WebDetails.darkMode ? styles.darkbutton : ""}>
            Send the message 😎
          </button>
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
