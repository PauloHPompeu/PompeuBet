import { MantineProvider, Box, Card, TextInput, Text } from "@mantine/core";
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

  const cadastrar = async () => {
    try {
      // Primeiro, realiza o cadastro
      const cadastroResponse = await axios.post(
        "http://localhost:8080/usuario/cadastro",
        {
          nome: cadastro.nome,
          senha: cadastro.senha,
        }
      );
      if (cadastroResponse.status === 200) {
        // Cadastro realizado com sucesso, agora obtém o ID do usuário
        const usuarioResponse = await axios.get(
          `http://localhost:8080/usuario/findUsuarioByNome/${usuario.nome}`
        );
        const userId = usuarioResponse.data; // Ajuste conforme a estrutura da resposta

        // Armazena o ID no localStorage
        localStorage.setItem("userId", userId);

        // Redireciona para a página de apostas
        alert("Cadastro realizado com sucesso!");
        window.location.href = "/apostas";
      }
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const logar = async () => {
    try {
      // Primeiro, realiza o cadastro
      const cadastroResponse = await axios.post(
        "http://localhost:8080/usuario/autenticar",
        {
          nome: usuario.nome,
          senha: usuario.senha,
        }
      );
      if (cadastroResponse.status === 200) {
        // Cadastro realizado com sucesso, agora obtém o ID do usuário
        const usuarioResponse = await axios.get(
          `http://localhost:8080/usuario/findUsuarioByNome/${usuario.nome}`
        );
        const userId = usuarioResponse.data; // Ajuste conforme a estrutura da resposta

        // Armazena o ID no localStorage
        localStorage.setItem("userId", userId);

        // Redireciona para a página de apostas
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
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
            value={usuario.senha}
            classNames={{ input: styles.input }}
            placeholder="Digite a senha"
          />
          <button className={styles.button} onClick={logar}>
            Login
          </button>
        </Card>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          <Text>Cadastrar Usuário</Text>
          <br />
          <TextInput
            onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
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
      </Box>
    </MantineProvider>
  );
}

export default Home;
