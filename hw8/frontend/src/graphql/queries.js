import { gql } from "@apollo/client";
export const CHATBOX_QUERY = gql`
  query chatbox($name: String!) {
    message {
      name
      message {
        sender
        body
      }
    }
  }
`;
