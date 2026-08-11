import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

export default function CheckoutPage() {
  
    const navigate = useNavigate()
    const {items} = useCart()
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")


    const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({customerName: name, customerAddress: address, items: items, totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0)})
    })
    navigate("/confirmation")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Place order</button>
    </form>
  )
}