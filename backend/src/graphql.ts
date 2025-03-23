
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface WhoamiInput {
    userId: string;
}

export interface DeleteInput {
    id: string;
}

export interface CreateFullyPostDto {
    name: string;
    description: string;
    image: string;
}

export interface RegisterInput {
    clerkUserId: string;
    username: string;
    image?: Nullable<string>;
    email: string;
}

export interface User {
    _id: string;
    clerkUserId: string;
    username: string;
    image: string;
    email: string;
    createdAt: DateTime;
}

export interface ErrorTypeDelete {
    path: string;
    message: string;
}

export interface DeleteResponse {
    error?: Nullable<ErrorTypeDelete[]>;
}

export interface ErrorType {
    path: string;
    message: string;
}

export interface RegisterResponse {
    error?: Nullable<ErrorType[]>;
}

export interface Post {
    id: string;
    name: string;
    description: string;
    additionalImages: string;
    text: string;
    createdAt: string;
    user: User;
}

export interface ErrorTypeCreatePost {
    path: string;
    message: string;
}

export interface IQuery {
    whoami(whoamiInput: WhoamiInput): User | Promise<User>;
    posts(): Post[] | Promise<Post[]>;
}

export interface IMutation {
    deleteUser(deleteInput: DeleteInput): DeleteResponse | Promise<DeleteResponse>;
    createPost(createPostInput: CreateFullyPostDto): Post | Promise<Post>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;
