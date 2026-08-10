import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

export default function CartPage() {
  
  const navigate = useNavigate()
  const {items, removeFromCart} = useCart()


  return (
    <div>
      {items.map(item => (
        <div key={item.productId}>
          <h2>{item.name}</h2>
          <p>${item.price}</p>
          <button onClick={() => removeFromCart(item.productId)}>Remove from cart</button>
        </div>
      ))}
      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  )
}