import { Navbar } from '../../Components/Navbar/Navbar';
import style from './Contatos.module.css';
import { Link } from 'react-router-dom';
import { Rodape } from "../../Components/Rodape/Rodape";

const Contatos = () => {
  return (
    <>
    <Navbar/>
    <div className={style.Contato}>
        <h1>Contatos</h1>
    </div>
    <Rodape/>
    </>
  );
};

export { Contatos };