import { result } from "@permaweb/aoconnect";

export default async function readResult({messageId, processId}: {messageId: string; processId: string}) {
  const { Messages, Spawns, Output, Error } = await result({message: messageId, process: processId});
  return { Messages, Spawns, Output, Error } ;
}
