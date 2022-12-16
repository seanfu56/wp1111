import { gql } from "@apollo/client";
export const MESSAGE_SUBSCRIPTION = gql`
  subscription message($user: String!) {
    message(user: $user) {
      name
      message {
        sender
        body
      }
    }
  }
`;
