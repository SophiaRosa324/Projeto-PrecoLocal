import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importa a biblioteca jwt-decode para decodificar o token JWT

export const RotaPrivada = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("Token não encontrado. Redirecionando para login.");
    return <Navigate to="/Login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tempo atual em segundos

    console.log("Token decodificado:", decodedToken);
    console.log("Tempo atual:", currentTime, "Expiração do token:", decodedToken.exp);

    if (decodedToken.exp < currentTime) {
      console.log("Token expirado. Redirecionando para login.");
      localStorage.removeItem("token"); // Remove o token expirado
      return <Navigate to="/Login" />;
    }

    console.log("Token válido. Acesso permitido.");
    return children;
  } catch (error) {
    console.log("Erro ao decodificar o token. Redirecionando para login.", error);
    localStorage.removeItem("token"); // Remove o token inválido
    return <Navigate to="/Login" />;
  }
};