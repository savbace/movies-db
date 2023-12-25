import { Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function About() {
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
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h5" align="center">
        Coming soon: {countdown}.
      </Typography>
    </Container>
  );
}

export default About;
