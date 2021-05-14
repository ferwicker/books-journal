import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
import { Link } from "react-router-dom";
import '../style.css'
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";


function About(){
    const [currentUser, setCurrentUser] = useContext(userContext);
    //scroll page to top
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('current user as ' + currentUser); //this might just be too fast to register
      }, []);
    
    return (
        <Container>
            <Row>
                <Col size='sm-6'>
                    <div className='tall-text-container d-flex flex-column justify-content-center align-items-start'>
                        <p className='homepage-hero-intro'>Get your personal library under control with <i className="fas fa-infinity"></i>TRB</p>
                        <Link to="/signup" className='home-btn '>
                            Get started now
                        </Link>
                    </div>
                </Col>
                <Col size='sm-6'>
                    <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                        <img src='./images/book-stack-01.png' alt='cartoon book stack' className='book-stack'></img>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default About;