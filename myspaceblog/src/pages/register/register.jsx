import { useState } from "react";
import "./register.css"
import { Link } from "react-router-dom"
import axios from "axios";
export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/register", {
                username,
                email,
                password
            })
         res.data && window.location.replace("/login")
        }catch(err){
            console.log(err);
       setError(true);
        }
    }


    return (
        <div className='register' >
            <form className='register-form' onSubmit={handleSubmit} >

                <h1 className='register-title'>Register</h1>
                <div className="register-form-section">
                    <label>Username</label>
                    <input type="text" placeholder='Enter your username..' 
                    onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="register-form-section">
                    <label>Email</label>
                    <input type="text" placeholder='Enter your email..' 
                    name="email"
                     onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="register-form-section">
                    <label>Password</label>
                    <input type="password" placeholder='Enter your password..' 
                    name="password"  
                    onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button type="submit" className='register-submit'>Register</button>
            {error && <span style={{color:'red',marginTop:'15px'}}>something went wrong</span>}
            </form>
            <button className='login-submit'><Link to="/login">Login</Link></button>
        </div>
    )
}
