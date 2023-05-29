import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import "./topbar.css"
import tempProfilePic from "../../components/images/temp.png"
import { Context } from '../../context/context';
export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const PF="https://mernblog-bmj3.onrender.com/images/"

  return (
    <div className='tb-cont'>
      <div className='tb-lf'>
        <a href="https://github.com/yashcodewallah" target="_blank" className='link' rel="noreferrer"><i className="top-icon fa-brands fa-github"></i></a>
        <a href="https://www.instagram.com/yashh.shxrma/" target="_blank" className='link' rel="noreferrer"><i className="top-icon fa-brands fa-square-instagram"></i></a>
        <a href=" https://www.linkedin.com/in/yash-sharma-22403120b/" target="_blank" className='link' rel="noreferrer">  <i className="top-icon fa-brands fa-linkedin"></i></a>
        <a href="https://twitter.com/yashh__sharmaa" target="_blank" className='link' rel="noreferrer"> <i className="top-icon fa-brands fa-twitter"></i></a>
      </div>

      <div className='tb-mid'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link className="link" to="/">HOME</Link></li>
          <li className='topListItem'> <Link to="/">ABOUT</Link></li>
          <li className='topListItem' ><Link to="/contact">CONTACT</Link></li>
          <li className='topListItem'><Link className="link" to="/write">WRITE</Link></li>
          <li className='topListItem' onClick={handleLogout}>{user ? "LOGOUT" : " "}</li>
        </ul>
      </div>
      <div className='tb-rg' style={user?{'justifyContent':'center','gap':'20px'}:{}}>
        {user ?
            <Link to="/settings" ><img className='top-img' src={user.profilePic? PF+user.profilePic: tempProfilePic} alt=""></img></Link>
             :
         <>
          <li className='topListItem'><Link className="link" to="/login">LOGIN</Link></li>
          <li className='topListItem'><Link className="link" to="/register">REGISTER</Link></li>
         </>
      }
      <i className="fa-solid fa-magnifying-glass top-search"></i>

      </div>
    </div>
  )
}
