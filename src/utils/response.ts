export const NO_CONTENT = new Response(null, {
  status: 201,
  statusText: "NO CONTENT",
});
export const UNAUTHORIZED = new Response(null, {
  status: 401,
  statusText: "UNAUTHORIZED",
});
/**
 *
 * @param {Record<string, any> | Record<string, any>[] | null} data
 * @param {number} status
 * @param {string} statusText
 * @returns
 */
export const badRequest = (message: string) =>
  new Response(message, { status: 400, statusText: "BAD REQUEST" });
export const notFound = (message: string) =>
  new Response(`NO DATA FOUND: ${message}`, {
    status: 404,
    statusText: "NOT FOUND",
  });
export const parseJSON = (
  data: Record<string, any> | Record<string, any>[] | string | null = null,
  status = 200,
  statusText = "OK",
) => new Response(JSON.stringify(data), { status, statusText });
