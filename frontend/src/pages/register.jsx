import { useNavigate } from "react-router-dom"
import React from "react"

export function Register() {

    const navigate = useNavigate()

    function handleNavigate() {
        navigate("/login")
    }


    const [form, setForm] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    })

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const values = {
            ...form,
            name: form.firstName + " " + form.lastName
        }
  

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values)
            })
            const details = await res.json()
            console.log(details)

        } catch (err) {
            console.error(err)
        }



    }


    return (
        <main className="registerForm">
            <h3>Create Your Account</h3>
            <p className="headMessage">Start your journey with TalentTrack today.</p>

            <section className="formSection">
                <p className="formHeading">Register</p>
                <p className="formMessage">Enter your credentials to create your account</p>

                <form method="POST" onSubmit={handleSubmit} className="form">

                    <section className="name">
                        <div className="firstName">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" id="firstName" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required />
                        </div>


                        <div className="lastName">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" id="lastName" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Cena" required />
                        </div>

                    </section>


                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="Enter your password" />

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Comfirm your password" />

                    <label htmlFor="TC" >
                        <input type="checkbox" name="TC" id="TC" />
                        I agree to the <span className="TOS">Terms of Service</span > and <span className="TOS">Privacy Policy</span>
                    </label>

                    <button type="submit" className="signUp">Create Account</button>

                    <p className="account">Already have an account? <span className="TOS" onClick={handleNavigate}>Sign in</span></p>




                </form>
            </section>
        </main>

    )

}