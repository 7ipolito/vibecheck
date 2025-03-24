export interface CreateUserParams {
  walletAddress?: string;
  username?: string | null;
  image?: string | null;
}

export interface GetUserParams {
  walletAddress?: string;
}

export interface DeleteUserParams {
  clerkUserId: string;
}

// export interface GetUserParams {
//   _id: string;
//   clerkUserId: string;
//   email: string;
//   username: string | null;
//   image: string;
//   createAt: Date;
// }

interface User {
  _id: string;
  email: string;
  image: string;
  walletAddress: string;
  username: string;
}

export interface GetPostParams {
  id: string;
  name: string;
  image: string;
  description: string;

  createdAt: Date;
}
