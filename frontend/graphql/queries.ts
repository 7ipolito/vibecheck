import { gql } from "@apollo/client";

export const GET_WHOAMI = gql`
  query ($walletAddress: String!) {
    whoami(whoamiInput: { walletAddress: $walletAddress }) {
      _id
      email
      walletAddress
      image
      username
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id
      body
      likes {
        email
      }
      user {
        clerkUserId
        username
        image
        email
      }
      countLikes
      countComments
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
