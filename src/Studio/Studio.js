import Toolbar from "./Toolbar/Toolbar";
import SideColumn from "./SideColumn";
import {Routes, Route} from "react-router-dom"
import "../static/css/studio.css"
import Content from "./Content";

const Studio = () => {
  return(
    <Routes>
      <Route index element={<StudioPage />}></Route>
      <Route path="*" element={<StudioPage />}></Route>
    </Routes>
  )
}

const StudioPage = () => {
  return (
    <div id="studio">
      <Toolbar />
      <SideColumn />
      <Content />
    </div>
  );
};

export default Studio;