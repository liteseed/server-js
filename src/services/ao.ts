import { AO_CONTRACT, AO_SERVER } from "../utils/constants";
import type { Data, Tags } from "../types";

type SendMessageParams = {
  data?: Data;
  tags?: Tags;
};
type SendMessageResponse = string;

type ReadResultParams = { message: string };
type ReadResultResponse = {
  Messages: [Record<string, any> & { Data?: Data; Tags?: Tags }];
  Output: [Record<string, any>];
  Spawns: [Record<string, any>];
  Error?: [Record<string, any>];
  GasUsed: Number;
};

class AO {
  async sendMessage({ data, tags }: SendMessageParams): Promise<SendMessageResponse> {
    const response = await fetch(`${AO_SERVER}/${AO_CONTRACT}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, tags }),
    });
    return await response.text();
  }

  async readResult({ message }: ReadResultParams): Promise<ReadResultResponse> {
    const response = await fetch(`${AO_SERVER}/${AO_CONTRACT}/${message}`, {
      method: "GET",
    });
    return await response.json();
  }
}

export default new AO();
