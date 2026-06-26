import { Link } from "react-router-dom"

export default function AdminPage() {
  return (
    <div>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/products/new">Add new product</Link>
      <Link to="/admin/orders">Orders</Link>
    </div>
  )
}