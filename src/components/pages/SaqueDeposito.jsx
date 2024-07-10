import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import styles from "./SaqueDeposito.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import Urubu from "./urubu.gif";

function SaqueDeposito() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [valor, setValor] = useState("");
  const [valorr, setValorr] = useState("");
  const [captchaIsDone, setCaptchaDone] = useState(false);
  const [captchaIsDonee, setCaptchaDonee] = useState(false);
  const [depositoSucedido, setDepositoSucedido] = useState(false);
  const [saqueSucedido, setSaqueSucedido] = useState(false);

  const idUser = 102;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${idUser}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const key = "6LcshJonAAAAALkBFoJDMmjMJz5NM7d3IdKaHsMK";

  function onChange() {
    console.log("Changed");
    setCaptchaDone(true);
  }

  function onChangee() {
    console.log("Changed");
    setCaptchaDonee(true);
  }

  function fazerDeposito(valor) {
    axios
      .put(
        `http://localhost:8080/user/${idUser}`,
        { saldo: parseFloat(user.saldo) + parseFloat(valor) },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((resposta) => {
        setUser((prevUser) => ({ ...prevUser, saldo: resposta.data.saldo }));
        setValor("");
        setDepositoSucedido(true);
      })
      .catch((error) => console.log(error));
  }

  function fazerSaque(valor) {
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
        setValorr("");
        setSaqueSucedido(true);
      })
      .catch((error) => console.log(error));
  }

  const handleNovoDeposito = () => {
    setDepositoSucedido(false);
    setCaptchaDone(false);
  };

  const handleNovoSaque = () => {
    setSaqueSucedido(false);
    setCaptchaDonee(false);
  };

  return (
    <div className={styles.saque_container}>
      <h1>Área de transações</h1>
      <div className={styles.usuario}>
        <h2>Usuário: {user.usuario}</h2>
        <h2>
          {user.saldo === 0
            ? "Saldo zerado"
            : `Saldo atual: R$ ${user.saldo} reais`}
        </h2>
      </div>
      <div className={styles.geral}>
        <div className={styles.deposito}>
          <h2>Área de depósito</h2>
          <hr />
          {depositoSucedido ? (
            <div className={styles.mensagemSucesso}>
              Depósito realizado com sucesso!
              <img src={Urubu} alt="Urubu" />
              <button onClick={handleNovoDeposito}>
                Realizar novo depósito
              </button>
            </div>
          ) : (
            <>
              <h3>Digite abaixo o valor que deseja depositar.</h3>
              <form className={styles.inputDep}>
                <input
                  className={styles.text}
                  type="number"
                  placeholder="Valor do depósito"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  required
                />
                <h4>Qual será a forma de pagamento?</h4>
                <div className={styles.divInput}>
                  <div>
                    <input
                      type="radio"
                      id="opcao1"
                      name="opcao"
                      value="pix"
                      required
                    />
                    <label htmlFor="opcao1">Pix</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao2"
                      name="opcao"
                      value="Boleto Bancário"
                    />
                    <label htmlFor="opcao2">Boleto Bancário</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao3"
                      name="opcao"
                      value="Cartão de crédito"
                    />
                    <label htmlFor="opcao3">Cartão de crédito</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao4"
                      name="opcao"
                      value="GiftCards"
                    />
                    <label htmlFor="opcao4">GiftCards</label>
                    <br />
                  </div>
                </div>
                <ReCAPTCHA sitekey={key} onChange={onChange} />
                {captchaIsDone && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fazerDeposito(valor);
                    }}
                  >
                    Finalizar depósito
                  </button>
                )}
                {/* Fazer validação em que os inputs devem estar preenchidos */}
              </form>
            </>
          )}
        </div>
        <div className={styles.saque}>
          <h2>Área de saque</h2>
          <hr />
          {saqueSucedido ? (
            <div className={styles.mensagemSucesso}>
              Saque realizado com sucesso!
              <img src={Urubu} alt="Urubu" />
              <button onClick={handleNovoSaque}>Realizar novo saque</button>
            </div>
          ) : (
            <>
              <h3>Digite abaixo o valor que deseja sacar.</h3>
              <form className={styles.inputDep}>
                <input
                  className={styles.text}
                  type="number"
                  placeholder="Valor do saque"
                  value={valorr}
                  onChange={(e) => setValorr(e.target.value)}
                  required
                />
                <h4>Onde deseja receber o valor do saque?</h4>
                <div className={styles.divInput}>
                  <div>
                    <input
                      type="radio"
                      id="opcao1"
                      name="opcao"
                      value="pix"
                      required
                    />
                    <label htmlFor="opcao1">Pix</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao2"
                      name="opcao"
                      value="Boleto Bancário"
                    />
                    <label htmlFor="opcao2">Transferência bancária</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao3"
                      name="opcao"
                      value="Cartão de crédito"
                    />
                    <label htmlFor="opcao3">Dinheiro via agiota local</label>
                    <br />
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="opcao4"
                      name="opcao"
                      value="GiftCards"
                    />
                    <label htmlFor="opcao4">Tibia Coins</label>
                    <br />
                  </div>
                </div>
                <ReCAPTCHA sitekey={key} onChange={onChangee} />
                {captchaIsDonee && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      fazerSaque(valorr);
                    }}
                  >
                    Finalizar depósito
                  </button>
                )}
                {/* Fazer validação em que os inputs devem estar preenchidos */}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaqueDeposito;
