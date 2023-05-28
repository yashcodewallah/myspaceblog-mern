import "./singlepost.css";
import { Link } from 'react-router-dom'
import axios from "axios"
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";

export default function Singlepost() {

    const { user } = useContext(Context)
    let { id } = useParams();
    const [post, setPost] = useState({})
    const PF = "http://localhost:5000/images/"
    const [title, setTitle] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const [desc, setDesc] = useState("")


    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/posts/" + id)
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }

        fetchPost()
    }, [id])

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + id, {
                data: { username: user.username }
            }
            )
            window.location.replace("/")
        } catch (err) { }
    }

const handleSave=async()=>{
    setUpdateMode(false)
    try{
        await axios.put("/posts/"+id,{username:user.username,
            title:title,
        desc:desc,
        })
        setUpdateMode(false)
    }catch(err){}
}

    return (
        <div className="singlepost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlepost-img" />
                )}
                <div >
                    {updateMode ? <input type="text" placeholder="Enter new title" 
                    value={title} 
                    onChange={(e)=>setTitle(e.target.value)} 
                    className="write-input" ></input> : <h1 className="singlepost-title">{title}</h1>}

                    {post.username === user?.username && !updateMode && (
                        <div className="singlepost-edit">
                            <i className="singlepost-icon fa-regular fa-edit" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlepost-icon far fa-trash-alt" onClick={handleDelete}></i>
                        </div>
                    )}
                </div>

                <div className="singlepost-info">
                    <span className="singlepost-author">Author: <Link to={`/?user=${post.username}`} ><b>{post.username}</b></Link></span>
                    <span className="singlepost-date">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ?
                    <textarea className="write-text write-input" placeholder="ENTER NEW DESCRIPTION" value={desc} onChange={(e)=>setDesc(e.target.value)} ></textarea>
                    :
                    <p className="singlepost-desc">
                        {desc}
                    </p>}
                    {updateMode ? <button className="saveButton" onClick={handleSave}>save</button> : null}

            </div>
        </div>

    )
}
