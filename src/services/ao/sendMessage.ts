import { message } from "@permaweb/aoconnect";
import { createDataItemSigner } from "@permaweb/aoconnect/dist/client/node/wallet";
import wallet from "../wallet";

export default async function sendMessage({ processId, data }: { processId: string; data: string }) {
  const response = message({ process: processId, signer: createDataItemSigner(wallet), data });
  return {...response};
}
