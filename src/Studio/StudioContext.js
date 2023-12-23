import { createContext, useEffect, useReducer, useContext } from "react";
import _ from "lodash";
import mockJson from "./mock-json.json";

const StudioContext = createContext(null);
const StudioDispatchContext = createContext(null);

const StudioProvider = ({ children }) => {
  const [studio, dispatch] = useReducer(studioReducer, initStudio);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "get",
        json: mockJson,
      });
    }, 500);
  }, []);

  return (
    <StudioContext.Provider value={studio}>
      <StudioDispatchContext.Provider value={dispatch}>
        {children}
      </StudioDispatchContext.Provider>
    </StudioContext.Provider>
  );
};

export default StudioProvider;

export const useStudio = () => {
  return useContext(StudioContext);
};

export const useStudioDispatch = () => {
  return useContext(StudioDispatchContext);
};

const studioReducer = (studio, action) => {
  switch (action.type) {

    // meta
    case "active": {
      return {
        meta: { ...studio.meta, active: action.active },
        json: studio.json,
      };
    }
    case "hover": {
      return {
        meta: { ...studio.meta, hover: action.hover },
        json: studio.json,
      };
    }
    case "mode": {
      const modes = ["normal", "word", "image"];
      if (modes.includes(action.mode)) {
        return {
          meta: { ...studio.meta, mode: action.mode },
          json: studio.json,
        };
      } else {
        throw Error("Unknown operateMode: " + action.mode);
      }
    }
    case "copy": {
      const activeId = studio.meta.active.id
      const copy = studio.json.children.filter(item => item.id === activeId)[0]
      return {
        meta: {...studio.meta, copy: copy},
        json: studio.json
      }
    }
    case "cut": {
      const activeId = studio.meta.active.id
      const copy = studio.json.children.filter(item => item.id === activeId)[0]
      const studioChildren = studio.json.children.filter(item => item.id !== activeId)
      return {
        meta: {...studio.meta, copy: copy, active: null},
        json: {...studio.json, children: studioChildren}
      }
    }
    case "delete": {
      const activeId = studio.meta.active.id
      const studioChildren = studio.json.children.filter(item => item.id !== activeId)
      return {
        meta: {...studio.meta, active: null},
        json: {...studio.json, children: studioChildren}
      }
    }
    case "zoom": {
      return {
        ...studio,
        meta: {...studio.meta, scale: action.scale},
      }
    }

    // json
    case "get": {
      return {
        meta: studio.meta,
        json: action.json,
      };
    }
    case "pos": {
      // update item position
      const children = [...studio.json.children].map(e => {
        if(e.id === action.item.id){
          return action.item
        }else{
          return e
        }
      })
      return { 
        meta: studio.meta,
        json: {
          ...studio.json,
          children: children
        }
      };
    }
    case "update": {
      const children = [...studio.json.children].map(ele => {
        if(ele.id !== action.id){
          return ele
        }else{
          return action.item
        }
      })
      return {
        meta: studio.meta,
        json: {
          ...studio.json,
          children: children
        }
      }
    }
    case "sort": {
      const children = [...studio.json.children]
      const targetId = studio.meta.active.id
      const preservedZ = children.filter(ele => ele.id === targetId)[0].zIndex
      if(action.order === "head"){
        children.forEach(ele => {
          if(ele.id === targetId) ele.zIndex = children.length
          else if(ele.zIndex > preservedZ) ele.zIndex -= 1
        })
      }else if(action.order === "bottom"){
        children.forEach(ele => {
          if(ele.id === targetId) ele.zIndex = 1
          else if(ele.zIndex < preservedZ) ele.zIndex += 1
        })
      }else if(action.order === "backward" && preservedZ !== 1){
        children.forEach(ele => {
          if(ele.id === targetId) ele.zIndex -= 1
          else if(ele.zIndex === preservedZ-1) ele.zIndex += 1
        })
      }else if(action.order === "forward" && preservedZ !== children.length){
        children.forEach(ele => {
          if(ele.id === targetId) ele.zIndex += 1
          else if(ele.zIndex === preservedZ+1) ele.zIndex -= 1
        })
      }
      return {
        ...studio,
        json: {...studio.json, children: children}
      }
    }
    case "reset": {
      // prune empty content children
      // resort id, zIndex
      const isValid = (obj) => {
        return obj.children.some(child => {
          if(child.dom === "#text") return Boolean(child.children.length)
          else return isValid(child)
        })
      }
      const invalidId = []
      studio.json.children.forEach(item => {
        if(item.type === "word" && !isValid(item)){
          invalidId.push(item.id)
        }
      }) 
      const valiedChildren = [...studio.json.children].filter(ele => !invalidId.includes(ele.id))
      const sortByZ = _.sortBy(valiedChildren, "zIndex").map((ele, idx) => {
        return {...ele, zIndex: idx+1}
      })
      const sortById = _.sortBy(sortByZ, "id").map((ele, idx) => {
        return {...ele, id: idx+1}
      })
      return {
        meta: {...studio.meta, active: null}, 
        json: {...studio.json, children: sortById}
      }
    }
    case "paste": {
      const totalChildren = studio.json.children.length + 1
      const pasteItem = {
        ...studio.meta.copy, 
        id: totalChildren, 
        zIndex: totalChildren,
        left: action.position[0],
        top: action.position[1],
      }
      return {
        ...studio,
        json: {
          ...studio.json,
          children: [
            ...studio.json.children,
            pasteItem
          ]
        }
      }
    }
    case "word": {
      const children = [...studio.json.children]
      const newId = _.maxBy(children, 'id').id+1
      const newZIndex = _.maxBy(children, 'zIndex').zIndex+1
      const newWord = {
        "id": newId,
        "zIndex": newZIndex,
        "type": "word",
        "left": action.position[0],
        "top": action.position[1],
        "children": [
          {
            "dom": "p",
            "children": [
              {
                "dom": "span",
                "fontSize": "12px",
                "children": [{
                  "dom": "#text",
                  "children": "新增文字"
                }]
              }
            ]
          }
        ]
      }
      return { 
        meta: studio.meta,
        json: {
          ...studio.json,
          children: [...studio.json.children, newWord]
        }
      };
    }
    case "image": {
      console.log('parameter: position ', action.position, 'add an image. function not complete.')
      return studio;
    }
    case "weight": {
      return {
        ...studio,
        json: {
          ...studio.json,
          productWeight: action.weight,
          price: 45642,
        }
      }
    }
    case "size": {
      return {
        ...studio,
        json: {
          ...studio.json,
          productSize: action.size,
          price: 303232,
        }
      }
    }
    case "style": {
      return {
        ...studio,
        json: {
          ...studio.json,
          productStyle: action.style,
          price: 30000,
        }
      }
    }
    // default
    default: {
      throw Error("Studio dispatch error. Unknown action.type: " + action.type);
    }

  }
};

const initStudio = {
  meta: {
    mode: "normal",
    scale: 1,
    active: null,
    hover: null,
    copy: null,
  },
  json: null,
};