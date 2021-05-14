import React from "react";

import './style.css'

export function SearchBtn(props) {
  return (
    <button {...props} style={{marginLeft: 10 }} className="search-btn">
      {props.children}
    </button>
  );
}
