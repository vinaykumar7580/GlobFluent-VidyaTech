import { Route, Routes } from "react-router-dom"
import Register from "../Pages/Register"
import Login from "../Pages/Login"
import UserDashboard from "../Pages/UserDashboard"
import AdminDashboard from "../Pages/AdminDashboard"
import Test from "../Pages/Test"


function AllRoutes(){
    return(
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/user-dashboard" element={<UserDashboard/>}/>
            <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            <Route path="/test/:title" element={<Test/>}/>
        </Routes>
    )
}
export default AllRoutes