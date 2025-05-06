const API_URL = "http://localhost:4000/api/auth";

export const registerUser = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return { message: "Erro de rede" };
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Erro no login:", err);
    return { message: "Erro de rede" };
  }
};