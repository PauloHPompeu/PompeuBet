import React, { useState, useEffect } from "react";
import {
  MantineProvider,
  Box,
  Card,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { Categoria } from "../../enums/Categoria";
import { TipoBet } from "../../enums/TipoBet";
import axios from "axios";
import styles from "./Aposta.module.css";

function Apostas() {
  const [showForm, setShowForm] = useState(false);
  const [eventoAposta, setEventoAposta] = useState("");
  const [valorAposta, setValorAposta] = useState();
  const [tipoBet, setTipoBet] = useState();
  const [nomeAposta, setNomeAposta] = useState("");
  const [showEvento, setShowEvento] = useState(false);
  const [tipoEvento, setTipoEvento] = useState("");
  const [nomeEventoEsportivo, setNomeEventoEsportivo] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [listaEventos, setListaEventos] = useState([]);

  const saveEvento = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/evento/cadastro",
        {
          nome: nomeEventoEsportivo,
          categoria: tipoEvento,
        }
      );
      if (response.status === 200) {
        setShowEvento(false);
        getEventos();
        alert("Evento cadastrado com sucesso!");
      }
    } catch (error) {
      alert("Erro no cadastro. Por favor, tente novamente.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (listaEventos.length === 0) {
      getEventos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEventos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/evento/findAll");
      if (response.status === 200) {
        setListaEventos(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:8080/bet/cadastro", {
        nome: nomeAposta,
        valor: valorAposta,
        tipoBet: tipoBet,
        usuarioId: localStorage.getItem("userId"),
        eventoId: eventoAposta,
      });
      if (response.status === 200) {
        setShowForm(false);
        setShowConfirmation(false);
        alert("Aposta cadastrada com sucesso!");
      }
    } catch (error) {
      alert("Saldo indisponível");
      console.error(error);
    }
  };

  return (
    <MantineProvider>
      <Box className={styles.container}>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          {!showEvento ? (
            <Button
              onClick={() => setShowEvento(true)}
              className={styles.button}
            >
              CadastrarEvento
            </Button>
          ) : (
            <>
              <TextInput
                label="Nome/descrição do Evento"
                value={nomeEventoEsportivo}
                onChange={(e) => setNomeEventoEsportivo(e.target.value)}
                className={styles.input}
                placeholder="Digite o nome do evento"
              />
              <label className={styles.label}>
                Tipo do Evento
                <select
                  value={tipoEvento}
                  onChange={(e) => setTipoEvento(e.target.value)}
                  className={styles.select}
                >
                  <option value="" disabled>
                    Selecione o tipo do evento
                  </option>
                  <option value={Categoria.Futebol}>Futebol</option>
                  <option value={Categoria.Basquete}>Basquete</option>
                  <option value={Categoria.Volei}>Volei</option>
                  <option value={Categoria.Golf}>Golf</option>
                  <option value={Categoria.Formula1}>Formula1</option>
                </select>
              </label>
              <Button onClick={() => saveEvento()} className={styles.button}>
                Confirmar cadastro
              </Button>
              <Button
                onClick={() => setShowEvento(false)}
                className={styles.button}
              >
                Cancelar
              </Button>
            </>
          )}
        </Card>
        <Card className={styles.card} shadow="md" withBorder padding="md">
          {!showForm ? (
            <Button onClick={() => setShowForm(true)} className={styles.button}>
              Criar Aposta
            </Button>
          ) : (
            <>
              {!showConfirmation ? (
                <>
                  <TextInput
                    label="Nome/descrição da Aposta"
                    value={nomeAposta}
                    onChange={(e) => setNomeAposta(e.target.value)}
                    className={styles.input}
                    placeholder="Digite o nome da aposta"
                  />
                  <input
                    className={styles.input}
                    type="number"
                    placeholder="Digite o valor desejado"
                    value={valorAposta}
                    onChange={(e) => setValorAposta(e.target.value)}
                    required
                  />
                  <label className={styles.label}>
                    Evento
                    <select
                      value={eventoAposta}
                      onChange={(e) => setEventoAposta(e.target.value)}
                      className={styles.select}
                    >
                      <option value="" disabled>
                        Selecione o evento
                      </option>
                      {listaEventos.map((evento) => (
                        <option key={evento.id} value={evento.id}>
                          {evento.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.label}>
                    Tipo da Aposta
                    <select
                      value={tipoBet}
                      onChange={(e) => setTipoBet(e.target.value)}
                      className={styles.select}
                    >
                      <option value="" disabled>
                        Selecione o tipo da aposta
                      </option>
                      <option value={TipoBet.Simples}>Simples</option>
                      <option value={TipoBet.Multipla}>Multipla</option>
                      <option value={TipoBet.Bingo}>Bingo</option>
                    </select>
                  </label>
                  <Button
                    onClick={() => setShowConfirmation(true)}
                    className={styles.button}
                  >
                    Confirmar Aposta
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    className={styles.button}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Card
                    opened={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                    title="Confirmar Aposta"
                    className={styles.card}
                  >
                    <p>Deseja realmente criar esta aposta?</p>
                    <Group position="right" mt="md">
                      <Button onClick={handleSave} className={styles.button}>
                        Confirmar
                      </Button>
                      <Button
                        onClick={() => setShowConfirmation(false)}
                        className={styles.button}
                      >
                        Cancelar
                      </Button>
                    </Group>
                  </Card>
                </>
              )}
            </>
          )}
        </Card>
      </Box>
    </MantineProvider>
  );
}

export default Apostas;
