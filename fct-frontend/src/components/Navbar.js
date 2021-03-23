import React, { useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import './Navbar.css';
import { Button } from './Button'



const NavBar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true); 
        }
    };

    useEffect(() => {
        showButton();
      }, []);

    window.addEventListener('resize', showButton);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground)

    return (
        <>
        <nav className={navbar ? 'navbar active' : 'navbar'}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Facturation
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                            Acceuille
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/sign-up" className="nav-links-mobile" onClick={closeMobileMenu}>
                        Mon Compte
                        </Link>
                    </li>
                </ul>
                {button && <Button className='btn-1' buttonStyle='btn--outline'>Mon Compte</Button>}
            </div>
        </nav>
        </>
    );
};

export default NavBar
