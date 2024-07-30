import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import axios from "axios";
function Header ({ atualizarSaldo }) {

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [saldoAtual, setSaldoAtual] = useState(user ? user.saldo : 0)

    const idUser = 102

    useEffect(() => {
        axios
          .get(`http://localhost:8080/user/${idUser}`)
          .then(response => {
            setUser(response.data)
            setSaldoAtual(response.data.saldo)
            setIsLoading(false)
          })
          .catch(error => {
            console.log(error)
          })
      }, )
    

    return(
        <div id = "header">
            <h1 id = "tituloHeader">PompeuBet</h1>
            <h2 id = "subtituloHeader">A sua plataforma de Apostas</h2>
            <p id = "saldo">{user && user.saldo === 0 ? "Saldo zerado" : (user && `Saldo: R$ ${user.saldo} reais`)}</p>
            <div id = "catalogo">
                <li className = "homePage">
                    <Link className = "homePage" to ="/">Home</Link>
                </li>
                <li className = "homePage">
                    <Link className = "homePage" to ="/apostas">Apostas</Link>
                </li>
                <li className = "homePage">
                    <Link className = "homePage" to ="/saquedeposito">Saque/Depósito</Link>
                </li>
                <li className = "homePage">
                    <Link className = "homePage" to ="/perfil">Meu Perfil</Link>
                </li>
            </div>
        </div>
    )
}

export default Header