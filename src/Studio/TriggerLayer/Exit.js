const Exit = (props) => {

  const {
    onRemoveAct,
    onSetNotEditing,
    onChangeMode,
  } = props;

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
      onRemoveAct();
      onSetNotEditing();
      onChangeMode('normal');
      console.log('exit all')
    }}
    ></div>
  )
}

export default Exit;