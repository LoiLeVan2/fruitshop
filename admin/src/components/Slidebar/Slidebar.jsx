import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/admin_assets/assets'
import './Slidebar.css'

const Slidebar = () => {
    return (
        <div className='slidebar'>
            <div className="slidebar-options">
                <NavLink to='/add' className="slidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="slidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="slidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Slidebar
