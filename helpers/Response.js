export default async function Response({ res, code, message, data }) {
  let response = {
    code,
    message,
  };

  if (data) response.data = data;

  await res.send(response);
}
