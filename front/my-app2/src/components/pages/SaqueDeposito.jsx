import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SaqueDeposito.module.css";
import ReCAPTCHA from "react-google-recaptcha";

const SaqueDeposito = () => {
  const [user, setUser] = useState({ nome: "", saldo: 0 }); // Exemplo de saldo inicial
  const [isDeposito, setIsDeposito] = useState(false);
  const [isSaque, setIsSaque] = useState(false);
  const [valor, setValor] = useState("");
  const [captchaIsDone, setCaptchaDone] = useState(false);

  const key = "6LcshJonAAAAALkBFoJDMmjMJz5NM7d3IdKaHsMK";

  const handleDeposito = () => {
    setIsDeposito(true);
    setIsSaque(false);
  };

  const handleSaque = () => {
    setIsSaque(true);
    setIsDeposito(false);
  };

  const onChange = () => {
    setCaptchaDone(true);
  };

  useEffect(() => {
    procuraUsuario();
  });

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

  const fazerDeposito = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/usuario/transacao",
        {
          usuarioId: localStorage.getItem("userId"),
          valor: valor,
          isDeposito: true,
        }
      );
      if (response.status === 200) {
        alert("Deposito realizado com sucesso!");
      }
    } catch (error) {
      alert("Erro no deposito. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const fazerSaque = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/usuario/transacao",
        {
          usuarioId: localStorage.getItem("userId"),
          valor: valor,
          isDeposito: false,
        }
      );
      if (response.status === 200) {
        alert("Saldo realizado com sucesso!");
      }
    } catch (error) {
      alert("Erro no saque. Saldo indisponível.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Área de transações</h1>
        <div className={styles.usuario}>
          <h2>Usuário: {user.nome}</h2>
          <h2>Saldo atual: R$ {user.saldo} reais</h2>
        </div>
        <div className={styles.geral}>
          {!isDeposito && !isSaque && (
            <div className={styles.buttons}>
              <button className={styles.button} onClick={handleDeposito}>
                Depósito
              </button>
              <button className={styles.button} onClick={handleSaque}>
                Saque
              </button>
            </div>
          )}
          {isDeposito && (
            <div className={styles.transacao}>
              <h2>Área de depósito</h2>
              <form>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Valor do depósito"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
                <ReCAPTCHA sitekey={key} onChange={onChange} />
                {captchaIsDone && (
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      fazerDeposito();
                    }}
                  >
                    Finalizar depósito
                  </button>
                )}
              </form>
            </div>
          )}
          {isSaque && (
            <div className={styles.transacao}>
              <h2>Área de saque</h2>
              <form>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Valor do saque"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
                <ReCAPTCHA sitekey={key} onChange={onChange} />
                {captchaIsDone && (
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      fazerSaque();
                    }}
                  >
                    Finalizar saque
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaqueDeposito;
