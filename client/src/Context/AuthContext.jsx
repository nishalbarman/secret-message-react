import { Children, createContext } from "react";

export const authContext = createContext();

export const AuthContext = () => {
  // auth crediantials here

  return <authContext.Provider value={{}}>{Children}</authContext.Provider>;
};

export default AuthContext;
