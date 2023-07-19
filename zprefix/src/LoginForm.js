import { Login } from "./Login"
import { useState } from "react";
import { Register } from "./Register";

export function LoginForm() {
    const [currentForm, setCurrentForm] = useState('Login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {
                currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> 
            }
        </div>
    )
}