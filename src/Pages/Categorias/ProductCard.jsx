const ProductCard = ({ produto }) => (
    <div className="card">
      <img src={produto.image} alt={produto.title} className="product-img" />
      <h3>{produto.title}</h3>
      <p>{produto.category}</p>
      <p><strong>R$ {produto.price.toFixed(2)}</strong></p>
    </div>
  );
  
  export {ProductCard};  