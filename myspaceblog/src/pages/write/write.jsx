import "./write.css"
import { useContext,useState } from "react";
import {Context} from "../../context/context"
import axios from "axios";


export default function Write(){
const [title, setTitle] = useState("");
const [desc, setDesc] = useState("");
const [file, setFile] = useState(null);
const { user } = useContext(Context);

const handleSubmit = async (e) => {
  e.preventDefault();
  const newPost = {
    username: user.username,
    title,
    desc,
  };
  if (file) {
    const data =new FormData();
    const filename = Date.now() + file.name;
    data.append("name", filename);
    data.append("file", file);
    console.log(filename);
    newPost.photo = filename;
    try {
      await axios.post("/upload", data);
    } catch (err) {
      console.log(err);
    }
  }
  try {
    const res = await axios.post("/posts", newPost);
    console.log(newPost);
    window.location.replace("/post/" + res.data._id);
  } catch (err) {}
};
  return (
    <div className='write'>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeform" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="fileInput">
            <i className="write-icon fas fa-plus"></i>
          </label>
          <input type="file" id="fileInput" style={{ 'display': 'none' }} 
            onChange={(e) =>{
              setFile(e.target.files[0])
              if(file){
                console.log("file got selected");
              }
            }
            
            }/>
          <input type="text" placeholder="Title" className="write-input" autoFocus={true} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className="write-form-group">
          <textarea placeholder="Tell your story..." type="text" className="write-text write-input" onChange={(e)=>setDesc(e.target.value)}></textarea>
        </div>
        <button className="write-submit" type="submit">Publish</button>

      </form>
    </div>
  )
      }
