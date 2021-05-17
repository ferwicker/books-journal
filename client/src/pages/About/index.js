import React, {useState, useEffect, useContext} from "react";
import { userContext } from "../../utils/Context.js";
import { Link } from "react-router-dom";
import '../style.css'
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";
//import '../../utils/Granim';
import { bounce, fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const FadeIn = styled.div`animation: 2s ${keyframes `${fadeIn}`}`;


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
                        <FadeIn>
                            <p className='homepage-hero-intro'>Get your personal library under control with <i className="fas fa-infinity"></i>TBR</p>
                            <div className='spacer-40'></div>
                            <Link to="/signup" className='home-btn '>
                                Get started now
                            </Link>
                        </FadeIn>
                    </div>
                </Col>
                <Col size='sm-6'>
                    <FadeIn>
                        <div className='d-flex justify-content-center align-items-center' style={{height:'100%'}}>
                            <img src='./images/book-stack-01.png' alt='cartoon book stack' className='book-stack'></img>
                        </div>
                    </FadeIn>
                </Col>
            </Row>
            <Row>
                <div className='tall-text-container d-flex flex-column justify-content-center align-items-center'>
                    <p className='gradient-big-text'>So many books, <br></br>so little time...</p>
                </div>
            </Row>
        </Container>
    );
}

export default About;