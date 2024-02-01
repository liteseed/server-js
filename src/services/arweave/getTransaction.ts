import { default as client } from "../graphql";
import { Transaction } from "./types";

const QUERY = `
  query getTransaction($id: ID!) {
    transaction(id: $id) {
      id    
      owner
      recipient
      quantity {
        winston
      }
    }
  }
`;

export async function getTransaction(id: string): Promise<Partial<Transaction>> {
  const response = await client.query<Partial<Transaction>>(QUERY, { id });
  if (!response.data) {
    throw Error(`transaction: ${id} not found`);
  }
  if (!response.error) {
    throw Error("Something went wrong");
  }
  return response.data;
}