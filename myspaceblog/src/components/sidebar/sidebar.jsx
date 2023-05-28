import React, { useEffect,useState} from 'react'
import axios from 'axios'
import "./sidebar.css"
import Pic1 from "./my-photo.jpg"
import {Link} from "react-router-dom" 

export default function Sidebar() {
    const [cat,setCat]=useState([])

   useEffect(()=>{
    const fetchCat=async ()=>{
        const res=await axios.get("/categories")
      setCat(res.data)
        }
        fetchCat()
    },[]
   )
   
   const Categories=React.memo(()=>{
return (  <ul className='sidebar-list'>
    {cat.map((cat,i)=>{
    return(<Link to={`/?cat=${cat.name}`} className='link'><li key={i} className='sidebar-list-item'>{cat.name}</li></Link>)
})}
</ul>
)},
[cat])

    return (
        <div className='sidebar'>
            <div className='sidebar-item'>
                <div className='sidebar-title'>ABOUT ME</div>
                <img className='sidePics' src={Pic1} alt='' />
                <p style={{"lineHeight":"24px"}}>I'm Yash Sharma, a passionate web developer skilled in the MERN stack. With expertise in MongoDB, Express.js, React.js, and Node.js, I create dynamic and user-friendly web applications. My latest project is a MERN stack blog website where users can register, login, and share their thoughts through engaging posts. The website features a modern UI, user authentication, post categories, and image uploads. Leveraging technologies like Redux, Axios etc , I've built a responsive and scalable application. 
                    Explore the blog, and I welcome your feedback as I continue to enhance my full-stack development skills.</p>
            </div>
            <div className='sidebar-item'>
                <div className='sidebar-title'>CATEGORIES</div>
               
                   <Categories />
                
            </div>
            <div className='sidebar-item'>
                <div className='sidebar-title'>FOLLOW US</div>
                <div className='sidebar-social'>
                <a href="https://github.com/yashcodewallah" target="_blank" rel="noreferrer" className='link'><i className="top-icon fa-brands fa-github"></i></a>
        <a href="https://www.instagram.com/yashh.shxrma/" target="_blank" className='link' rel="noreferrer"><i className="top-icon fa-brands fa-square-instagram"></i></a>
        <a href=" https://www.linkedin.com/in/yash-sharma-22403120b/" target="_blank" className='link' rel="noreferrer" >  <i className="top-icon fa-brands fa-linkedin"></i></a>
        <a href="https://twitter.com/yashh__sharmaa" target="_blank" className='link' rel="noreferrer"> <i className="top-icon fa-brands fa-twitter"></i></a>
                </div>
            </div>

        </div>
    )
}
