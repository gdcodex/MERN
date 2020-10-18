import React from "react";
import ReactDOM from "react-dom";
import "./sidedrawer.css";
import {motion, AnimatePresence} from 'framer-motion'

function Sidedrawer(props) {
  const content = 
  <AnimatePresence exitBeforeEnter>
  <motion.aside className="side-drawer"
 initial={ {x:-100}}
  animate={ {x:0}}
  transition={{ duration:1, ease:'easeInOut'}}
  exit={{ x:-100,transition:{ease:'linear',duration:1}}}
  >
  {props.children}
  </motion.aside>
  </AnimatePresence>;
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default Sidedrawer;
