import { createContext, useReducer, useEffect, useContext } from "react";
import mockProduct from "./mock-product.json";
import mockTypes from "./mock-types.json";

const ProductsContext = createContext(null);
const ProductsDispatchContext = createContext(null);

const ProductsProvider = ({ children }) => {
  const [context, dispatch] = useReducer(productsReducer, initProducts);
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "get",
        main: mockProduct,
        types: mockTypes
      });
    }, 500)
  }, []);
  return (
    <ProductsContext.Provider value={context}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const useProductsDispatch = () => {
  return useContext(ProductsDispatchContext);
};

const productsReducer = (product, action) => {
  switch (action.type) {
    case "get": {
      return {
        ...product,
        main: action.main,
        types: action.types,
      };
    }
    default: {
      throw Error(
        "Product dispatch error. Unknown action.type: " + action.type
      );
    }
  }
};

const initProducts = {
  main: {},
  types: [],
};