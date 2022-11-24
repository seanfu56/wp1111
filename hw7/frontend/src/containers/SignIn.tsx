import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import LogIn from "../components/LogIn";
import React from "react";
const SignIn = () => {
  const { me, setMe, setSignedIn, displayStatus } = useChat();
  const handleLogin = (name: string) => {
    if (!name)
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    else setSignedIn(true);
  };
  return (
    <>
      <Title name={me} />
      <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
};

export default SignIn;
