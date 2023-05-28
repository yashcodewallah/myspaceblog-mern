import "./settings.css";
import Sidebar from "../../components/sidebar/sidebar";
import tempProfilePic from "../../components/images/temp.png"
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import axios from "axios";

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "https://mernblog-bmj3.onrender.com/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
            }
        }
        try {
            console.log(user._id);
            console.log(updatedUser);
            const res = await axios.put("/users/" + user._id, updatedUser);
            console.log(res.data);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            console.log("error is here");

            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete("/users/" + user._id, { data: { userId: user._id } })
            dispatch({ type: "LOGOUT" });
            window.location.replace("/login")
        } catch (err) { }
    }




    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={handleDeleteAccount}>Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : (user.profilePic ? PF + user.profilePic : tempProfilePic)}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}