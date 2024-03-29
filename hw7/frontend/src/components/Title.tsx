import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;

type TitleProps = {
  name: string;
};

const Title = ({ name }: TitleProps) => {
  return (
    <Wrapper>
      <h1>
        {name ? `${name}'s ` : "My "}
        Chat Room
      </h1>
    </Wrapper>
  );
};

export default Title;
