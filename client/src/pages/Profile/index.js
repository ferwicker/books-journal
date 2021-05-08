import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
//basic layout components
import Col from "../components/Col";
import Container from "../components/Container";
import Row from "../components/Row";

function Profile(){
    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);
    
    return (
        <Container>
            <h1>Profile Page</h1>
        </Container>
    );
}

export default Profile;