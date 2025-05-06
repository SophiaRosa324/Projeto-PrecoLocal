import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import style from "./Login.module.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Rodape } from "../../Components/Rodape/Rodape";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/acesso.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      const data = await response.json();

      if (data.success) {
        
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso!");
        navigate("/home");
      } else {
        setErrorMessage(data.message || "Falha no login.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErrorMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.background}>
        <div className={style.container}>
          <h1 className={style.title}>Acesse o sistema</h1>

          <form onSubmit={handleLogin}>
            <div className={style.inputField}>
              <input
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className={style.icon} />
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

            <div className={style.recallForget}>
              <label>
                <input type="checkbox" />
                Lembre de mim
              </label>
              <a href="#">Esqueceu sua senha?</a>
            </div>

            {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}

            <button type="submit" className={style.button}>Login</button>
          </form>

          <div className={style.signupLink}>
            <p>
              Não tem uma conta? <Link to="/cadastro">Registrar</Link>
            </p>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export { Login };
