import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Listagem.module.css";

const Listagem = () => {
  const [listaApostas, setListaApostas] = useState([
    {
      valor: 0,
      nome: "",
      tipoBet: "",
      nomeUsuario: "",
      nomeEvento: "",
      categoriaEvento: "",
      idBet: 0,
    },
  ]);

  const findBets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/bet/findAll");
      if (response.status === 200) {
        setListaApostas(response.data);
      }
    } catch (error) {
      alert("Erro na busca. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const removeAposta = async (id) => {
    try {
      await axios.post(`http://localhost:8080/bet/deletar/${id}`);
      setListaApostas(listaApostas.filter((aposta) => aposta.idEvento !== id));
      findBets();
      alert("Aposta removida com sucesso!");
    } catch (error) {
      alert("Erro ao remover a aposta. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const confirmAposta = async (id) => {
    try {
      await axios.post(`http://localhost:8080/bet/confirmarAposta/${id}`);
      setListaApostas(listaApostas.filter((aposta) => aposta.idEvento !== id));
      findBets();
      alert("Aposta confirmada com sucesso!");
    } catch (error) {
      alert("Erro ao confirmar a aposta. Por favor, tente novamente.");
      console.error(error);
    }
  };

  useEffect(() => {
    findBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      {listaApostas.map((aposta, index) => (
        <div key={index} className={styles.card}>
          <p>Valor: {aposta.valor}</p>
          <p>Descrição: {aposta.nome}</p>
          <p>Tipo Bet: {aposta.tipoBet}</p>
          <p>Nome Usuário: {aposta.nomeUsuario}</p>
          <p>Nome Evento: {aposta.nomeEvento}</p>
          <p>Categoria Evento: {aposta.categoriaEvento}</p>
          <div className={styles.buttons}>
            <button onClick={() => removeAposta(aposta.idBet)}>
              Remover aposta
            </button>
            <button onClick={() => confirmAposta(aposta.idBet)}>
              Confirmar aposta
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listagem;
