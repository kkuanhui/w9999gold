// package -----
import { createContext, useReducer, useContext, useEffect } from "react";
import _ from "lodash";

// mock data -----
import mockProductContent from "./mock/mock-product-content.json";
import mockProductMeta from "./mock/mock-product-meta.json";
import mockProductTypes from "./mock/mock-product-types.json";
import mockMember from "./mock/mock-member.json";
import mockCart from "./mock/mock-cart.json";

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
        },
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
        ...action.data,
      };
    }

    // member -----
    case "login": {
      return {
        ...context,
        member: {
          ...context.member,
          ...action.member,
        },
      };
    }
    case "logout": {
      const emptyMemberInfo = { ...context.member };
      for (let key in emptyMemberInfo) {
        if (emptyMemberInfo.hasOwnProperty(key)) {
          emptyMemberInfo[key] = null;
        }
      }
      return {
        ...context,
        member: emptyMemberInfo,
      };
    }

    // studio meta -----
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
    case "studioScale": {
      return {
        ...context,
        studioMeta: {
          ...context.studioMeta,
          scale: action.scale,
        },
      };
    }

    // toolbar -----
    case "toolbarWord": {
      return {
        ...context,
        studioToolbar: {
          ...context.studioToolbar,
          word: {
            ...context.studioToolbar.word,
            ...action.style,
          },
        },
      };
    }

    // content -----
    case "contentCopy": {
      const activeId = context.studioMeta.active.id;
      const copy = context.productContent.children.filter((item) => item.id === activeId)[0];
      return {
        ...context,
        studioMeta: {
          ...context.studioMeta,
          copy: copy,
        },
      };
    }
    case "contentPaste": {
      const totalChildren = context.productContent.children.length + 1;
      const pasteItem = {
        ...context.studioMeta.copy,
        id: totalChildren,
        style: {
          ...context.studioMeta.copy.style,
          zIndex: totalChildren,
          left: action.position[0],
          top: action.position[1],
        }
      };
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: [
            ...context.productContent.children, 
            pasteItem
          ],
        },
      };
    }
    case "contentCut": {
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
          active: null,
        },
        productContent: {
          ...context.productContent,
          children: studioChildren,
        },
      };
    }
    case "contentDelete": {
      const activeId = context.studioMeta.active.id;
      const content = context.productContent;
      const studioChildren = content.children.filter(
        (item) => item.id !== activeId
      );
      return {
        ...context,
        studioMeta: {
          ...context.meta,
          active: null,
        },
        productContent: {
          ...context.productContent,
          children: studioChildren,
        },
      };
    }
    case "contentPos": {
      // update item position
      const content = context.productContent;
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
        studioMeta: {
          ...context.studioMeta,
          active: {
            ...context.studioMeta.active,
            top: action.item.style.top,
            left: action.item.style.left,
          }
        }
      };
    }
    case "contentSort": {
      const content = context.productContent;
      const children = [...content.children];
      const targetId = context.studioMeta.active.id;
      const preservedZ = children.filter((ele) => ele.id === targetId)[0].style.zIndex;
      if (action.order === "head") {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.style.zIndex = children.length;
          else if (ele.style.zIndex > preservedZ) ele.style.zIndex -= 1;
        });
      } else if (action.order === "bottom") {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.style.zIndex = 1;
          else if (ele.style.zIndex < preservedZ) ele.style.zIndex += 1;
        });
      } else if (action.order === "backward" && preservedZ !== 1) {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.style.zIndex -= 1;
          else if (ele.style.zIndex === preservedZ - 1) ele.style.zIndex += 1;
        });
      } else if (action.order === "forward" && preservedZ !== children.length) {
        children.forEach((ele) => {
          if (ele.id === targetId) ele.style.zIndex += 1;
          else if (ele.style.zIndex === preservedZ + 1) ele.style.zIndex -= 1;
        });
      }
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: children,
        },
      };
    }
    case "contentReset": {
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
    case "contentAddNewWord": {
      const children = [...context.productContent.children];
      const newId = _.maxBy(children, "id").id + 1;
      const styles = children.map((ele) => ele.style);
      const newZIndex = _.maxBy(styles, "zIndex").zIndex + 1;
      const newWord = {
        id: newId,
        type: "word",
        style: {
          writingMode: "horizontal-tb",
          fontSize: "24px",
          zIndex: newZIndex,
          fontFamily: "brush",
          left: action.position[0],
          top: action.position[1],
        },
        children: [
          {
            dom: "p",
            style: {},
            children: [
              {
                dom: "span",
                style: {
                  fontSize: "24px",
                },
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
          children: [...context.productContent.children, newWord],
        },
      };
    }
    case "contentAddNewImage": {
      const children = [...context.productContent.children];
      const newId = _.maxBy(children, "id").id + 1;
      const styles = children.map((ele) => ele.style);
      const newZIndex = _.maxBy(styles, "zIndex").zIndex + 1;
      const newImage = {
        id: newId,
        type: "image",
        style: {
          zIndex: newZIndex,
          left: action.position[0],
          top: action.position[1],
          // width: "300px"
        },
        src: action.src
      };
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: [...context.productContent.children, newImage],
        },
      };
    }
    case "contentItem": {
      const updateChildren = context.productContent.children.map(
        (child) => {
          if(child.id === action.id){
            return { 
              ...child, 
              ...action.item
            }
          }else{
            return child
          }
        }
      );
      return {
        ...context,
        productContent: {
          ...context.productContent,
          children: updateChildren,
        },
      };
    }
    case "contentText": {
      const objResetText = (obj, text) => {
        if (obj.dom === "#text") {
          return { ...obj, children: text };
        } else {
          return {
            ...obj,
            children: [objResetText(obj.children[0], text)],
          };
        }
      };
      const content = context.productContent;
      const children = [...content.children].map((ele) => {
        if (ele.id !== action.id) {
          return ele;
        } else {
          return objResetText(ele, action.text);
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
    case "contentImageUpdate": {
      const newContent = context.productContent.children.map(child => {
        if(child.id === action.id && child.type === "image"){
          return null
        }else{
          return child
        }
      })
      return{
        ...context,
        // productContent: [...newContent]
      }
    }

    // product meta -----
    case "productMetaUpdate": {
      return {
        ...context,
        productMeta: {
          ...context.productMeta,
          ...action.update,
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
