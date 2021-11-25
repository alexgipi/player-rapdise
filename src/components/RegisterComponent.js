import React, {useState} from "react";

function RegisterComponent() {
    const emailRef = React.createRef();
    const nickRef = React.createRef();
    const passwordRef = React.createRef();

    const [user, setUser] = useState({});

    const recibirFormulario = (e) => {
        e.preventDefault();

        let user = {
            email: this.emailRef.current.value,
            nick: this.nickRef.current.value,
            password: this.passwordRef.current.value
        }

        setUser(user);
        console.log("formulario enviado")
        console.log(user)
    }

    return (
        <div className="login">
            <img className="login-logo" src="https://rapdise.com/assets/logo/rapdise-png4.webp" alt="" />
            <h1 className="login-title">Registrarse</h1>

            {user.email &&
                <p>Email: <b>{user.email}</b></p>
            }

            {user.nick &&
                <p>Nick: <b>{user.nick}</b></p>
            }

            {user.password &&
                <p>Password: <b>{user.password}</b></p>
            }
            
            
            <form onSubmit={recibirFormulario} className="login-form">
                <div className="login-form-input">
                    <label htmlFor="email">Correo electrónico</label>
                    <input name="email" id="email" ref={emailRef} type="email" placeholder="Introduce tu correo electrónico" />
                </div>
                <div className="login-form-input">
                    <label htmlFor="email">Nombre de usuario</label>
                    <input name="nick" id="nick" ref={nickRef} type="text" placeholder="Crea un nombre de usuario" />
                </div>

                <div className="login-form-input">
                    <label htmlFor="password">Contraseña</label>
                    <input name="password" id="password" ref={passwordRef} type="password" placeholder="Introduce tu contraseña" />
                </div>

                <div className="login-form-input">
                    <label htmlFor="password">Repetir contraseña</label>
                    <input name="password" id="password" ref={passwordRef} type="password" placeholder="Repite la contraseña" />
                </div>

                <div className="actions">
                    <button type="submit" className="btn btn-login">Crear cuenta</button>
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

export default RegisterComponent;