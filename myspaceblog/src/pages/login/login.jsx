import "./login.css"
import { useContext, useRef, useState} from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { Context } from "../../context/context";
export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
     const [error,setError]=useState(false)  
    const { dispatch, isFetching } = useContext(Context);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        setError(true)
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };
  
    return (
        <div className='login'>
            <form className='login-form' onSubmit={handleSubmit}>

                <h1 className='login-title'>Login</h1>
                <div className="login-form-section">
                    <label>Email</label>
                    <input type="text" placeholder='Enter your email'  ref={userRef} ></input>
                </div>
                <div className="login-form-section">
                    <label>Password</label>
                    <input type="password" placeholder='Enter your password'  ref={passwordRef}></input>
                </div>
                {/* <button className='login-submit'>Login</button> */}
                <button className="login-button" type="submit" disabled={isFetching}>Login</button>
                 {error && <p style={{"color":"red","fontWeight":"bold","marginTop":"15px"}}>USER NOT FOUND</p>}
            </form>

            <button className='register-button'> <Link to="/register">Register</Link></button>
        </div>
    )
}
