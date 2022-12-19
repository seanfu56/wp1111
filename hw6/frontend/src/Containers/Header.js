import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";
import { useQueryCard } from "../hooks/useQueryCard";
import { DELETEALLSCORECARDS_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";
const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addRegularMessage, clearMessage } = useScoreCard();
  const { qaddRegularMessage, qclearMessage } = useQueryCard();
  const [delPost] = useMutation(DELETEALLSCORECARDS_MUTATION);
  const handleClear = async () => {
    const message = await delPost();
    console.log(message);
    clearMessage(message.data.deleteAllScoreCards);
  };

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
