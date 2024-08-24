import HeaderUI from "./components/header/HeaderUI"
import Home from "./components/home/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import Register from "./components/authorisation/Register"
import About from "./components/about/About"
import Confirm from "./components/authorisation/Confirm"
import Cabinet from "./components/cabinet/Cabinet"
import Login from "./components/authorisation/Login"
import { useAppDispatch } from "./app/hooks"
import { useEffect } from "react"
import { authUser } from "./features/users/userSlice"
import AdminPanel from "./components/admin/AdminPanel"
import EditUserPrifileAdmin from "./components/admin/EditUserPrifileAdmin"
import "./App.css"
import EditProfile from "./components/cabinet/EditProfile"
import Footer from "./components/Footer"
import Chat from "./components/foo/chat/Chat"
import Avatar from "./components/cabinet/Avatar"

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [])
  
  return (
    <div className="">
      <HeaderUI />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-user/:userId" element={<EditUserPrifileAdmin />} />
        <Route path="/edit-profile/:userId" element={<EditProfile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
