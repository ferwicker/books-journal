import React from 'react';
import { Link } from "react-router-dom";
import "./style.css";

function Nav () {
    return (
        <nav className='navbar navbar-expand-lg fixed-top'>
            <div className='container'>
                <Link to="/">
                    <img className="navbar-brand" src='logo.svg' alt='Book Journal logo'></img>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fas fa-ellipsis-h"></span>
                </button>
                <div className='collapse navbar-collapse justify-content-end' id="navbarNavAltMarkup">
                    <Link to="/about" className='navlink nav-text'>
                        About
                    </Link>
                    <Link to="/discover" className='navlink nav-text'>
                        Discover
                    </Link>
                    <Link to="/login" className='navlink nav-text'>
                        Log In
                    </Link>
                    <Link to="/signup" className='navlink nav-text'>
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
