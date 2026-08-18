import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { host } from "../variables"
import Navbar from "../components/Navbar";

export default function CheckoutPage() {
  
    const navigate = useNavigate()
    const {items} = useCart()
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")


    const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`${host}/api/orders`, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({customerName: name, customerAddress: address, items: items, totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0)})
    })
    const data = await response.json()
    navigate("/confirmation", {state: {order: data}})
  }

  return (
    <div>
    <Navbar />
    <form className="login-form" onSubmit={handleSubmit}>
      <input className="input-field" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input-field" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="login-btn" type="submit">Place order</button>
    </form>
    </div>
  )
}