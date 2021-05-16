import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'
import "./style.css";

function Nav (props) {

    return (
        <nav className='navbar navbar-expand-lg fixed-top'>
            <div className='container'>
                <Link to="/">
                    <img className="navbar-brand" src={logo} alt='Book Journal logo'></img>
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
                        <div className="dropdown">
                            <div className="navlink nav-text dropdown-button dropdown-toggle" type="button" id="dropdownShelves" data-bs-toggle="dropdown" aria-expanded="false">
                                My Shelves
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownShelves">
                                {props.shelves !== 'no shelves' ? props.shelves.map((shelf, index)=>
                                    <li key={index}>
                                        <Link className="dropdown-item" to={`/shelves/${shelf._id}`}>{shelf.name}</Link>
                                    </li>
                                ) : <li>no shelves to show</li>}
                                <li key='addshelf'>
                                    <Link className="dropdown-item" to='/addshelf'>Add a new shelf</Link>
                                </li>
                            </ul>
                        </div>
                    <Link to="/login" className='navlink nav-text'>
                        Log In
                    </Link>
                    <Link to="/signup" className='navlink nav-text'>
                        Sign Up
                    </Link>
                    <button className='navlink nav-text logout-btn' onClick={props.logout}>Log out</button>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
