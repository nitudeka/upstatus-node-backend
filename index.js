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

    res.end("hello world\n");
  });
});

server.listen(PORT, () => {
  console.log("The server is listening on port", PORT);
});
