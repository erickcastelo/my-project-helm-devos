import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — R$ {Number(p.price).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
