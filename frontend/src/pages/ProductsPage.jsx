import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {

  const [products, setProducts] = useState([])
  const {addToCart} = useCart()

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
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  )
}