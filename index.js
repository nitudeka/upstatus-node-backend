const http = require("http");

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.end("hello world\n");
});

server.listen(PORT, () => {
  console.log("The server is listening on port", PORT);
});
