import { useAppDispatch } from "../../Context";
const Exit = () => {
  const dispatch = useAppDispatch();
  return(
    <div style={{
      position: "absolute",
      top: "0px",
      left: "0px",
      zIndex: "0",
      width: "100%",
      height: "100%",
    }}
    onClick={() => {
      dispatch({
        type: "studioActive",
        active: null
      })
      dispatch({
        type: "studioMode",
        mode: "normal"
      })
    }}
    ></div>
  )
}

export default Exit;