import styles from "./UrubuDoPix.module.css"
import Urubu from "./urubupix.jpg"
import QRCode from "react-qr-code"
import { useState } from "react"

function UrubuDoPix() {
    const [valor, setValor] = useState(10)
    const [qrCodeValue, setQRCodeValue] = useState("");
    const [showQRCode, setShowQRCode] = useState(false);
    const [input, setInput] = useState("")

    function createQrCode(valor) {
        setQRCodeValue(valor);
        setShowQRCode(true);
    }

    function resetForm() {
        setValor(10);
        setInput("");
        setShowQRCode(false);
    }

    return (
        <div className={styles.urubu_container}>
            <h1>Urubu Do Pix</h1>
            <h3>Tenha lucros inimagináveis!</h3>
            <h4>Consulte a tabela do pix, e faça já sua transação para tirar seus planos do papel!!</h4>
            <div className={styles.transacao}>
                <div className={styles.img}><img src={Urubu} alt="tabela" /></div>
                <div className={styles.pix}>
                    <h2>Transação</h2>
                    {showQRCode ? (
                        <>
                            <h3>Você receberá R$ {valor * 10} reais!!! </h3>
                            <QRCode value={qrCodeValue} size={200} />
                            <h4>Após o pagamento do pix, favor aguardar até 30 minutos para que o dinheiro seja depositado no pix informado acima.</h4>
                            <button onClick={resetForm}>Fazer outro depósito</button>
                        </>
                    ) : (
                        <>
                            <h4>Selecione o valor do depósito:</h4>
                            <label>Valor selecionado: R$ {valor}</label>
                            <input className={styles.customRange} type="range" min="10" max="500" value={valor} onChange={(e) => setValor(e.target.value)} />
                            {valor !== 10 ? (
                                <form className={styles.formPix}>
                                    <h3>Você receberá R$ {valor * 10} reais!!! </h3>
                                    <h4>Digite seu código pix para depósito:</h4>
                                    <input className={styles.inputPix} type="text" placeholder="Digite seu código pix" value={input} onChange={(e) => setInput(e.target.value)} required />
                                    {input === "" && (
                                        <p>Digite o seu código pix para finalizar!</p>
                                    )}
                                    {input !== "" && (
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            createQrCode(valor.toString())
                                        }}>Confirmar Pedido</button>
                                    )}
                                </form>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UrubuDoPix
