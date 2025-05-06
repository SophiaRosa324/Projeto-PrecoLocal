import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Cadastro/Cadastro';
import { Pagina404 } from './Pages/Pagina404/Pagina404';
import { ProdutosPage } from "./Pages/Produtos/ProdutosPage";
import { Contatos } from './Pages/Contatos/Contatos'
import { UserProfile } from './Pages/perfil/UserProfile';
import { RotaPrivada } from './Components/RotaPrivada/RotaPrivada';


function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Register/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ProdutosPage" element={<ProdutosPage />} />
          <Route path="/Contatos" element={<Contatos />} />
          <Route path="/Pagina404" element={<Pagina404 />} />
          <Route path="*" element={<Pagina404 />} />
          <Route path="/perfil" element={<RotaPrivada><UserProfile /></RotaPrivada>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
