import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";

function Footer () {
    return (
        <footer className='container-fluid'>
            <Container>
                <Row>
                    <Col size='sm-4'>
                        <div className='div-100 d-flex flex-column justify-content-center align-items-start'>
                            <Link to="/">
                                <img className="footer-brand" src='logo.svg' alt='Book Journal logo'></img>
                            </Link>
                        </div>
                    </Col>
                    <Col size='sm-8'>
                        <div className='div-100 d-flex justify-content-end align-items-center'>
                            <Link to="/about" className='footerlink'>
                                About
                            </Link>
                            <Link to="/discover" className='footerlink'>
                                Discover
                            </Link>
                            <Link to="/login" className='footerlink'>
                                Log In
                            </Link>
                            <Link to="/signup" className='footerlink'>
                                Sign Up
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <p className='footer-credit'>Build with bookish ❤️ by <a href='www.ferwicker.com' target='_blank'>Fer Wicker</a></p>
        </footer>
    )
};

export default Footer;