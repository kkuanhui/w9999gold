import { Navigate } from "react-router-dom";

const EmptyProduct = () => {
  return(
    <Navigate to="/products"></Navigate>
  )
}

export default EmptyProduct;