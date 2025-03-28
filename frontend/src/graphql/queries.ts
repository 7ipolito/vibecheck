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

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($input: CreatePaymentDto!) {
    createPayment(input: $input) {
      id
      status
      amount
      createdAt
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

export const GET_TICKET_BY_ID = gql`
  query GetTicketById($id: String!) {
    ticket(id: $id) {
      id
      type
      price
      status
      event {
        _id
        name
        description
        image
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_PAYMENT = gql`
  query GetPayment($id: String!) {
    payment(id: $id) {
      id
      status
      amount
      ticket {
        id
        type
        event {
          name
        }
      }
    }
  }
`;

export const GET_USER_PAYMENTS = gql`
  query UserPayments($walletAddress: String!) {
    userPayments(walletAddress: $walletAddress) {
      id
      status
      method
      amount
      createdAt
      ticket {
        id
        type
        price
        status
        bucketUrl
        event {
          _id
          name
          image
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($whoamiInput: WhoamiInput!) {
    whoami(whoamiInput: $whoamiInput) {
      _id
      username
      walletAddress
      image
      createdAt
    }
  }
`;

export const UPDATE_PAYMENT_STATUS = gql`
  mutation UpdatePaymentStatus($id: String!, $status: String!) {
    updatePaymentStatus(id: $id, status: $status) {
      id
      status
      method
      amount
      createdAt
    }
  }
`;
