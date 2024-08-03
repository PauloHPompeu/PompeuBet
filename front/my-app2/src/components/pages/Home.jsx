import { MantineProvider, Box, Card, TextInput } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

function Home() {
  const [usuario, setUsuario] = useState({
    nome: "",
    senha: "",
  });

  const autenticar = async () => {
    try {
      // Primeiro, realiza o cadastro
      const cadastroResponse = await axios.post(
        "http://localhost:8080/usuario/cadastro",
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
        alert("Cadastro realizado com sucesso!");
        window.location.href = "/apostas";
      }
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error(error);
    }
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
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
          <button className={styles.button} onClick={autenticar}>
            Cadastro
          </button>
        </Card>
      </Box>
    </MantineProvider>
  );
}

export default Home;
