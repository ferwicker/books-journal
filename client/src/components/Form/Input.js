import React from "react";

export function Input(props) {
  return (
    <div className="form-group" style={{marginTop: 20, marginBottom:20}}>
      <label>{props.label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}
