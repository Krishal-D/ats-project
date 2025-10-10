import '../styles/login.css'
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import React from 'react';



export function Login() {
    const navigate = useNavigate()

    function handleNavigate() {
        navigate("/register")
    }


    const [form, setForm] = React.useState({
        email: "",
        password: ""
    })

    const [error, setError] = React.useState({
        email: "",
        password: ""
    })

    const errors = {
        email: (value) => {
            if (!value) {
                return "Enter Your email"
            } else {
                return ""
            }
        },

        password: (value) => {
            if (!value) {
                return "Enter Your password"
            } else if (value !== form.password) {
                return "Password Incorrect"
            } else {
                return ""
            }
        }
    }



    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }
        ))
    }

    const handleError = (e) => {
        const { name, value } = e.target

        const errMessage = errors[name]?.(value)

        setError(prev => ({
            ...prev,
            [e.target.name]: errMessage
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()


        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(form)
            })

            const details = await res.json()

            if (!res.ok) {
                setError(prev => ({ ...prev, password: data.message }));
            }else{
                console.log("login success")
            }
            console.log(details)
            return details

        } catch (err) {
            console.error(err)

        }
    }


    return (
        <main className="loginForm">
            <h3>TalentTrack</h3>
            <p className="headMessage">Welcome back to your hiring platform</p>

            <section className="formSection">
                <p className="formHeading">Sign In</p>
                <p className="formMessage">Enter your credentials to access your account</p>

                <form method="POST" onSubmit={handleSubmit} className="form">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={form.email} id="email" placeholder="Enter your email" onChange={handleChange} onBlur={handleError} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={form.password} id="password" placeholder="Enter your password" onChange={handleChange} onBlur={handleError} required />


                    <label htmlFor="remember">
                        <input type="checkbox" name="remember" id="remember" />Remember me
                    </label>

                    <button type="submit" className="signIn">Sign In</button>
                    <p className="forgot">Forgot your password?</p>
                    <hr />
                    <p className="account">Don't have an account?</p>
                    <button type="button" className="createAcc" onClick={handleNavigate}>Create Account</button>



                </form>


            </section>
            <button className='back'>
                <HiArrowLongLeft /> <span>Back to Home</span>
            </button>
        </main>
    )
}