import styled from "styled-components";

type styledMessageProps = {
  isMe: boolean;
};

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ isMe }: styledMessageProps) => (isMe ? "row-reverse" : "row")};
  margin: 8px 10px;
  & p:first-child {
    margin: 0 5px;
  }
  & p:last-child {
    padding: 2px 5px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
  }
`;

type messageProps = {
  isMe: boolean;
  message: string;
};

const MessageTem = ({ isMe, message }: messageProps) => {
  return (
    <StyledMessage isMe={isMe}>
      <p>{message}</p>
    </StyledMessage>
  );
};

export default MessageTem;
