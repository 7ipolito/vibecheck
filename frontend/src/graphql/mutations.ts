import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      error {
        message
        path
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateAccount(
    $walletAddress: String!
    $image: String!
    $username: String!
  ) {
    register(
      registerInput: {
        walletAddress: $walletAddress
        image: $image
        username: $username
      }
    ) {
      error {
        message
        path
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const DELETE_USER = gql`
  mutation ($id: String!) {
    deleteUser(deleteInput: { id: $id }) {
      error {
        message
        path
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($clerkUserId: String!, $body: String!) {
    createPost(createPostInput: { clerkUserId: $clerkUserId, body: $body }) {
      body
      id
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($likePostInput: LikePostInput!) {
    likePost(likePostInput: $likePostInput) {
      body
      countLikes
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($addCommentInput: AddCommentInput!) {
    addComment(addCommentInput: $addCommentInput) {
      comments {
        text
      }
    }
  }
`;
