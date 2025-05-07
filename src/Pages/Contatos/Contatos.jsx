import style from "./Contatos.module.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { Rodape } from "../../Components/Rodape/Rodape";

import Imgtemp from "../../assets/imgtempoperfil.avif";


const Contato = () => {
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <h1>Contato dos Desenvolvedores</h1>
        <p>Entre em contato com um dos membros da equipe:</p>

        <div className={style.cardContainer}>
          <div className={style.card}>
            <img src={Imgtemp} alt="Sophia Rosa" className={style.devPhoto} />
            <h2>Ana Souza</h2>
            <p><strong>Email:</strong> <a href="mailto:sophiarsm8@gmail.com">sophiarsm8@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ana-souza" target="_blank" rel="noopener noreferrer">linkedin.com/in/ana-souza</a></p>
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Carlos Lima" className={style.devPhoto} />
            <h2>Carlos Lima</h2>
            <p><strong>Email:</strong> <a href="mailto:carlos.lima@email.com">carlos.lima@email.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/carlos-lima" target="_blank" rel="noopener noreferrer">linkedin.com/in/carlos-lima</a></p>
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Juliana Ribeiro" className={style.devPhoto} />
            <h2>Juliana Ribeiro</h2>
            <p><strong>Email:</strong> <a href="mailto:juliana.ribeiro@email.com">juliana.ribeiro@email.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/juliana-ribeiro" target="_blank" rel="noopener noreferrer">linkedin.com/in/juliana-ribeiro</a></p>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export { Contato };
