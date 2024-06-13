import { Route, Routes } from "react-router-dom"
import Register from "../Pages/Register"
import Login from "../Pages/Login"


function AllRoutes(){
    return(
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Login/>}/>
        </Routes>
    )
}
export default AllRoutes