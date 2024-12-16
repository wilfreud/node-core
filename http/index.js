import http from "node:http";
import { URL } from "node:url";
const agent = new http.Agent({ maxSockets: 1 });

const url = new URL("https://jsonplaceholder.typicode.com/todos");

http.get({ agent, hostname: url.hostname, path: url.pathname }, (res) => {
  res.on("data", (chunk) => {
    console.log("< ", chunk.byteLength, chunk, " >");
  });

  res.on("error", (err) => {
    console.error("Error reading response object", err);
  });
});
