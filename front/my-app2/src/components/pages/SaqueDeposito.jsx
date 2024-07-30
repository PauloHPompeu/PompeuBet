import React, { useState } from "react";
import axios from "axios";
import styles from "./SaqueDeposito.module.css";
import ReCAPTCHA from "react-google-recaptcha";

const SaqueDeposito = () => {
  const [user, setUser] = useState({ saldo: 1000 }); // Exemplo de saldo inicial
  const [isDeposito, setIsDeposito] = useState(false);
  const [isSaque, setIsSaque] = useState(false);
  const [valor, setValor] = useState("");
  const [captchaIsDone, setCaptchaDone] = useState(false);

  const idUser = 102;

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

  const fazerDeposito = () => {
    axios
      .put(
        `http://localhost:8080/user/${idUser}`,
        { saldo: parseFloat(user.saldo) + parseFloat(valor) },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((resposta) => {
        setUser((prevUser) => ({ ...prevUser, saldo: resposta.data.saldo }));
        setValor("");
      })
      .catch((error) => console.log(error));
  };

  const fazerSaque = () => {
    const novoSaldo = parseFloat(user.saldo) - parseFloat(valor);

    if (novoSaldo < 0) {
      alert("O valor do saque deve ser menor do que o saldo atual.");
      return;
    }

    axios
      .put(
        `http://localhost:8080/user/${idUser}`,
        { saldo: novoSaldo },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((resposta) => {
        setUser((prevUser) => ({ ...prevUser, saldo: resposta.data.saldo }));
        setValor("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Área de transações</h1>
        <div className={styles.usuario}>
          <h2>Usuário: {user.usuario}</h2>
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
