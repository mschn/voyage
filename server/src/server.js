const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mime = require("mime-types");

const app = express();
const port = 3003;

app.use(cors());

app.use(express.static("../dist/voyage/browser/"));

app.get("/api/version", (req, res) => {
  const versionFile = path.join(__dirname, "..", "..", "version.txt");
  try {
    const file = fs.readFileSync(versionFile);
    res.send(file.toString("utf8"));
  } catch (e) {
    res.send("0.0.0");
  }
});

app.get("/api/ls/:paramPath", (req, res) => {
  const { paramPath } = req.params;
  const files = fs
    .readdirSync(paramPath)
    .map((p) => {
      try {
        const filePath = path.join(paramPath, p);
        const stat = fs.statSync(filePath);
        return {
          isDirectory: stat.isDirectory(),
          isFile: stat.isFile(),
          name: p,
          size: stat.size,
          modifiedDate: stat.modifiedDate,
        };
      } catch (e) {
        return undefined;
      }
    })
    .filter((o) => o != null);
  res.send(files);
});

app.get("/api/open/:p", async (req, res) => {
  const { p } = req.params;
  try {
    const paramPath = decodeURIComponent(p);
    const stat = fs.statSync(paramPath);
    if (!stat.isFile) {
      res.status(400).send({ error: `Not a file: ${paramPath}` });
      return;
    }
    const mimeType = mime.lookup(paramPath);
    res.set("Content-Type", mimeType);
    const content = fs.readFileSync(paramPath); // TODO check large files
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: "Internal server error", cause: e });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist/voyage/browser/index.html"));
});

app.listen(port, () => {
  console.log(`Voyage server listening on port ${port}`);
});
