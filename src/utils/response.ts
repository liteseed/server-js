export const BAD_REQUEST = new Response(null, { status: 400, statusText: "BAD REQUEST" });
export const NOT_FOUND = new Response(null, { status: 404, statusText: "NOT FOUND" });
export const NO_CONTENT = new Response(null, {status: 201, statusText: "NO CONTENT"});
export const UNAUTHORIZED = new Response(null, { status: 401, statusText: "UNAUTHORIZED" });
/**
 * 
 * @param {Record<string, any> | Record<string, any>[] | null} data 
 * @param {number} status 
 * @param {string} statusText 
 * @returns 
 */
export const parseJSON = (data: Record<string, any> | Record<string, any>[] | string | null = null, status = 200, statusText = "OK") => new Response(JSON.stringify(data), { status, statusText });