import styles from "./Modal.module.css";

export const Modal = ({ produto, onClose }) => {
  if (!produto) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2>{produto.title}</h2>
        <p>{produto.description}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};
