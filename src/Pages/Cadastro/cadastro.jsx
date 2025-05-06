import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import style from "./Cadastro.module.css"; 
import { Navbar } from '../../Components/Navbar/Navbar';
import { Rodape } from '../../Components/Rodape/Rodape';

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    const newUser = {
      nome: nome,
      email: email,
      password: senha // Usar "password" para bater com o PHP
    };

    try {
      console.log("Enviando dados:", newUser);
      const response = await fetch("http://localhost/vite-project/src/Pages/Cadastro/Cadastrar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setErrorMessage("Erro ao conectar ao servidor.");
    }
  };

  return (
    <>
      <Navbar/>
      <div className={style.background}>
        <div className={style.container}>
          <h1 className={style.title}>Crie sua conta</h1>

          <div className={style.inputField}>
            <input
              type="text"
              placeholder="Nome completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <FaUser className={style.icon} />
          </div>

          <div className={style.inputField}>
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className={style.icon} />
          </div>

          <div className={style.inputField}>
            <input
              type="password"
              placeholder="Senha"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FaLock className={style.icon} />
          </div>

          {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}

          <button onClick={handleRegister} className={style.button}>Cadastrar</button>

          <div className={style.signupLink}>
            <p>Já tem uma conta? <Link to="/login">Entrar</Link></p>
          </div>
        </div>
      </div>
      <Rodape/>
    </>
  );
};

export { Register };
