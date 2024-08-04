import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Box,
  Card,
  Text,
  Button,
  Group,
  TextInput,
} from "@mantine/core";
import styles from "./MeuPerfil.module.css";
import axios from "axios";

function MeuPerfil() {
  const [editProfile, setEditProfile] = useState(false);
  const [userEdit, setUserEdit] = useState("");
  const [senhaEdit, setSenhaEdit] = useState("");
  const [user, setUser] = useState({ nome: "", saldo: 0 });
  const [profilePic, setProfilePic] = useState(
    "https://www.github.com/PauloHPompeu.png"
  );

  const handleSaveProfile = async () => {
    setEditProfile(false);
    try {
      const response = await axios.post("http://localhost:8080/usuario/edit", {
        nome: userEdit,
        senha: senhaEdit,
        id: localStorage.getItem("userId"),
      });
      if (response.status === 200) {
        alert("Usuario atualizado com sucesso.");
      }
    } catch (error) {
      alert("Erro na busca do usuário.");
      console.error(error);
    }

    procuraUsuario();
  };

  useEffect(() => {
    if (user.nome === "") {
      procuraUsuario();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const procuraUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/usuario/findUsuarioById/${localStorage.getItem(
          "userId"
        )}`
      );
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      alert("Erro na busca do usuário.");
      console.error(error);
    }
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <Text className={styles.text}>Nome: {user.nome}</Text>
          <Text className={styles.text}>Saldo Atual: ${user.saldo}</Text>
          <Button
            onClick={() => setEditProfile(true)}
            className={styles.button}
          >
            Editar Perfil
          </Button>
        </Card>
        {editProfile && (
          <Card className={styles.card} shadow="md" withBorder padding="md">
            <input
              label="Nome"
              defaultValue={user.nome}
              onChange={(e) => setUserEdit(e.target.value)}
              className={styles.input}
              placeholder="Digite o novo nome"
            />

            <input
              label="Nova Senha"
              type="password"
              className={styles.input}
              onChange={(e) => setSenhaEdit(e.target.value)}
              placeholder="Digite a nova senha"
            />
            <Group position="right" mt="md">
              <Button onClick={handleSaveProfile} className={styles.button}>
                Salvar
              </Button>
              <Button
                onClick={() => setEditProfile(false)}
                variant="outline"
                className={styles.button}
              >
                Cancelar
              </Button>
            </Group>
          </Card>
        )}
      </Box>
    </MantineProvider>
  );
}

export default MeuPerfil;
