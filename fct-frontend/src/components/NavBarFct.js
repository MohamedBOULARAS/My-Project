import React, { useState } from 'react';
import './NavBarFct.css';
import { useHistory } from "react-router-dom";
import { Link, Router } from 'react-router-dom';
import cookie from 'react-cookies'






const NavFCT = () => {

    let history = useHistory();
    const handelSubmitClick = (e) => {
        e.preventDefault();
        sendDetailToServer();
    }

    const logout = (e) => {
        handelSubmitClick(e)
        history.push('/sign-up')
    }

    const sendDetailToServer = () => {
        console.log(sendDetailToServer)
        cookie.remove('token', {
            path: '/'
        })
        cookie.remove('user', {
            path: '/'
        })

    }
    




    const [navbar, setNavbar] = useState(false);
    

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
        <nav className={navbar ? 'navfct active' : 'navfct'}>
            <div className="navfct-container">
                <h2 className="navfct-logo">
                    Application
                </h2>
                <ul className='navfct-menu'>
                    <li className='navfct-item'>
                        <Link to="/user" className="navfct-links">
                        <i style={{fontSize: '27px', color: 'grey'}} class="fas fa-user-circle"></i>
                        </Link>
                    </li>
                    <li className='navfct-item'>
                        <button calssName="btn-log-out" style={{marginTop: '33px', marginLeft: '5px', border: 'none', backgroundColor: 'transparent'}} onClick={logout}>
                        <i style={{fontSize: '27px', color: 'grey'}} class="fas fa-power-off"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    );
};

export default NavFCT;
