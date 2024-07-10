import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from './Aposta.module.css'



const Opcoes = ['pedra', 'papel', 'tesoura']

const imagens = {
  pedra: require('./imagens/pedra.png'),
  papel: require('./imagens/papel.png'),
  tesoura: require('./imagens/tesoura.png'),
  empate: require('./imagens/empate.png'),
  vitoria: require('./imagens/vitoria.png'),
  derrota: require('./imagens/derrota.png'),
}

function Apostas() {
  const [resultado, setResultado] = useState('')
  const [escolhaUsuario, setEscolhaUsuario] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imagemResultado, setImagemResultado] = useState(null)
  const [user, setUser] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [situacao, setSituacao] = useState()
  const [ganho, setGanho] = useState("")
  const [selecionarJogo, setSelecionarJogo] = useState("")
  const [aparecerBotoes, setAparecerBotoes] = useState(true)


  const idUser = 102

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${idUser}`)
      .then(response => {
        setUser(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  function empate() {
    axios
      .put(
        `http://localhost:8080/user/${idUser}`,
        { saldo: parseFloat(user.saldo)},
        { headers: { "Content-Type": "application/json" } }
      )
      .then((resposta) => {
        setUser((prevUser) => ({ ...prevUser, saldo: resposta.data.saldo }));
        setInputValue("");
      })
      .catch((error) => console.log(error));
  }


  function descontoInicial(valor) {
    const novoSaldo = parseFloat(user.saldo) - parseFloat(valor)
  
    if (novoSaldo < 0) {
      alert("Você não tem saldo suficiente para realizar essa aposta!")
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
        setInputValue("");
      })
      .catch((error) => console.log(error));
  }

  function ganhouAposta(valor) {
    const totalGanho = parseFloat(valor) * 1.8;
    axios
        .put(
            `http://localhost:8080/user/${idUser}`,
        {saldo: parseFloat(user.saldo) + totalGanho},
        {headers: {"Content-Type": "application/json"}}
        )
        .then((resposta) => {
            setUser((prevUser) => ({...prevUser, saldo: resposta.data.saldo}))
            setGanho(valor * 1.8)
            setInputValue("")
        })
        .catch((error) => console.log(error))
}

  const novoSaldo = user ? parseFloat(user.saldo) - parseFloat(inputValue) : 0

  const jogar = (escolha) => {
    setIsLoading(true)

    if (inputValue <= 0) {
      alert("Digite um valor válido para a aposta")
      setIsLoading(false)
      return
    }
  
    if (novoSaldo < 0) {
      alert("Você não tem saldo suficiente para realizar essa aposta!")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      const escolhaMaquina = Opcoes[Math.floor(Math.random() * Opcoes.length)]

      let novoResultado = ''
      let novaImagemResultado = ''

      if (escolha === escolhaMaquina) {
        novoResultado = 'Empate!'
        novaImagemResultado = 'empate'
        setSituacao("empate")
        empate()
      } else if (
        (escolha === 'pedra' && escolhaMaquina === 'tesoura') ||
        (escolha === 'papel' && escolhaMaquina === 'pedra') ||
        (escolha === 'tesoura' && escolhaMaquina === 'papel')
      ) {
        novoResultado = 'Você ganhou!'
        novaImagemResultado = 'vitoria'
        setSituacao("vitoria")
        ganhouAposta(inputValue)
      } else {
        novoResultado = 'Você perdeu!'
        novaImagemResultado = 'derrota'
        setSituacao("derrota")
        descontoInicial(inputValue)
      }

      setResultado(`Você escolheu ${escolha}, a máquina escolheu ${escolhaMaquina}. ${novoResultado}`)
      setEscolhaUsuario(escolha)
      setImagemResultado(imagens[novaImagemResultado])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={styles.container}>
      {aparecerBotoes &&
        <>
          <h1>Jogos Disponíveis</h1>
          <hr />
          <button onClick={() => {
            setSelecionarJogo("jogo1")
            setAparecerBotoes(false)
          }}>Pedra Papel e Tesoura</button>
          <button onClick={() => {
            setSelecionarJogo("jogo2")
            setAparecerBotoes(false)
          }}>X</button>
        </>
      }


      {selecionarJogo === "jogo1" && 
        <>
          <h1>Pedra, Papel e Tesoura</h1>
          <hr />
          <h3>Teste sua sorte e habilidades em nosso clássico jogo Pedra Papel e Tesoura!! </h3>
          <h3>100% confiável!! Aposte para obter lucros de 180%!!</h3>
          <h4>Digite abaixo o valor que deseja apostar</h4>
          <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}required/>
          {inputValue !== "" &&
          <>
            <h4>Após preencher o valor, selecione sua opção abaixo!</h4>
            <div className={styles.opcoesContainer}>
                {Opcoes.map((opcao) => (
                <img
                    key={opcao}
                    src={imagens[opcao]}
                    alt={opcao}
                    className={styles.opcaoImagem}
                    onClick={() => {
                      if (novoSaldo < 0 || inputValue === 0) {
                        alert("Você não tem saldo suficiente para realizar essa aposta!")
                      } else if (inputValue.trim() !== "") {
                        jogar(opcao)
                        setInputValue("")
                      } else {
                        alert("Digite um valor para aposta antes da transação")
                      }
                    }}
                    disabled={isLoading}
                />
                ))}
            </div>
          </>
          }
          {inputValue === "" && 
            <div className={styles.resultadoContainer}>
                {!isLoading && imagemResultado && <img className={styles.resultadoImagem} src={imagemResultado} alt="Resultado" />}
                {isLoading ? <p className={styles.loading}>Aguarde...</p> : <p className={styles.resultadoTexto}>{resultado}</p>}
                {situacao === "vitoria" && <p>Você ganhou: R$: {ganho} reais</p>}
                {user && (<h3>{user.saldo === 0? "Saldo atualizado: Saldo Zerado": `Saldo atualizado: R$: ${user.saldo} reais`}</h3>)} 
                <button onClick={() => {
                  setSelecionarJogo("")
                  setAparecerBotoes(true)
                }}>Voltar para a tela de jogos</button>
              
            </div>
          }
        </>
      }

      



      
      {selecionarJogo === "jogo2" && 
        <>
        <p>a</p>
        </>
      } 
    </div>
  )
}

export default Apostas