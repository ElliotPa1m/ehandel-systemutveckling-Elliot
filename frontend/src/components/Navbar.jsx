import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Navbar() {
    return(
        <nav className="navbar">
            <img src={logo} alt="logo"/>
            <Link className="cart-link" to="/cart">Cart</Link>
        </nav>
    )
}