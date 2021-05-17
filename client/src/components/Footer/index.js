import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";
//basic layout components
import Col from "../../components/Col";
import Container from "../../components/Container";
import Row from "../../components/Row";

import logo from '../../assets/logo.svg'

function Footer () {
    return (
        <footer className='container-fluid'>
            <Container>
                <Row>
                    <Col size='sm-4'>
                        <div className='div-100 d-flex flex-column justify-content-center align-items-start'>
                            <Link to="/">
                                <img className="footer-brand" src={logo} alt='Infinite TBR logo'></img>
                            </Link>
                        </div>
                    </Col>
                    <Col size='sm-8'>
                        <div className='div-100 d-flex flex-column align-items-end'>
                            <a className='footerlink' href='https://github.com/ferwicker/books-journal' target='_blank'>See Github repo</a>
                            <a className='footerlink' href='mailto:fer.wicker@gmail.com' target='_blank'>Contact the developer</a>
                        </div>
                    </Col>
                </Row>
            </Container>
            <p className='footer-credit'>© 2021 Made with bookish ❤️ by <a href='http://ferwicker.com/' target='_blank'>Fer Wicker.</a></p>
        </footer>
    )
};

export default Footer;