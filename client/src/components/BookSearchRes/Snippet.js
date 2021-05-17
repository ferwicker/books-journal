import React from "react";

export function Snippet(props){
    return (
        <p dangerouslySetInnerHTML={{__html:props.snippet}}></p>
    )
}