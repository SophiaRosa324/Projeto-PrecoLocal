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
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Beatriz Andrade" className={style.devPhoto} />
            <h2>Beatriz Andrade</h2>
            <p><strong>Email:</strong> <a href="mailto:beatrizandrade020409@gmail.com">beatrizandrade020409@gmail.com</a></p>
          </div>

          <div className={style.card}>
            <img src={Imgtemp} alt="Matheus Sprengel" className={style.devPhoto} />
            <h2>Matheus Sprengel</h2>
            <p><strong>Email:</strong> <a href="mailto:matheussprengel@gmail.com">matheussprengel@gmail.com</a></p>
          </div>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export { Contato };
