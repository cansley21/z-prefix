import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertFunction } from "./Homepage";

export const Login =  (props) => {
    const [username, setUsername] = useState ('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('Submitting login form');
        try {
            const response = await fetch('http:localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            body: JSON.stringify({ username, pass }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                navigate('/resources');
                console.log(data)
                sessionStorage.setItem('userI', JSON.stringify(data.user_id)); 
                sessionStorage.setItem('username', JSON.stringify(data.username));
            } else {
                alertFunction('Sign in failed, wrong Login information input')
                console.log('FAILED!!');
            }
        } else { 
          alertFunction('Sign in error! you stink at typing')
          console.log('catastrophic failue')
        }  
    } catch (error) {
      console.log('error occured during login, obviously:', error);
    }
   };

   return (
    <>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="alert alert-danger alert-dismissible fade show" role="alert"></div>
        <div className="auth-form-continer">
            <h1> Who wants some inventory?!</h1>
            <h2>Inventory Managers Login Here!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    placeholder="Username"
                    id="username"
                    name="username"
                    />
                    <label htmlFor="password">Password, or whatever</label>
                    <input 
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        type="password"
                        placeholder="*******"
                        id="password"
                        name="password"
                    />
                    <button type="Submit">Login</button>
                    </form>
                    <button className="Link-btn" onClick={() => props.onFormSwitch('register')}>
                        Need an account? Click here!
                    </button>
        </div>
    </>

   );
};