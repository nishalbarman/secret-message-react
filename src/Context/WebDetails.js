import { createContext } from "react";
import { useEffect, useState } from "react";

const WebContext = createContext();
const WebStates = ({ children }) => {
  const [WebDetails, setWebDetails] = useState({
    darkMode: false,
    isCredVisible: false,
  });
  const [alert, setAlert] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const [modal, setModal] = useState({
    isModalVisible: false,
    title: "",
    message: "",
    buttonText: "",
    onClick: () => {},
  });

  const showAlert = (message, type) => {
    const isVisible = true;
    let object = { message, type, isVisible };
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
      setWebDetails((prev) => {
        return { ...prev, ...webDetails };
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
        modal: {
          modal: modal,
          setModal: setModal,
        },
      }}>
      {children}
    </WebContext.Provider>
  );
};

export { WebContext };
export { WebStates };
export default WebContext;
