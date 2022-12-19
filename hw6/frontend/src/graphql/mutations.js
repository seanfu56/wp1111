import { gql } from "@apollo/client";
export const NEWSCORECARD_MUTATION = gql`
  mutation newScoreCard($name: String!, $subject: String!, $score: Int!) {
    newScoreCard(name: $name, subject: $subject, score: $score)
  }
`;

export const DELETEALLSCORECARDS_MUTATION = gql`
  mutation deleteAllScoreCards {
    deleteAllScoreCards
  }
`;
