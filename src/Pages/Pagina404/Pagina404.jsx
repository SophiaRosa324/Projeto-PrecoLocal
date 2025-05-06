import style from './Pagina404.module.css';
import { Link } from 'react-router-dom';

const Pagina404 = () => {
  return (
    <div className={style.Pagina404}>
      <h1>Erro 404</h1>
      <p>Página não encontrada.</p>
      <Link to="/">Voltar para o início</Link>
    </div>
  );
};

export { Pagina404 };