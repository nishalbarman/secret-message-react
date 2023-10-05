import React, { useContext } from "react";
import ContainerCard from "../../containercard/ContainerCard";
// import message_icon from "../../../Images/message-icon.png";
import WebContext from "../../../Context/WebDetails";

function CredentialsCard({ styles, token, darkMode, setShowCred }) {
  // const [userId, setUserId] = useState("adfa");
  // const [pin, setPin] = useState("adfa");

  const context = useContext(WebContext);
  const { WebDetails, baseurl } = context;
  const { userId, pin } = WebDetails;

  return (
    <ContainerCard
      style={{
        border: darkMode ? "1px solid black" : "1px solid rgb(13,110,253)",
        marginTop: "30px",
        width: "100%",
      }}>
      <div className={styles.firsthalf}>
        {/* <img src={message_icon} alt="" /> */}
        <div className={styles.usercreds}>
          <span>
            User Id - <span>{userId}</span>
          </span>
          <span>
            Pin - <span>{pin}</span>
          </span>
        </div>
      </div>
      <div className={styles.url_link}>{baseurl}</div>
      <div className={styles.bottompart}>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bolder",
            marginBottom: "0px",
          }}>
          Please take a screenshot of these details
        </p>
        <p style={{ textAlign: "center" }}>
          You need these details to login from anywhere! PIN cannot be restored!
        </p>
      </div>
      <div
        className={styles.closediv}
        onClick={() => {
          setShowCred((prev) => {
            localStorage.setItem(
              "z-story-obj",
              JSON.stringify({ ...WebDetails, isCredVisible: !prev })
            );
            return !prev;
          });
        }}>
        <i
          className="fa-solid fa-xmark fa-lg"
          style={{
            color: "white",
          }}
        />
      </div>
    </ContainerCard>
  );
}

export default CredentialsCard;
