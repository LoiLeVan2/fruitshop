import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFoodList, setFilteredFoodList] = useState([]);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    useEffect(() => {
        if (location.pathname === "/") {
            setMenu("home");
        } else {
            setMenu("");
        }
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname !== "/") return;

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
    }, [location.pathname]);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredFoodList([]);
        } else {
            setFilteredFoodList(food_list.filter(food =>
                food.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, food_list]);

    const handleHomeClick = () => {
        setMenu("home");
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <Link to='/' onClick={handleHomeClick}>
                <img src={assets.logo} alt="logo" className="logo" />
            </Link>
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
                <div className="navbar-search">
                    <img src={assets.search_icon} alt="search" className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => { if (!searchQuery) setFilteredFoodList([]); }}
                    />
                    {searchQuery && filteredFoodList.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {filteredFoodList.map((food) => (
                                    <li key={food._id}>
                                        <Link to={`/product/${food._id}`}>{food.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="cart" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;
