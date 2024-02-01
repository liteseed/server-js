import crypto from "crypto";

export function generateRandomString(length = 10): string {
  return crypto.randomBytes(length).toString();
}