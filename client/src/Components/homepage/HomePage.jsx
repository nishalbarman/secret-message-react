import React, { useContext } from "react";
import { WebContext } from "../../Context/WebDetails";
import CreateAccount from "../create/CreateAccount";
import DashBoard from "../dashboard/DashBoard";

function HomePage() {
  const webContext = useContext(WebContext);
  const { WebDetails, setWebDetails } = webContext;
  return (
    <>
      {WebDetails.token ? (
        <DashBoard token={WebDetails.token} />
      ) : (
        <>
          <CreateAccount />
        </>
      )}
    </>
  );
}

export default HomePage;
