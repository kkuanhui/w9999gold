import {Routes, Route} from "react-router-dom";
import Regular from "./Regular"
import Studio from "./Studio"
import Backstage from "./Backstage"

const NavBar = () => {
  return(
    <Routes>
      <Route index element={<Regular></Regular>}></Route>
      <Route path="studio/*" element={<Studio></Studio>}></Route>
      <Route path="backstage/*" element={<Backstage></Backstage>}></Route>
      <Route path="*" element={<Regular></Regular>}></Route>
    </Routes>
  )
}

export default NavBar