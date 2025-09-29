import { useNavigate } from "react-router-dom"

export function Register() {

    const navigate = useNavigate()

    function handleNavigate(){
        navigate("/login")
    }



    return (
        <main className="registerForm">
            <h3>Create Your Account</h3>
            <p className="headMessage">Start your journey with TalentTrack today.</p>

            <section className="formSection">
                <p className="formHeading">Register</p>
                <p className="formMessage">Enter your credentials to create your account</p>

                <form method="POST" className="form">

                    <section className="name">
                        <div className="firstName">
                            <label htmlFor="firstName">First name</label>
                            <input type="text" id="firstName" name="firstName" placeholder="John" required />
                        </div>


                        <div className="lastName">
                            <label htmlFor="lastName">Last name</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Cena" required />
                        </div>

                    </section>


                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" />

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Comfirm your password" />

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