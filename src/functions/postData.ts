type PostDataParams = { file: File; url: string };
type PostDataResponse = Promise<Response>;

export async function postData({ file, url }: PostDataParams): PostDataResponse {
  const response = await fetch(url, {
    method: "POST",
    body: file,
  });
  return response;
}
