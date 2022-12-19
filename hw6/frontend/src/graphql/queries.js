import { gql } from "@apollo/client";
export const SCORECARD_NAME_QUERY = gql`
  query getScoreCardsByName($name: String!) {
    getScoreCardsByName(name: $name) {
      name
      subject
      score
    }
  }
`;

export const SCORECARD_SUBJECT_QUERY = gql`
  query getScoreCardsBySubject($subject: String!) {
    getScoreCardsBySubject(subject: $subject) {
      name
      subject
      score
    }
  }
`;
