import { useState } from "react";
import { useProdutos } from "../../hooks/useProdutos";
import { CategoryFilter } from "../Categorias/Categorias";
import {ProductCard} from "../Categorias/ProductCard";
import styles from './ProdutosPage.module.css';
import { Navbar } from "../../Components/Navbar/Navbar";
import { Rodape } from "../../Components/Rodape/Rodape";

const ProdutosPage = () => {
  const { produtos, loading } = useProdutos();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  if (loading) return <p>Carregando produtos...</p>;

  const categorias = ["Todos", ...new Set(produtos.map(p => p.category))];

  const produtosFiltrados = categoriaSelecionada === "Todos"
    ? produtos
    : produtos.filter(p => p.category === categoriaSelecionada);

  return (
    <>
    <Navbar/>
        <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <div className={styles.filtros}>
        {categorias.map((cat, i) => (
          <button key={i} onClick={() => setCategoriaSelecionada(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.produtos}>
        {produtosFiltrados.map(p => (
          <div key={p.id} className={styles.card}>
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>{p.category}</p>
            <p><strong>R$ {p.price.toFixed(2)}</strong></p>
          </div>
        ))}
      </div>
    </div>

    <Rodape/>
    </>
  );
};

export {ProdutosPage};