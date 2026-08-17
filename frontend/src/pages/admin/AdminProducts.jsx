import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { host } from "../../variables";

export default function AdminProducts() {

  const [products, setProducts] = useState([])
  const handleDelete = async (id) => {
    await fetch(`${host}/api/products/${id}`, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    setProducts(products.filter(p => p._id !== id))
  }

  useEffect(() => {
    fetch(`${host}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <Link to={`/admin/products/${product._id}`}>Edit</Link>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}