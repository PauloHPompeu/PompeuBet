import React, { useState } from 'react';
import { MantineProvider, Box, Card, Text, Button, Group, Modal, TextInput } from '@mantine/core';
import styles from './MeuPerfil.module.css';

function MeuPerfil() {
  const [editProfile, setEditProfile] = useState(false);
  const [userName, setUserName] = useState('Paulo Pompeu');
  const [balance, setBalance] = useState(1000);
  const [profitLoss, setProfitLoss] = useState(200);
  const [profilePic, setProfilePic] = useState('https://www.github.com/PauloHPompeu.png');

  const handleSaveProfile = () => {
    // Lógica para salvar alterações no perfil
    setEditProfile(false);
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          <img src={profilePic} alt="Profile" className={styles.profilePic} />
          <Text className={styles.text}>Nome: {userName}</Text>
          <Text className={styles.text}>Saldo Atual: ${balance}</Text>
          <Text className={styles.text}>Prejuízo/Lucro: ${profitLoss}</Text>
          <Button onClick={() => setEditProfile(true)} className={styles.button}>Editar Perfil</Button>
        </Card>

        <Modal
          opened={editProfile}
          onClose={() => setEditProfile(false)}
          title="Editar Perfil"
          className={styles.modal}
        >
          <TextInput
            label="Nome"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
          <TextInput
            label="URL da Foto de Perfil"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className={styles.input}
          />
          <TextInput
            label="Nova Senha"
            type="password"
            className={styles.input}
          />
          <Group position="right" mt="md">
            <Button onClick={handleSaveProfile} className={styles.button}>Salvar</Button>
            <Button onClick={() => setEditProfile(false)} className={styles.button}>Cancelar</Button>
          </Group>
        </Modal>
      </Box>
    </MantineProvider>
  );
}

export default MeuPerfil;
