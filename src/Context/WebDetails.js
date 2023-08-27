import { createContext } from "react";
import { useEffect, useState } from "react";

const WebContext = createContext();
const WebStates = ({ children }) => {
  const [WebDetails, setWebDetails] = useState({ darkMode: false });
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const showAlert = (message, type) => {
    const isVisible = true;
    let object = { message, type, isVisible };
    console.log(object);
    setAlert(object);
    setTimeout(() => {
      console.log(alert);
      setAlert({
        isVisible: false,
        message: "",
        type: "",
      });
    }, 4000);
  };

  useEffect(() => {
    const webDetails = JSON.parse(localStorage.getItem("z-story-obj"));

    if (webDetails) {
      setWebDetails(webDetails);
    } else {
      setWebDetails({
        darkMode: true,
      });
    }
  }, []);

  return (
    <WebContext.Provider
      value={{
        WebDetails: WebDetails,
        setWebDetails: setWebDetails,
        alert: {
          alert: alert,
          showAlert: showAlert,
        },
      }}>
      {children}
    </WebContext.Provider>
  );
};

export { WebContext };
export { WebStates };
export default WebContext;
