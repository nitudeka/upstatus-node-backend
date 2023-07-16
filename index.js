const http = require("http");
const url = require("url");

const PORT = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$g/, "");
  const method = req.method.toLowerCase();

  res.end("hello world\n");
});

server.listen(PORT, () => {
  console.log("The server is listening on port", PORT);
});
