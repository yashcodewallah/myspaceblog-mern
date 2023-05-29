const express=require("express")
const mongoose  = require("mongoose");
const app=express();
const Auth=require("./routes/auth")
const dotenv = require("dotenv");
const UserRoute=require("./routes/users")
const PostRoute=require("./routes/posts")
const QueryRoute=require("./routes/queries")

const CatRoute=require("./routes/categories")
const multer=require("multer")
const path=require("path")
const cors=require("cors")
app.use(cors()) 

app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
 
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
    });
  
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "images");
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    });
    
    const upload = multer({ storage: storage });
    app.post("/api/upload", upload.single("file"), (req, res) => {
      res.status(200).json("File has been uploaded");
    });
    


app.use("/api",Auth)
app.use("/api/users",UserRoute)
app.use("/api/posts",PostRoute)
app.use("/api/categories",CatRoute)
app.use("/api/query",QueryRoute)
app.listen(5000,()=>{
    console.log("server is working"); 
}) 