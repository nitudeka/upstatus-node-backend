const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const PORT = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$g/, "");
  const method = req.method.toLowerCase();
  const queryStringObj = parsedUrl.query;
  const headers = req.headers;

  const decoder = new StringDecoder("utf8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const choosenHandler = router[trimmedPath] || handlers.notFound;

    const data = {
      trimmedPath,
      queryStringObj,
      method,
      headers,
      payload: buffer,
    };

    choosenHandler(data, (statusCode, payload) => {
      statusCode = statusCode || 200;
      payload = payload || {};

      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

server.listen(PORT, () => {
  console.log("The server is listening on port", PORT);
});

const handlers = {};

handlers.sample = (data, cb) => {
  cb(406, { name: "sample handler" });
};

handlers.notFound = (data, cb) => {
  cb(404);
};

const router = {
  sample: handlers.sample,
};
