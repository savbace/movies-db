import { Card, CardActions, CardMedia, Container, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useRef, useState } from "react";

function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountdownText />
      <CountdownVideo />
    </Container>
  );
}

function CountdownText() {
  const intervalRef = useRef<any>(null);
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((value) => value - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
  }, [countdown]);

  return (
    <Typography variant="h5" align="center" sx={{ mb: 2 }}>
      Coming soon: {countdown}.
    </Typography>
  );
}

function CountdownVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlaying() {
    const nextPlaying = !isPlaying;

    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }

  return (
    <Card>
      <CardMedia>
        <video
          ref={videoRef}
          src="https://www.pexels.com/download/video/3843433"
          height="500"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardMedia>
      <CardActions>
        <IconButton aria-label="play/pause" onClick={togglePlaying}>
          {isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />}
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default About;
