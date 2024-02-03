// package -----
import { createContext, useReducer, useContext, useEffect } from "react";
import _ from "lodash";

// mock data -----
import mockProductContent from "./mock/mock-product-content-2.json";
import mockProductMeta from "./mock/mock-product-meta.json"
import mockProductTypes from "./mock/mock-product-types.json";
import mockMember from "./mock/mock-member.json"
import mockCart from "./mock/mock-cart.json"

// context -----
const AppContext = createContext(null);
const AppDispatchContext = createContext(null);

const initApp = {
  member: {
    name: "",
    email: "",
    phone: "",
  },
  cart: [],
  // product
  productTypes: [],
  productMeta: {
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
  productContent: {
    uuid: null,
    children: [],
  },
  // studio -> temporary state
  studioMeta: {
    mode: "normal",
    scale: 1,
    active: null,
    hover: null,
    copy: null,
  },
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
};

const AppProvider = ({ children }) => {
  const [context, dispatch] = useReducer(appReducer, initApp);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "get",
        data: {
          productContent: mockProductContent,
          productMeta: mockProductMeta,
          productTypes: mockProductTypes,
          cart: mockCart,
          member: mockMember,
        }
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

// reducer -----
const appReducer = (context, action) => {
  switch (action.type) {
    // request database -----
    case "get": {
      return {
        ...context,
        ...action.data
      };
    }

    // function member -----
    case "login": {
      return{
        ...context,
        member: {
          ...context.member,
          ...action.member
        }
      }
    }
    case "logout": {
      const emptyMemberInfo = {...context.member}
      for (let key in emptyMemberInfo) {
        if (emptyMemberInfo.hasOwnProperty(key)) {
          emptyMemberInfo[key] = null;
        }
      }
      return{
        ...context,
        member: emptyMemberInfo
      }
    }

    // studio meta -----
    case "studioActive": {
      return {
        ...context,
        studioMeta: { ...context.studioMeta, active: action.active },
      };
    }
    case "studioHover": {
      return {
        ...context,
        studioMeta: { ...context.studioMeta, hover: action.hover },
      };
    }
    case "studioMode": {
      const modes = ["normal", "word", "image"];
      if (modes.includes(action.mode)) {
        return {
          ...context,
          studioMeta: { ...context.studioMeta, mode: action.mode },
        };
      } else {
        throw Error("Unknown operateMode: " + action.mode);
      }
    }
    case "studioCopy": {
      const activeId = context.studioMeta.active.id;
      const content = context.productContent
      const copy = content.filter((item) => item.id === activeId)[0];
      return {
        ...context,
        studioMeta: { 
          ...context.studioMeta, 
          copy: copy 
        },
      };
    }
    case "studioCut": {
      const activeId = context.studioMeta.active.id;
      const content = context.productContent;
      const copy = content.children.filter((item) => item.id === activeId)[0];
      const studioChildren = content.children.filter(
        (item) => item.id !== activeId
      );
      return {
        ...context,
        studioMeta: { 
          ...context.studioMeta, 
          copy: copy, 
          active: null 
        },
        productContent: { 
          ...context.productContent, 
          children: studioChildren 
        },
      };
    }
    case "delete": {
      const activeId = context.studioMeta.active.id;
      const content = context.productContent;
      const studioChildren = content.children.filter(
        (item) => item.id !== activeId
      );
      return {
        ...context,
        studioMeta: { 
          ...context.meta, 
          active: null 
        },
        productContent: { 
          ...context.productContent, 
          children: studioChildren 
        },
      };
    }
    case "scale": {
      return {
        ...context,
        studioMeta: { 
          ...context.studioMeta, 
          scale: action.scale 
        },
      };
    }

    // studio toolbar -----
    case "toolbarWord": {
      return {
        ...context,
        studioToolbar: {
          ...context.studioToolbar,
          word: { 
            ...context.studioToolbar.word, 
            ...action.style 
          },
        },
      };
    }

    case "pos": {
      // update item position
      const content = context.productContent
      const children = [...content.children].map((e) => {
        if (e.id === action.item.id) {
          return action.item;
        } else {
          return e;
        }
      });
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: children,
        },
      };
    }
    case "update": {
      const content = context.productContent
      const children = [...content.children].map((ele) => {
        if (ele.id !== action.id) {
          return ele;
        } else {
          return action.item;
        }
      });
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: children,
        },
      };
    }
    case "textUpdate": {
      const objResetText = (obj, text) => {
        if(obj.dom === "#text"){
          return {...obj, children: text}
        }else{
          return {
            ...obj, 
            children: [objResetText(obj.children[0], text)]
            }
        }
      }
      const content = context.productContent
      const children = [...content.children].map((ele) => {
        if (ele.id !== action.id) {
          return ele;
        } else {
          return objResetText(ele, action.text)
        }
      });
      return{
        ...context,
        productContent: {
          ...context.productContent,
          children: children
        }
      }
    }
    case "studioSort": {
      const content = context.productContent;
      const children = [...content.children];
      const targetId = context.studioMeta.active.id;
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
        ...context,
        productContent: { 
          ...context.productContent, 
          children: children 
        },
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
      context.productContent.children.forEach((item) => {
        if (item.type === "word" && !isValid(item)) {
          invalidId.push(item.id);
        }
      });
      const valiedChildren = [...context.productContent.children].filter(
        (ele) => !invalidId.includes(ele.id)
      );
      const sortByZ = _.sortBy(valiedChildren, "zIndex").map((ele, idx) => {
        return { ...ele, zIndex: idx + 1 };
      });
      const sortById = _.sortBy(sortByZ, "id").map((ele, idx) => {
        return { ...ele, id: idx + 1 };
      });
      return {
        ...context,
        productMeta: { ...context.productMeta, active: null },
        productContent: { ...context.productContent, children: sortById },
      };
    }
    case "paste": {
      const totalChildren = context.productContent.children.length + 1;
      const pasteItem = {
        ...context.productMeta.copy,
        id: totalChildren,
        zIndex: totalChildren,
        left: action.position[0],
        top: action.position[1],
      };
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: [...context.productContent.children, pasteItem],
        },
      };
    }
    case "word": {
      const children = [...context.productContent.children];
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
        ...context,
        productContent: {
          ...context.productContent,
          children: [
            ...context.productContent.children, 
            newWord
          ],
        },
      };
    }
    case "image": {
      console.log(
        "parameter: position ",
        action.position,
        "add an image. function not complete."
      );
      return context;
    }
    case "weight": {
      return {
        ...context,
        productContent: {
          ...context.productContent,
          productWeight: action.weight,
          price: 45642,
        },
      };
    }
    case "size": {
      return {
        ...context,
        productContent: {
          ...context.productContent,
          productSize: action.size,
          price: 303232,
        },
      };
    }
    case "style": {
      return {
        ...context,
        productContent: {
          ...context.productContent,
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