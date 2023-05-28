import { useContext,useState } from "react"
import "./contact.css"
import { Context } from "../../context/context"
import axios from "axios";

export default function Contact() {
const {user}=useContext(Context);

const [name,setName]=useState("")

const [email,setEmail]=useState("")

const [message,setMessage]=useState("")


const handleSubmit=async (e)=>{
  e.preventDefault()
  if(user){
  const newQuery={
      username:user.username,
      name,
      email,
      message
  }
  try{
await axios.post("/query/"+user._id,newQuery)
window.location.replace("/")
alert("new query sent")
}
  catch(err){}
}else{
  window.location.replace("/login")
}
}



  return (
      <div className="contactContainer">

<header>
    <h1 className="title">My Blog</h1>
  </header>
  <main>
    <section className="sectionContainer">
      <h2 className="pageTitle">Contact</h2>
      <p className="class-query">If you have any questions or suggestions, feel free to reach out to us using the form below:</p>
      <form className="form" onSubmit={handleSubmit}>
        <label for="name" className="formLabel">Name:</label>
        <input type="text" id="name" name="name" className="textInput" onChange={(e)=>setName(e.target.value)} required autoFocus={true} />
        <label for="email" className="formLabel">Email:</label>
        <input type="email" id="email" name="email" className="textInput" onChange={(e)=>setEmail(e.target.value)} required />
        <label for="message" className="formLabel">Message:</label>
        <textarea id="message" name="message" className="textInput" required onChange={(e)=>setMessage(e.target.value)}></textarea>
        <button type="submit" className="submitButton">Send</button>
      </form>
    </section>
  </main>
  <footer className="footerContainer">
    <p>&copy; 2023 My Blog. All rights reserved.</p>
  </footer>
      </div>
    )
  }
  