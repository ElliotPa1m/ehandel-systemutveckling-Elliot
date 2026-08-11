import { useLocation } from "react-router-dom"

export default function ConfirmationPage() {
  
  const location = useLocation()
  const order = location.state?.order
  if (!order) return <p>No order found</p>

  return (
    <div>
    <h2>Thank you for your order!</h2>
      {order.items.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p>${item.price}</p>
        </div>
      ))}
      <p>Total: ${order.totalPrice}</p>
    </div>
  )
}