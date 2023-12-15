import {useEffect} from "react";

const NoFooter = ({setFooterHeight}) => {
  useEffect(() => {
    setFooterHeight(0)
  }, [])
  return null;
};

export default NoFooter;