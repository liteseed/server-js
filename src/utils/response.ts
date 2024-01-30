export const BAD_REQUEST = new Response(null, { status: 400, statusText: "BAD REQUEST" })
export const INTERNAL_SERVER_ERROR = new Response(null, { status: 500, statusText: "INTERNAL SERVER ERROR" });
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
export const parseJSON = (data: Record<string, any> | Record<string, any>[] | null = null, status: number = 200, statusText: string = "OK") => new Response(JSON.stringify(data), { status, statusText });