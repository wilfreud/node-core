import {
  createReadStream,
  statSync,
  existsSync,
  createWriteStream,
} from "node:fs";

const FILE = "C:\\Users\\Autre\\Videos\\2024-11-11 09-38-21.mkv";

const DEST = "C:\\Users\\Autre\\Videos\\copy.mkv";

if (!existsSync(FILE)) {
  console.error("Can't open file. doesn't exist");
  process.exit(-1);
}

const stats = statSync(FILE);

const rStream = createReadStream(FILE, { autoClose: true });

const wStream = createWriteStream(DEST, { autoClose: true });
wStream.on("finish", () => {
  console.info("Finished copying...");
});

rStream.on("open", (fd) => {
  console.info("Successfully opened stream ", fd);
});

let read = 0;
rStream
  .on("data", (chunk) => {
    read += chunk.length;
    console.info(
      "Reading",
      ((read / stats.size) * 100).toFixed(2),
      `% (${(chunk.byteLength / 1024).toFixed(2)} MB)`
    );
    //   console.log(chunk);
  })
  .pipe(wStream);

rStream.on("error", (err) => {
  console.error("Error while reading stream", err);
});

rStream.on("close", () => {
  console.log("Read Stream closed");
});

wStream.on("close", () => {
  console.log("Write Stream closed");
});
