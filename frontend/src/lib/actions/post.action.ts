import image from "next/image";
import client from "../client";
import { CreatePostParams } from "./shared.types";

export async function createSimplePost(userData: CreatePostParams) {
  const { name } = userData;
  console.log(userData);

  try {
    const response = await client.mutate({
      mutation: CREATE_SIMPLE_POST,
      variables: {
        walletAddress,
        image,
        username,
      },
    });

    return response;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
