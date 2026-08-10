import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext()

export function CartProvider({children}) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        fetch("http://localhost:5000/api/cart", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => res.json())
        .then(data => setItems(data.items || []))
    }, [])

    const addToCart = async (product) => {
        const newItems = [...items, {productId: product._id, name: product.name, price: product.price, quantity: 1}]
        setItems(newItems)
        await fetch("http://localhost:5000/api/cart", {
            method: "PUT",
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
            body: JSON.stringify({items: newItems})
        })

    }

    const removeFromCart = async (productId) => {
        const newItems = items.filter(item => item.productId !== productId)
        setItems(newItems)
        await fetch("http://localhost:5000/api/cart", {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ items: newItems })
        })

    }

    return (
        <CartContext.Provider value={{items, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)