import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { WebContext } from "../../Context/WebDetails";
import ContainerCard from "../containercard/ContainerCard";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import styles from "../commoncardstyles/CommonCardStyles.module.css";

function CreateCard() {
  const [loading, setLoading] = useState(false);

  const { WebDetails, setWebDetails, serverbaseurl } = useContext(WebContext);

  const toast = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isReffered, setIsReffered] = useState(searchParams.get("r"));

  const handleCreateAccount = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const name = e.target.username.value;
      const agree = e.target.agree.checked;
      let error = [];
      if (name === "") {
        error.push("Name cannot be blank");
      }

      if (agree === false) {
        error.push("You need to agree terms and conditions to continue");
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
      } else {
        // do the fetch request here
        const res = await axios.post(`${serverbaseurl}/auth/signup`, {
          name,
        });
        if (res.status === 200 && res.data.status === true) {
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
          toast({
            position: "top",
            title: "Account created, Enjoy your day!:",
            description: error.join(", "),
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Creation failed!",
            description: "Please try again, Looks like there is a problem!",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
        }
      }
    } catch (err) {
      toast({
        position: "top",
        title: "Creation failed!",
        description: "Please try again, There might be a server issue!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create your link - Secret message sending 2023";
  }, []);

  return (
    <ContainerCard
      style={{
        width: "100%",
        marginTop: "30px",
      }}>
      <div className={styles.card}>
        {isReffered === null ? (
          <>
            <p className={styles.title}>Secret Messages 2023</p>
            <p className={styles.loveeye}>😍</p>
            <p>
              Get anonymouse feedback from your freinds, coworkers and Fans.
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#28a745",
                color: "white",
                width: "100%",
                borderRadius: "5px",
              }}>
              ✔ Message sent successfully 👍
            </p>
            <p className={styles.loveeye}>😍</p>
            <p>
              Now, create a link for yourself. See what your friends message
              you!
            </p>
          </>
        )}

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
            You can never know who messaged you! 🔮
          </span>
          <br />
          <span></span>
          Please allow <strong>NOTIFICATION</strong> to receive notifications
          about new message.
        </p>
        <form onSubmit={handleCreateAccount}>
          <label>Enter your name - </label>
          <input
            type="text"
            name="username"
            className={WebDetails.darkMode ? styles.darkinput : "inputField"}
            placeholder="Nickname"
            required={true}
            autoComplete="off"
          />

          <Button
            className={WebDetails.darkMode ? styles.darkbutton : ""}
            isLoading={loading}
            type="submit"
            loadingText="Please Wait"
            colorScheme="blue"
            variant="outline">
            Create your link 😍
          </Button>
          <label style={{ fontSize: "15px", marginBottom: "14px" }}>
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
            <Link to="privacy_policy">Privacy Policy</Link> and{" "}
            <Link to="terms_conditions">Terms and condition</Link> of our
            website.
          </label>
        </form>
      </div>
    </ContainerCard>
  );
}

export default CreateCard;
