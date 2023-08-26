import { createContext } from "react";
import { useEffect, useState } from "react";

const WebContext = createContext();
const WebStates = ({ children }) => {
  const [WebDetails, setWebDetails] = useState({ darkMode: false });
  useEffect(() => {
    const webDetails = JSON.parse(localStorage.getItem("z-story-obj"));

    if (webDetails) {
      setWebDetails(webDetails);
    } else {
      // localStorage.setItem(
      //   "z-story-obj",
      //   JSON.stringify({
      //     darkMode: false,
      //   })
      // );
      setWebDetails({
        darkMode: true,
      });
    }
  }, []);

  return (
    <WebContext.Provider
      value={{ WebDetails: WebDetails, setWebDetails: setWebDetails }}>
      {children}
    </WebContext.Provider>
  );
};

export { WebContext };
export { WebStates };
export default WebContext;
