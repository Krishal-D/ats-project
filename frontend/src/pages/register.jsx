import { useNavigate } from "react-router-dom";
import React from "react";

export function Register() {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate("/login");
    }

    const errors = {
        email: (value) => {
            if (!value) {
                return "Email must be given";
            } else {
                return "";
            }
        },

        password: (value) => {
            if (!value) {
                return "Password must be given";
            } else if (value.length < 8) {
                return "Password must have 8 or more characters";
            } else {
                return "";
            }
        },

        confirmPassword: (value) => {
            if (value !== form.password) {
                return "Password must match";
            } else {
                return "";
            }
        },

        firstName: (value) => {
            if (!value) {
                return "Give your FirstName";
            } else {
                return "";
            }
        },

        lastName: (value) => {
            if (!value) {
                return "Give your LastName";
            } else {
                return "";
            }
        },

        TC: (value) => {
            if (!value) {
                return "You must agree on Terms and Conditions";
            } else {
                return "";
            }
        }
    };

    const [form, setForm] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        TC: false
    });

    const [error, setError] = React.useState({});

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleError = (e) => {
        const { name, value, type, checked } = e.target;

        const inputValue = type === "checkbox" ? checked : value;

        const errorMessage = errors[name]?.(inputValue);
        setError(prev => ({
            ...prev,
            [name]: errorMessage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const values = {
            ...form,
            name: form.firstName + " " + form.lastName
        };

        const submitErrors = {};

        for (const key in errors) {
            const inputValue = key === "TC" ? form.TC : form[key];

            const message = errors[key]?.(inputValue);

            if (message) {
                submitErrors[key] = message;
            }
        }

        setError(submitErrors);

        if (Object.keys(submitErrors).length > 0) return;

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values)
            });
            const details = await res.json();
            console.log(details);

            if (res.ok) {
                navigate("/login");
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="John"
                                required
                            />
                        </div>
                        {error.firstName && <p className="error">{error.firstName}</p>}

                        <div className="lastName">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                onBlur={handleError}
                                placeholder="Cena"
                                required
                            />
                        </div>
                        {error.lastName && <p className="error">{error.lastName}</p>}
                    </section>

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleError}
                        placeholder="Enter your email"
                    />
                    {error.email && <p className="error">{error.email}</p>}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleError}
                        placeholder="Enter your password"
                    />
                    {error.password && <p className="error">{error.password}</p>}

                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleError}
                        placeholder="Comfirm your password"
                    />
                    {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}

                    <label htmlFor="TC">
                        <input
                            type="checkbox"
                            name="TC"
                            id="TC"
                            checked={form.TC}
                            onChange={handleChange}
                            onBlur={handleError}
                        />
                        I agree to the <span className="TOS">Terms of Service</span> and <span className="TOS">Privacy Policy</span>
                    </label>

                    <button type="submit" className="signUp">Create Account</button>

                    <p className="account">Already have an account? <span className="TOS" onClick={handleNavigate}>Sign in</span></p>
                </form>
            </section>
        </main>
    );
}
