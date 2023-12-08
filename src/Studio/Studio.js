import StudioProvider from "./StudioContext";
import Toolbar from "./Toolbar/Toolbar";
import FunctionLayer from "./FunctionLayer/FunctionLayer";
import TriggerLayer from "./TriggerLayer/TriggerLayer";
import { useStudio } from "./StudioContext";

const Studio = () => {
  return (
    <StudioProvider>
      <StudioContent />
    </StudioProvider>
  );
};

const StudioContent = () => {
  const studio = useStudio();
  if (studio.json === null) {
    return <div>loading......</div>;
  }
  return (
    <div style={{ width: "100%", height: "100%", background: "#E6E6E6" }}>
      <div
        style={{
          width: "100%",
          height: "30px",
          position: "fixed",
          top: "50px",
          zIndex: "1",
        }}
      >
        <Toolbar />
      </div>

      <div
        style={{
          marginTop: "30px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(180, 180, 180, 1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TriggerLayer></TriggerLayer>
          <FunctionLayer></FunctionLayer>
        </div>
      </div>
    </div>
  );
};

export default Studio;
