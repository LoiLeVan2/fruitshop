import axios from "axios"
import React, { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <div className="password-input">
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                    </div>
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition" required>
                    <input type="checkbox" id="terms-checkbox" required />
                    <label for="terms-checkbox">By continuing, I agree to the terms of use & privacy policy</label>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup