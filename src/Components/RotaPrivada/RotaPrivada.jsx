import { useNavigate } from "react-router-dom";

const RotaPrivada = ({ children }) => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  // Se não houver usuário logado, redireciona para o login
  if (!loggedInUser) {
    navigate("/login");
    
  }

  return children;
};

export { RotaPrivada };
