import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Header from "./components/header/Header"
import "./components/header/header.jpg"
import Home from "./components/pages/Home"
import Apostas from './components/pages/Apostas';
import Listagem from './components/pages/Listagem';
import SaqueDeposito from './components/pages/SaqueDeposito';
import MeuPerfil from './components/pages/MeuPerfil';
import Footer from './components/header/Footer';



function App() {
  return (
      <Router>
        <Header/>
        <div className='container' >
        <Routes>
          <Route path = "/" element ={<Home/>}></Route>
          <Route path = "/apostas" element ={<Apostas/>}></Route>
          <Route path = "/listagem" element ={<Listagem/>}></Route>
          <Route path = "/saquedeposito" element ={<SaqueDeposito/>}></Route>
          <Route path = "/perfil" element ={<MeuPerfil/>}></Route>
        </Routes>
        </div>
        <Footer/>
      </Router>
  )
}

export default App;
