import axios from "axios";
import React, {useState} from "react";
import Global from "./Global";

import { useParams } from "react-router";


import {Navigate} from 'react-router-dom';


const LoginComponent = () => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const [user, setUser] = useState({});
    const [identity, setIdentity] = useState({});
    const [token, setToken] = useState({});
    const [status, setStatus] = useState('');


    const url = Global.url;

    const { userNick } = useParams();

    const recibirFormulario = (e) => {
        e.preventDefault();

        var userProps = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            gettoken: null
        }

        setUser(userProps);
        
        console.log("formulario enviado")
        console.log(userProps)

        login(userProps);
    }

    const login = (user) => {
        // console.log(userNick)
        axios.post(url + "login", user)
        .then(res => {
            if(res.data.user){
                let identity = res.data.user;
                setIdentity(identity);
                console.log(identity)
                setStatus('success');
                // PERSISTIR DATOS DEL USUARIO
                localStorage.setItem('identity', JSON.stringify(identity));
               
                // CONSEGUIR EL TOKEN
                getToken(user);
            }else {                
                setStatus('error');
            }
                       
        })
    }

    const getToken = (user) => {
        user.gettoken = 'true';
        axios.post(url + "login", user)
        .then(res => {
            console.log(res.data.token);

            setToken(res.data.token);

            localStorage.setItem('token', res.data.token)
            
        })
    }

    if(status === 'success'){
        return <Navigate to={'/'+userNick} />
    }

    return (
        
        <div className="login">
            <img className="login-logo" src="https://rapdise.com/assets/logo/rapdise-png4.webp" alt="" />
            <h1 className="login-title">Inicia sesión para continuar</h1>

            {user.email &&
                <p>Email: <b>{user.email}</b></p>
            }

            {user.password &&
                <p>Password: <b>{user.password}</b></p>
            }
            
            
            <form onSubmit={recibirFormulario} className="login-form">
                <div className="login-form-input">
                    <label htmlFor="email">Correo electrónico o nombre de usuario</label>
                    <input name="email" id="email" ref={emailRef} type="text" placeholder="Introduce tu correo electrónico" />
                </div>

                <div className="login-form-input">
                    <label htmlFor="password">Contraseña</label>
                    <input name="password" id="password" ref={passwordRef} type="password" placeholder="Introduce tu contraseña" />
                </div>

                <div className="actions">
                    <button type="submit" className="btn btn-login">Iniciar sesion</button>
                </div>

                <div className="or-separator">
                    <span>O</span>
                </div>

                <div className="actions">
                    <a href="/home" className="btn btn-social">Iniciar sesion con Google</a>
                    <a href="/home" className="btn btn-social">Iniciar sesion con Twitter</a>
                    <a href="/home" className="btn btn-social">Iniciar sesion con Facebook</a>
                </div>

                <p className="register-message">¿No tienes una cuenta? <a href="/register">Registrarse</a></p>
                
            </form>
        </div>            
    );


}

export default LoginComponent;