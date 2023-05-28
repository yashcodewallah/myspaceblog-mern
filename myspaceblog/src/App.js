import Topbar from "./components/topbar/topbar"
import Home from './pages/home/home';
import Single from "./pages/single/single"
import Write from './pages/write/write';
import Settings from './pages/settings/settings'
import Login from './pages/login/login';
import Contact from "./pages/contact/contact";
import Register from './pages/register/register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Context } from "./context/context";
import './App.css';


function App() {
  const { user } = useContext(Context);

  return (
    <>
    <Router>
      <Topbar />
      <Routes>
        {/* <Single/> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={user ? <Home /> : <Register />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/post/:id" element={<Single />}></Route>
        <Route path="/write" element={user ? <Write /> : <Login />}></Route>
        <Route path="/settings" element={user ? <Settings /> : <Login />}></Route>
        <Route path="/contact" element={<Contact /> } ></Route>
      </Routes>
      {/* <Home /> */}

      {/* <Write/> */}
      {/* <Settings/> */}
      {/* <Login /> */}
      {/* <Register /> */}
    </Router>
    </>
  );
}
export default App;
