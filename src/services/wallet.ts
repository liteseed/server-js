import { readFileSync } from "fs";

const wallet = JSON.parse(readFileSync("../../wallet.json").toString());

export default wallet;
