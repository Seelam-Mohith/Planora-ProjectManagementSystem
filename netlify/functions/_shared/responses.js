const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Content-Type": "application/json",
};

const json = (statusCode, body) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

const error = (statusCode, message, detail) => {
  const body = { message };
  if (detail) {
    body.error = detail;
  }
  return json(statusCode, body);
};

const options = () => json(200, { message: "OK" });

module.exports = { headers, json, error, options };
