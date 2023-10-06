import { useState } from "react";
import "./App.css";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ytVideoToAudio from "./actions/ytVideoToAudio";

function App() {
  const [url, setUrl] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleConvertClick = async () => {
    setAudioSrc(null);
    const resp = await ytVideoToAudio(url);
    if (resp.ok) {
      const { base64Data } = await resp.json();
      setAudioSrc(`data:audio/mp3;base64,${base64Data}`);
    }
  };

  const handleDownloadAudioClick =()=>{
    var a = document.createElement("a");
    a.href = audioSrc
    a.download = "Audio.mp3";
    a.click();
    a.remove();
  }

  return (
    <div className="App">
      <Typography variant="h2">Video to Audio Converter</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            variant="outlined"
            placeholder="Video URL"
            onChange={handleUrlChange}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button variant="outlined" onClick={handleConvertClick}>
            Convert
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {audioSrc ? <audio src={audioSrc} controls /> : <></>}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {audioSrc ? (
            <Button variant="outlined" onClick={handleDownloadAudioClick}>
              Download Audio
            </Button>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
