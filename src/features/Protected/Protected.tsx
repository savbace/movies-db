import { useAuth0 } from "@auth0/auth0-react";
import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { protectedApi } from "../../services/protectedApi";

export function Protected() {
  const [response, setResponse] = useState("");
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getMessages = async () => {
      const accessToken = await getAccessTokenSilently();
      const messages = await protectedApi.getMessages(accessToken);
      setResponse(JSON.stringify(messages, null, 2));
    };

    getMessages();
  }, [getAccessTokenSilently]);

  return (
    <Container sx={{ p: 2 }}>
      <Typography>Response from API protected by JWT token:</Typography>
      <pre>
        <code>{response}</code>
      </pre>
    </Container>
  );
}
