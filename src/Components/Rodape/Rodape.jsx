import style from './Rodape.module.css';
import { Link } from 'react-router-dom';

const Rodape = () => {
  return (
    <div className={style.Rodape}>
        <footer id="contato" className={style.footer}>
                &copy; 2025 PreçoLocal. Todos os direitos reservados.
        </footer>
    </div>
  );
};

export { Rodape };