import Login from "./app/auth/Login";
import BrandEdit from "./app/brandList/BrandEdit"
import BrandList from "./app/brandList/BrandList"
import { Route, Routes } from "react-router-dom";
// import Page from "./app/dashboard/page"

function App() {

  return (
 <>
     
<Routes>

  <Route path="/home" element={<BrandList />} />
  <Route path="/" element={<Login />} />
  <Route path="/brand-edit/:id" element={<BrandEdit />} />
 

</Routes>

</>
  )
}

export default App
