import React from "react";

export function Thumbnail(props){
    return (
        <img src={props.src} alt={props.title}></img>
    )
}