import styles from "./Footer.module.css"


function Footer () {
    return (
        <footer className = {styles.footer}>
            <p className={styles.copy_right}><span>PompeuBet</span>&copy; 2023</p>
        </footer>
    )
}

export default Footer 