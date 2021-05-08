import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
//basic layout components
import Col from "../components/Col";
import Container from "../components/Container";
import Row from "../components/Row";
// other components
import { Input, FormBtn } from "../../components/Form";

function Discover(){
    //set state
    

    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

      //handle change

      //handle submit
    
    return (
        <Container>
            <h1>Discover Page</h1>
            <form>
            <Input
                onChange={}
                name="search"
                placeholder="Search"
                value={}
            />
            </form>
        </Container>
    );
}

export default Discover;