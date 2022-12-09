import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
type LoginProps = {
  me: string;
  setName: (name: string) => void;
  onLogin: (name: string) => void;
};
const LogIn = ({ me, setName, onLogin }: LoginProps) => {
  return (
    <Input.Search
      size="large"
      style={{ width: 300, margin: 50 }}
      prefix={<UserOutlined />}
      placeholder={"Enter your name"}
      /*value={me}*/
      onChange={(e) => {
        setName(e.target.value);
      }}
      value={me}
      enterButton="Sign In"
      onSearch={(name) => onLogin(name)}
    />
  );
};

export default LogIn;
