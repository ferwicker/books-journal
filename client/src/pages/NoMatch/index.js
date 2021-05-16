import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function NoMatch() {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    return (
        <section className='tall-text-container container d-flex flex-column justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center' style={{width:400, maxWidth:'100%'}}>
                <img src='./images/404.svg' alt='spooky house book' className=''></img>
            </div>
            <h1 className='h1-404'>404</h1>
            <p className='p-404'>Whoops! Looks like the page you are looking for is not here!</p>
            <Link to='/' role='button' className='home-btn'>
                Return to homepage
            </Link>
        </section>
    );
}

export default NoMatch;