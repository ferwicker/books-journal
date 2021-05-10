import React from "react";

import './style.css'

export function FormBtn(props) {
  return (
    <button {...props} style={{marginBottom: 10 }} className="btn-form">
      {props.children}
    </button>
  );
}
