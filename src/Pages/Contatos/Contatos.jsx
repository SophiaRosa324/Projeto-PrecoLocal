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
            <h2>Sophia Rosa</h2>
            <p><strong>Email:</strong> <a href="mailto:sophiarsm8@gmail.com">sophiarsm8@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/ana-souza" target="_blank" rel="noopener noreferrer">linkedin.com/in/ana-souza</a></p>
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Beatriz Andrade" className={style.devPhoto} />
            <h2>Beatriz Andrade</h2>
            <p><strong>Email:</strong> <a href="mailto:BeatrizAndrade@gmail.com">BeatrizAndrade@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/carlos-lima" target="_blank" rel="noopener noreferrer">linkedin.com/in/carlos-lima</a></p>
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Matheus Sprengel" className={style.devPhoto} />
            <h2>Matheus Sprengel</h2>
            <p><strong>Email:</strong> <a href="mailto:MatheuSprengel@gmail.com">MatheuSprengel@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/juliana-ribeiro" target="_blank" rel="noopener noreferrer">linkedin.com/in/juliana-ribeiro</a></p>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export { Contato };
