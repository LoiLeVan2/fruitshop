import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = [
                { id: "home", offset: document.getElementById("home")?.offsetTop || 0 },
                { id: "explore-menu", offset: document.getElementById("explore-menu")?.offsetTop || 0 },
                { id: "app-download", offset: document.getElementById("app-download")?.offsetTop || 0 },
                { id: "footer", offset: document.getElementById("footer")?.offsetTop || 0 },
            ];

            const scrollPosition = window.scrollY + 350;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollPosition >= sections[i].offset) {
                    setMenu(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleHomeClick = () => {
        setMenu("home");
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>
            <ul className="navbar-menu">
                <li>
                    <Link to='/' onClick={handleHomeClick} className={menu === "home" ? "active" : ""}>
                        Home
                    </Link>
                </li>
                <li>
                    <a href='#explore-menu' className={menu === "explore-menu" ? "active" : ""}>
                        Menu
                    </a>
                </li>
                <li>
                    <a href='#app-download' className={menu === "app-download" ? "active" : ""}>
                        Mobile - App
                    </a>
                </li>
                <li>
                    <a href='#footer' className={menu === "footer" ? "active" : ""}>
                        Contact Us
                    </a>
                </li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    );
};

export default Navbar;
