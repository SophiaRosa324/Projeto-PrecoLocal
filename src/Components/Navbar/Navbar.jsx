import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={style.header}>
      <h1 className={style.logo} >PreçoLocal</h1>

      <nav className={`${style.nav} ${menuOpen ? style.open : ""}`}>
        <Link to="/" onClick={closeMenu}>Início</Link> 
        <Link to="/ProdutosPage" onClick={closeMenu}>Categorias</Link>
        <Link to="/Comparador" onClick={closeMenu}>Produtos</Link>
        <Link to="/perfil" onClick={closeMenu}>Perfil</Link>
        <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
        <Link to="/Login" onClick={closeMenu}>Login</Link>
        <Link to="/Contatos" onClick={closeMenu}>Contato</Link>
        
      </nav>

      <button className={style.menuButton} onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

export {Navbar};
