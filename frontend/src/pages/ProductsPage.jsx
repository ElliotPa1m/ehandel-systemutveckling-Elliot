import { useState, useEffect } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button>Add to cart</button>
        </div>
      ))}
    </div>
  )
}