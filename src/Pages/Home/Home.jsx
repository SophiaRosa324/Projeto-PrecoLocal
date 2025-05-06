import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStore } from 'react-icons/fa';
import style from './Home.module.css';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Rodape } from '../../Components/Rodape/Rodape';
import { useProdutos } from '../../hooks/useProdutos';

const Home = () => {
  const { produtos, loading } = useProdutos();
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  return (
    <div className={style.homeContainer}>
      <Navbar />

      {/* Hero Section */}
      <section className={style.hero}>
        <h2>Compare preços nas lojas perto de você</h2>
        <p>Descubra onde comprar mais barato na sua região com apenas alguns cliques.</p>

        {!token && (
          <button
            className={style.heroButton}
            onClick={() => navigate('/Cadastro')}
          >
            Comece agora
          </button>
        )}

        <br /><br />
        <input
          type="text"
          placeholder="Digite o nome de um produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={style.searchInput}
        />
        <button className={style.searchButton}>Buscar</button>
      </section>

      {/* Pré-visualização de produtos */}
      {!loading && (
        <section className={style.previewSection}>
          <h3>Alguns produtos disponíveis:</h3>
          <div className={style.previewGrid}>
            {produtos.slice(0, 3).map(produto => (
              <div key={produto.id} className={style.previewCard}>
                <img src={produto.image} alt={produto.title} className={style.previewImage} />
                <h4>{produto.title}</h4>
                <p>R$ {produto.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Como funciona */}
      <section id="como-funciona" className={style.howItWorks}>
        <h2>Como funciona?</h2>
        <div className={style.steps}>
          <div className={style.step}>
            <FaSearch className={style.icon} />
            <p className={style.stepText}>1. Digite o produto que deseja encontrar.</p>
          </div>
          <div className={style.step}>
            <FaMapMarkerAlt className={style.icon} />
            <p className={style.stepText}>2. Permitimos acesso à sua localização.</p>
          </div>
          <div className={style.step}>
            <FaStore className={style.icon} />
            <p className={style.stepText}>3. Mostramos os preços das lojas físicas próximas.</p>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  );
};

export { Home };
