import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import styles from "./UserProfile.module.css";
import { Navbar } from "../../Components/Navbar/Navbar";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Busca o token do localStorage e decodifica os dados do usuário
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({
          nome: decodedToken.nome, // Nome do usuário
          email: decodedToken.email,
          profilePicture: "/default-avatar.png",
          favoriteMarkets: decodedToken.favoriteMarkets || [],
        });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && user) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePicture: imageUrl });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token
    navigate("/login");
  };

  if (!user) {
    return (
      <div className={styles.pageBackground}>
        <Navbar />
        <div className={styles.profileContainer}>
          <p style={{ color: "white" }}>Carregando dados do usuário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <Navbar />
      <main className={styles.profileContainer}>
        <h1 className={styles.title}>Perfil do Usuário</h1>

        <section className={styles.profileContent}>
          <div className={styles.profilePictureSection}>
            <img
              src={user.profilePicture || "/default-avatar.png"}
              alt="Foto de perfil"
              className={styles.profilePicture}
            />
            <label className={styles.changePhotoLabel}>
              Alterar foto
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className={styles.hiddenInput}
              />
            </label>
          </div>

          <div className={styles.userInfo}>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </section>

        <section className={styles.favoritesSection}>
          <h2>Mercados Favoritos</h2>
          <ul className={styles.marketList}>
            {user.favoriteMarkets?.map((market, index) => (
              <li key={index} className={styles.marketItem}>
                {market}
              </li>
            ))}
          </ul>
        </section>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </main>
    </div>
  );
}

export { UserProfile };