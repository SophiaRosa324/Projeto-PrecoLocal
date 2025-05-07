import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Verifica se o token existe no localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Define como true se o token existir
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false); // Atualiza o estado de autenticação
    closeMenu();
    navigate("/Login"); // Redireciona para a página de login
  };

  return (
    <header className={style.header}>
      <h1 className={style.logo}>PreçoLocal</h1>

      <nav className={`${style.nav} ${menuOpen ? style.open : ""}`}>
        <Link to="/" onClick={closeMenu}>Início</Link>
        <Link to="/ProdutosPage" onClick={closeMenu}>Categorias</Link>
        <a href="#como-funciona" onClick={closeMenu}>Como funciona</a>
        <Link to="/Contatos" onClick={closeMenu}>Contato</Link>

        {isAuthenticated ? (
          <>
            <Link to="/perfil" onClick={closeMenu}>Perfil</Link>
            <button className={style.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/Login" onClick={closeMenu}>Login</Link>
        )}
      </nav>

      <button className={style.menuButton} onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  );
};

export { Navbar };