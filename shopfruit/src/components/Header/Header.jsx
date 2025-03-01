import React, { useState } from 'react'
import './Header.css'

const Header = () => {

    const [menu, setMenu] = useState("home")

    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order your favorite fruits here</h2>
                <p>Browse our selection of fresh, seasonal fruits, picked at the peak of ripeness for maximum flavor and freshness. We’re dedicated to providing you with the healthiest and most delicious fruits, making it easy to nourish your body with every order.</p>
                <button onClick={() => setMenu(menu)}>View Menu</button>
            </div>
        </div>
    )
}

export default Header
