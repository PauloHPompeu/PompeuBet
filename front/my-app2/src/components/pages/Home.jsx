import { MantineProvider, Box, Card, TextInput } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import styles from './Home.module.css';

function Home() {
  const [usuario, setUsuario] = useState({
    usuario: "",
    senha: "",
  });

  const autenticar = () => {
    axios.post(`http://localhost:8080/usuario/cadastro`, usuario);
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          <TextInput
            onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
            value={usuario.usuario}
            classNames={{ input: styles.input }}
            placeholder="Digite o usuário"
          />
          <TextInput
            type="password"
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
            value={usuario.senha}
            classNames={{ input: styles.input }}
            placeholder="Digite a senha"
          />
          <button className={styles.button} onClick={autenticar}>
            Login
          </button>
        </Card>
      </Box>
    </MantineProvider>
  );
}

export default Home;
