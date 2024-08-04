import {
  MantineProvider,
  Box,
  Card,
  TextInput,
  Text,
  Button,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

function Home() {
  const [usuario, setUsuario] = useState({
    nome: "",
    senha: "",
  });
  const [cadastro, setCadastro] = useState({
    nome: "",
    senha: "",
  });
  const [showLogin, setShowLogin] = useState(true);

  const cadastrar = async () => {
    try {
      const cadastroResponse = await axios.post(
        "http://localhost:8080/usuario/cadastro",
        {
          nome: cadastro.nome,
          senha: cadastro.senha,
        }
      );
      if (cadastroResponse.status === 200) {
        alert("Cadastro realizado com sucesso!");
      }
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const logar = async () => {
    try {
      const loginResponse = await axios.post(
        "http://localhost:8080/usuario/autenticar",
        {
          nome: usuario.nome,
          senha: usuario.senha,
        }
      );
      if (loginResponse.status === 200) {
        const usuarioResponse = await axios.get(
          `http://localhost:8080/usuario/findUsuarioByNome/${usuario.nome}`
        );
        const userId = usuarioResponse.data;

        localStorage.setItem("userId", userId);
        alert("Login realizado com sucesso!");
        window.location.href = "/apostas";
      }
    } catch (error) {
      alert("Informações incorretas!");
      console.error(error);
    }
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Box className={styles.buttonContainer}>
          <Button
            className={styles.buttonToggle}
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button
            className={styles.buttonToggle}
            onClick={() => setShowLogin(false)}
          >
            Cadastro
          </Button>
        </Box>
        {showLogin ? (
          <Card className={styles.card} shadow="md" withBorder padding="md">
            <Text>Realizar Login</Text>
            <br />
            <TextInput
              onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
              value={usuario.nome}
              classNames={{ input: styles.input }}
              placeholder="Digite o usuário"
            />
            <TextInput
              type="password"
              onChange={(e) =>
                setUsuario({ ...usuario, senha: e.target.value })
              }
              value={usuario.senha}
              classNames={{ input: styles.input }}
              placeholder="Digite a senha"
            />
            <button className={styles.button} onClick={logar}>
              Login
            </button>
          </Card>
        ) : (
          <Card className={styles.card} shadow="md" withBorder padding="md">
            <Text>Cadastrar Usuário</Text>
            <br />
            <TextInput
              onChange={(e) =>
                setCadastro({ ...cadastro, nome: e.target.value })
              }
              value={cadastro.nome}
              classNames={{ input: styles.input }}
              placeholder="Digite o usuário"
            />
            <TextInput
              type="password"
              onChange={(e) =>
                setCadastro({ ...cadastro, senha: e.target.value })
              }
              value={cadastro.senha}
              classNames={{ input: styles.input }}
              placeholder="Digite a senha"
            />
            <button className={styles.button} onClick={cadastrar}>
              Cadastro
            </button>
          </Card>
        )}
      </Box>
    </MantineProvider>
  );
}

export default Home;
