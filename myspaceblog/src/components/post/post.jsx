import "./post.css"
import { Link } from "react-router-dom"
import tempPhoto from "../../components/images/image.png"
export default function post({ post }) {

  const PF = "http://localhost:5000/images/"

  console.log(post);
  return (
    <div className="post">
      {post.photo ?
       <img className="postImg" src={PF + post.photo} alt=" " /> :
       <img className="postImg" src={tempPhoto} alt=" " /> }
      <div className="post-info">
        <div className="post-cats" >
          {post.categories && post.categories.map((cat, index) => {
            return (<span className="post-cat" key={index}>{cat}</span>)
          })}
        </div>
        <Link to={`/post/${post._id}`}> <span className="post-title">{post.title}</span></Link>
        <hr />
        <span className="post-date">{new Date(post.createdAt).toDateString()}</span>
        <p className="post-desc">{post.desc}</p>
      </div>
    </div>
  )
}
