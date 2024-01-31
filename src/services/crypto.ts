import crypto from "crypto";

export function generateRandomString(length = 10) {
  return crypto.randomBytes(length).toString();
}