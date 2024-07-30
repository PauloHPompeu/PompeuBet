import React, { useState } from 'react';
import { MantineProvider, Box, Card, TextInput, Button, Modal, Select, Group } from '@mantine/core';
import axios from 'axios';
import styles from './Aposta.module.css';

function Apostas() {
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [sport, setSport] = useState('');
  const [odds, setOdds] = useState([]);
  const [showOddsForm, setShowOddsForm] = useState(false);
  const [oddDescription, setOddDescription] = useState('');
  const [oddValue, setOddValue] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddOdd = () => {
    setOdds([...odds, { description: oddDescription, value: oddValue }]);
    setOddDescription('');
    setOddValue('');
    setShowOddsForm(false);
  };

  const handleSave = () => {
    const betDetails = {
      eventName,
      sport,
      odds,
    };

    axios.post('http://localhost:8080/api/create-bet', betDetails)
      .then(response => {
        console.log('Bet created:', response.data);
        setShowConfirmation(false);
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error creating bet:', error);
      });
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className={styles.button}>Criar Aposta</Button>
          ) : (
            <>
              <TextInput
                label="Nome da Aposta"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className={styles.input}
                placeholder="Digite o nome da aposta"
              />
              <Select
                label="Esporte"
                value={sport}
                onChange={(value) => setSport(value)}
                className={styles.select}
                placeholder="Selecione o esporte"
                data={[
                  { value: 'volei', label: 'Vôlei' },
                  { value: 'futebol', label: 'Futebol' },
                  { value: 'basquete', label: 'Basquete' },
                ]}
              />
              <Button onClick={() => setShowOddsForm(true)} className={styles.button}>Cadastrar Odds</Button>
              <Button onClick={() => setShowConfirmation(true)} className={styles.button}>Confirmar Aposta</Button>
              <Button onClick={() => setShowForm(false)} className={styles.button}>Cancelar</Button>
            </>
          )}
        </Card>

        <Modal
          opened={showOddsForm}
          onClose={() => setShowOddsForm(false)}
          title="Cadastrar Odds"
          className={styles.modal}
        >
          <TextInput
            label="Descrição da Odd"
            value={oddDescription}
            onChange={(e) => setOddDescription(e.target.value)}
            className={styles.input}
          />
          <TextInput
            label="Valor da Odd"
            value={oddValue}
            onChange={(e) => setOddValue(e.target.value)}
            className={styles.input}
          />
          <Group position="right" mt="md">
            <Button onClick={handleAddOdd} className={styles.button}>Adicionar Odd</Button>
            <Button onClick={() => setShowOddsForm(false)} className={styles.button}>Cancelar</Button>
          </Group>
        </Modal>

        <Modal
          opened={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          title="Confirmar Aposta"
          className={styles.modal}
        >
          <p>Deseja realmente criar esta aposta?</p>
          <Group position="right" mt="md">
            <Button onClick={handleSave} className={styles.button}>Confirmar</Button>
            <Button onClick={() => setShowConfirmation(false)} className={styles.button}>Cancelar</Button>
          </Group>
        </Modal>
      </Box>
    </MantineProvider>
  );
}

export default Apostas;
