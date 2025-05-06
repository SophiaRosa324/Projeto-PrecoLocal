const CategoryFilter = ({ categorias, onSelect }) => (
  <div className="filtros">
    {categorias.map((cat, index) => (
      <button key={index} onClick={() => onSelect(cat)}>
        {cat}
      </button>
    ))}
  </div>
);

export {CategoryFilter};