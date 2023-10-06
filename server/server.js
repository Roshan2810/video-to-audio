const express = require("express");
const cors = require("cors");
const fs = require("fs");
const ytdl = require("ytdl-core");

const app = express();

app.use(cors());
app.use(express.json());

getAudio = async (videoURL, res) => {
  const mp3FilePath = 'output.mp3';
  const stream = ytdl(videoURL, {
    quality: "highestaudio",
    filter: "audioonly",
  }).pipe(fs.createWriteStream(mp3FilePath));
  stream.on("finish", () => {
    console.log("onFinish");
    fs.readFile(mp3FilePath, (err, data) => {
      console.log("reading file.....");
      if (err) {
        console.error("Error reading the file:", err);
        return;
      }
      const base64Data = data.toString("base64");
      res.setHeader('Content-Type', 'application/json');
      res.json({ base64Data });
    });
  });
};

app.post("/yt-video-to-audio", (req, res) => {
  try {
    console.log("inside yt-video-to-audio");
    const { url } = req.body;
    console.log(url);
    if (!!url) {
      getAudio(url, res);
    }
  } catch (e) {
    res.send({
      message: "Please fill all the mandatory fields",
    });
  }
});

app.listen(5000, "localhost", () => {
  console.log("started listening at port 5000");
});
