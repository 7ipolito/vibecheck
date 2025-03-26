import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
  query ($userId: String!) {
    whoami(whoamiInput: { userId: $userId }) {
      _id
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      _id
      name
      image
    }
  }
`;

export const GET_TICKET = gql`
  query GetTickets($findTicketInput: FindTicketDTo!) {
    tickets(findTicketInput: $findTicketInput) {
      id
      type
      price
      event {
        name
        image
      }
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query GetAllComments($postId: String!) {
    getAllComments(postId: $postId) {
      text
      user {
        username
        image
      }
      createdAt
    }
  }
`;
