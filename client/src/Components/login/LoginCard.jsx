import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";
import styles from "../commoncardstyles/CommonCardStyles.module.css";

function LoginCard() {
  const webContext = useContext(WebContext);
  const {
    WebDetails,
    setWebDetails,
    alert: { showAlert },
    serverbaseurl,
  } = webContext;

  const navigate = useNavigate();
  if (WebDetails.token) {
    navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userid = e.target.userid;
      const userpin = e.target.userpin;
      let error = [];
      if (userid.value === "") {
        error.push("UserId is blank");
        userid.focus();
      }

      if (userpin.value === "") {
        error.push("PIN is blank");
        userid.focus();
      }

      if (error.length > 0) {
        showAlert(error.join(", "), "danger");
      } else {
        // do the fetch request here
        const res = await axios.post(`${serverbaseurl}/auth/login`, {
          userid: userid.value,
          userpin: userpin.value,
        });
        if (res.status === 200) {
          console.log(res);
          setWebDetails((prev) => {
            const object = {
              ...prev,
              token: res.data.token,
              userId: res.data.uid,
              pin: res.data.password,
              name: res.data.name,
            };
            localStorage.setItem("z-story-obj", JSON.stringify(object));
            return object;
          });
          showAlert("Login successfull", "success");
        } else {
          showAlert("Login failed", "danger");
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    document.title = "Login to account - Secret message sending 2023";
  }, []);

  return (
    <ContainerCard
      style={{
        marginTop: "30px",
        width: "100%",
      }}>
      <div className={styles.card}>
        <p className={styles.title}>Secret Messages 2023</p>
        <p className={styles.loveeye}>😍</p>
        <p>Get anonymouse feedback from your freinds, coworkers and Fans.</p>
        <div className={styles.hor_line}></div>
        <p>
          <span></span>
          <span
            style={{
              color: WebDetails.darkMode
                ? "rgb(46, 46, 46)"
                : "rgb(13,110,253)",
              textAlign: "left",
              width: "100%",
            }}
            className={styles.info_text}>
            Login to your account!
          </span>
        </p>
        <form onSubmit={handleLogin}>
          <label>Your ID</label>
          <input
            type="text"
            name="userid"
            className={WebDetails.darkMode ? styles.darkinput : "inputField"}
            placeholder="Enter user ID"
            autoComplete="off"
          />
          <label>Your PIN</label>
          <input
            type="text"
            name="userpin"
            className={WebDetails.darkMode ? styles.darkinput : "inputField"}
            placeholder="Enter PIN"
            autoComplete="off"
          />
          <button
            type="submit"
            className={WebDetails.darkMode ? styles.darkbutton : ""}>
            Login
          </button>

          <label style={{ fontSize: "15px" }}>
            Don't have an account? <Link to="/">Create Account</Link>
          </label>
        </form>
        <div className={styles.hor_line} style={{ margin: "20px 0px" }}></div>
        <h1
          style={{
            textAlign: "left",
            width: "100%",
            marginBottom: "13px",
            marginTop: "-5px",
          }}>
          Help
        </h1>
        <ul>
          <li>
            <strong>Forgot pin? :- </strong>Create a new account, pin is not
            recoverable
          </li>
          <li>
            <strong>Forgot id? :- </strong>Id is at the end of your link
          </li>
          <li>
            <strong>How long account does exist? :- </strong>Your account will
            automatically be deleted after some days.
          </li>
        </ul>
      </div>
    </ContainerCard>
  );
}

export default LoginCard;
