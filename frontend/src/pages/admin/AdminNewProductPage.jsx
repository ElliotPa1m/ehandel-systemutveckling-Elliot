import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminNewProductPage() {

const [name, setName] = useState("")
const [age, setAge] = useState("")
const [description, setDescription] = useState("")
const [price, setPrice] = useState("")
const [imageUrl, setImageUrl] = useState("")
const [category, setCategory] = useState("")
const navigate = useNavigate()

const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({name, age: Number(age), description, price: Number(price), imageUrl, category})
    })
    navigate("/admin/products")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}></input>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
      <input type="text" placeholder="Image" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}></input>
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
      <button type="submit">Create</button>
    </form>
  )
}