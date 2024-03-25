
export const parseJSON = (
  data: Record<string, any> | Record<string, any>[] | string | null = null,
  status = 200,
  statusText = "OK",
) => new Response(JSON.stringify(data), { status, statusText });
