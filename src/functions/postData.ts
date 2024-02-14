type PostDataParams = { file: File; url: string };
type PostDataResponse = Promise<Response>;

export function postData({ file, url }: PostDataParams): PostDataResponse {
  console.log("POST DATA");
  const data = new FormData();
  data.append("file", file);
  return fetch(url, {
    method: "POST",
    body: data,
  });
}
