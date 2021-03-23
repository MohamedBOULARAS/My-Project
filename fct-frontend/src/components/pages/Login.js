import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import cookie from 'react-cookies'
import Login from './Login.css'
import Notification from '../Notification.js';


  //Notification 


function RegistrationForm(props) {

    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handelChange = (e) => {
        const { id, value } = e.target
        setLogin(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handelSubmitClick = (e) => {
        e.preventDefault();
        setLoading(true);
        sendDetailsToServer()

    }

    const sendDetailsToServer = () => {
        if (login.email.length && login.password.length) {
            
            var payload = {
                "email": login.email,
                "password": login.password,
            }
            fetch('http://localhost:5000/register/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    if(response.error){
                        console.log(response.error)
                        setLoading(false);
                    }else {
                        cookie.save('user', response.user, { path: '/' })
                        cookie.save('token',response.token, { path: '/' })
                        setTimeout(() => {
                            history.push('/client'); 
                        }, 1000);
                        setLoading(false);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                setNotify({
                    isOpen: true,
                    message: 'Connecté avec succées',
                    type: 'success'
                  })

        } else {
            alert('email ou mot de passe manquant');
        }
    }

    
    return (
        <div className="login">
            <form className='form-login'>
                <h1>Se Connecter</h1>
                <h2 className='titre'>Bienvenue sur Facturation</h2>
                <div className="form">
                    <label htmlFor="exampleInputEmail1"></label>
                    <input type="email"
                        className="form-control-mail"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={login.email}
                        onChange={handelChange}
                    />
                </div>
                <div className="form-pw">
                    <label htmlFor="exampleInputPassword1"></label>
                    <input type="password"
                        className="form-control-pw"
                        id="password"
                        placeholder="Password"
                        value={login.password}
                        onChange={handelChange}

                    />
                </div>
                <div className="btn-container">
                    <button
                        type="submit"
                        className="btn-login"
                        onClick={handelSubmitClick}
                    >
                        {loading ? "loading.." : "Continuer"}
                </button>
                </div>
                <div className='contact-form'>
                    <div><h4 className="tell-form">Contactez nous sur: <br></br>0770 80 35 29</h4></div>
                    <div><h5 className="mail-form">Notre e-mail: <br></br> contact@facturation.com</h5></div>
                </div>
            </form>
            <Notification notify= {notify} setNotify = {setNotify} />

        </div>
        
    )
}

export default RegistrationForm;