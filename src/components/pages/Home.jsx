import { MantineProvider, Box, Card, TextInput, Button } from "@mantine/core";
import axios from "axios";

function Home() {
  const usuario = {
    usuario: "ss",
    senha: "dd",
  };

  const autenticar = () => {
    axios.post(`http://localhost:8080/usuario/cadastro` + usuario);
  };

  return (
    <MantineProvider>
      <Box>
        <Card shadow={"1rem"} withBorder padding={"1rem"}>
          <TextInput
            onChange={(e) => (usuario.usuario = e.target.value)}
            value={usuario.usuario}
          ></TextInput>
          <TextInput
            onChange={(e) => (usuario.senha = e.target.value)}
            value={usuario.senha}
          ></TextInput>
          <button onClick={() => autenticar()}>dddd</button>
        </Card>
      </Box>
    </MantineProvider>
  );
}

export default Home;
