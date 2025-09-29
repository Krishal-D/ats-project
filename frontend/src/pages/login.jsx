import '../styles/login.css'
import { HiArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';



export function Login() {
        const navigate = useNavigate()

    function handleNavigate(){
        navigate("/Register")
    }


    return (
        <main className="loginForm">
            <h3>TalentTrack</h3>
            <p className="headMessage">Welcome back to your hiring platform</p>

            <section className="formSection">
                <p className="formHeading">Sign In</p>
                <p className="formMessage">Enter your credentials to access your account</p>

                <form method="POST" className="form">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" required />


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