import { createContext, useReducer, useContext, useEffect } from "react";
import _ from "lodash";
// mock data -----
import mockCustomizedProduct from "./mock/mock-customized-product.json";
import mockTypes from "./mock/mock-types.json";

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

const AppProvider = ({ children }) => {
  const [context, dispatch] = useReducer(appReducer, initApp);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "get",
        customizedProduct: mockCustomizedProduct,
        types: mockTypes,
      });
    }, 500);
  }, []);

  return (
    <AppContext.Provider value={context}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useApp = () => {
  return useContext(AppContext);
};

export const useAppDispatch = () => {
  return useContext(AppDispatchContext);
};

const appReducer = (app, action) => {
  switch (action.type) {
    // meta
    case "active": {
      return {
        ...app,
        meta: { ...app.meta, active: action.active },
      };
    }
    case "hover": {
      return {
        ...app,
        meta: { ...app.meta, hover: action.hover },
      };
    }
    case "mode": {
      const modes = ["normal", "word", "image"];
      if (modes.includes(action.mode)) {
        return {
          ...app,
          meta: { ...app.meta, mode: action.mode },
        };
      } else {
        throw Error("Unknown operateMode: " + action.mode);
      }
    }
    case "copy": {
      const activeId = app.meta.active.id;
      const copy = app.json.children.filter((item) => item.id === activeId)[0];
      return {
        ...app,
        meta: { ...app.meta, copy: copy },
      };
    }
    case "cut": {
      const activeId = app.meta.active.id;
      const copy = app.json.children.filter((item) => item.id === activeId)[0];
      const studioChildren = app.json.children.filter(
        (item) => item.id !== activeId
      );
      return {
        ...app,
        meta: { ...app.meta, copy: copy, active: null },
        json: { ...app.json, children: studioChildren },
      };
    }
    case "delete": {
      const activeId = app.meta.active.id;
      const studioChildren = app.json.children.filter(
        (item) => item.id !== activeId
      );
      return {
        ...app,
        meta: { ...app.meta, active: null },
        json: { ...app.json, children: studioChildren },
      };
    }
    case "zoom": {
      return {
        ...app,
        meta: { ...app.meta, scale: action.scale },
      };
    }

    // toolbar
    case "toolbarWord": {
      return {
        ...app,
        toolbar: {
          word: { ...app.toolbar.word, ...action.style },
        },
      };
    }

    // json
    case "get": {
      return {
        ...app,
        json: action.json,
      };
    }
    case "pos": {
      // update item position
      const children = [...app.json.children].map((e) => {
        if (e.id === action.item.id) {
          return action.item;
        } else {
          return e;
        }
      });
      return {
        ...app,
        json: {
          ...app.json,
          children: children,
        },
      };
    }
    case "update": {
      const children = [...app.json.children].map((ele) => {
        if (ele.id !== action.id) {
          return ele;
        } else {
          return action.item;
        }
      });
      return {
        ...app,
        json: {
          ...app.json,
          children: children,
        },
      };
    }
    case "sort": {
      const children = [...app.json.children];
      const targetId = app.meta.active.id;
      const preservedZ = children.filter((ele) => ele.id === targetId)[0]
        .zIndex;
      if (action.order === "head") {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.zIndex = children.length;
          else if (ele.zIndex > preservedZ) ele.zIndex -= 1;
        });
      } else if (action.order === "bottom") {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.zIndex = 1;
          else if (ele.zIndex < preservedZ) ele.zIndex += 1;
        });
      } else if (action.order === "backward" && preservedZ !== 1) {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.zIndex -= 1;
          else if (ele.zIndex === preservedZ - 1) ele.zIndex += 1;
        });
      } else if (action.order === "forward" && preservedZ !== children.length) {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.zIndex += 1;
          else if (ele.zIndex === preservedZ + 1) ele.zIndex -= 1;
        });
      }
      return {
        ...app,
        json: { ...app.json, children: children },
      };
    }
    case "reset": {
      // prune empty content children
      // resort id, zIndex
      const isValid = (obj) => {
        return obj.children.some((child) => {
          if (child.dom === "#text") return Boolean(child.children.length);
          else return isValid(child);
        });
      };
      const invalidId = [];
      app.json.children.forEach((item) => {
        if (item.type === "word" && !isValid(item)) {
          invalidId.push(item.id);
        }
      });
      const valiedChildren = [...app.json.children].filter(
        (ele) => !invalidId.includes(ele.id)
      );
      const sortByZ = _.sortBy(valiedChildren, "zIndex").map((ele, idx) => {
        return { ...ele, zIndex: idx + 1 };
      });
      const sortById = _.sortBy(sortByZ, "id").map((ele, idx) => {
        return { ...ele, id: idx + 1 };
      });
      return {
        ...app,
        meta: { ...app.meta, active: null },
        json: { ...app.json, children: sortById },
      };
    }
    case "paste": {
      const totalChildren = app.json.children.length + 1;
      const pasteItem = {
        ...app.meta.copy,
        id: totalChildren,
        zIndex: totalChildren,
        left: action.position[0],
        top: action.position[1],
      };
      return {
        ...app,
        json: {
          ...app.json,
          children: [...app.json.children, pasteItem],
        },
      };
    }
    case "word": {
      const children = [...app.json.children];
      const newId = _.maxBy(children, "id").id + 1;
      const newZIndex = _.maxBy(children, "zIndex").zIndex + 1;
      const newWord = {
        id: newId,
        zIndex: newZIndex,
        type: "word",
        left: action.position[0],
        top: action.position[1],
        children: [
          {
            dom: "p",
            children: [
              {
                dom: "span",
                fontSize: "12px",
                children: [
                  {
                    dom: "#text",
                    children: "新增文字",
                  },
                ],
              },
            ],
          },
        ],
      };
      return {
        ...app,
        json: {
          ...app.json,
          children: [...app.json.children, newWord],
        },
      };
    }
    case "image": {
      console.log(
        "parameter: position ",
        action.position,
        "add an image. function not complete."
      );
      return app;
    }
    case "weight": {
      return {
        ...app,
        json: {
          ...app.json,
          productWeight: action.weight,
          price: 45642,
        },
      };
    }
    case "size": {
      return {
        ...app,
        json: {
          ...app.json,
          productSize: action.size,
          price: 303232,
        },
      };
    }
    case "style": {
      return {
        ...app,
        json: {
          ...app.json,
          productStyle: action.style,
          price: 30000,
        },
      };
    }
    default: {
      throw Error(
        "Product dispatch error. Unknown action.type: " + action.type
      );
    }
  }
};

const initApp = {
  productTypes: [],

  studioToolbar: {
    word: {
      fontFamily: "ariel",
      fontSize: "24px",
      writingMode: "horizontal",
      fontWeight: "normal",
      fontStyle: "italic",
      textDecoration: "none",
    },
    image: {},
  },

  studioMeta: {
    mode: "normal",
    scale: 1,
    active: null,
    hover: null,
    copy: null,
  },

  customizedMeta: {
    uuid: null,
    owner: "guest",
    createDate: null,
    product: "",
    style: "",
    weight: 0,
    size: 0,
    isLock: false,
    price: 0,
  },

  customizedContent: {
    uuid: null,
    children: [],
  },
};
