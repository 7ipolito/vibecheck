
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface WhoamiInput {
    walletAdddress: string;
}

export interface DeleteInput {
    id: string;
}

export interface CreateSimplePostDto {
    name: string;
    image: string;
}

export interface RegisterInput {
    username: string;
    image?: Nullable<string>;
    walletAddress: string;
}

export interface CreateTicketDto {
    eventId: string;
    type: string;
    price: number;
    bucketUrl?: Nullable<string>;
}

export interface User {
    _id: string;
    username: string;
    walletAddress: string;
    image: string;
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
    success?: Nullable<boolean>;
}

export interface Post {
    id: string;
    name: string;
    description: string;
    image: string;
    instagram: string;
    createdAt: string;
}

export interface Ticket {
    id: string;
    type: string;
    price: number;
    bucketUrl?: Nullable<string>;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IQuery {
    whoami(whoamiInput: WhoamiInput): User | Promise<User>;
    posts(): Post[] | Promise<Post[]>;
    tickets(): Ticket[] | Promise<Ticket[]>;
}

export interface IMutation {
    deleteUser(deleteInput: DeleteInput): DeleteResponse | Promise<DeleteResponse>;
    createPost(createPostInput: CreateSimplePostDto): Post | Promise<Post>;
    register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;
    createTicket(createTicketInput: CreateTicketDto): Ticket | Promise<Ticket>;
}

export type DateTime = any;
type Nullable<T> = T | null;
