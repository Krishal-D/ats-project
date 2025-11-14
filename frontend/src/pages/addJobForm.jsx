import "../styles/form.css"
import styles from "../styles/addJobForm.module.css"
import React from "react"
import { Navigate, useNavigate } from "react-router-dom"

export function PostJob() {

    const navigate = useNavigate()
    const initialFormState = {
        title: "",
        company: "",
        location: "",
        job_type: "",
        salary: "",
        description: "",
        requirements: "",
        responsibility: "",
        benefits: "",
        tech_stack: "",
    };


    const [error, setError] = React.useState({})

    const [form, setForm] = React.useState(initialFormState)


    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const errors = {
        title: (value) => {
            if (!value) {
                return 'Enter the title of the JOB'
            } else {
                return ""
            }
        },

        company: (value) => {
            if (!value) {
                return 'Enter the name of your company'
            } else {
                return ""
            }
        },

        location: (value) => {
            if (!value) {
                return 'Enter the location of your company'
            } else {
                return ""
            }
        },

        salary: (value) => {
            if (!value) {
                return 'Enter the salary'
            } else {
                return ""
            }
        },

        job_type: (value) => {
            if (!value) {
                return 'Enter the type of the JOB'
            } else {
                return ""
            }
        },

        description: (value) => {
            if (!value) {
                return 'Enter the description of the JOB'
            } else {
                return ""
            }
        },

        requirements: (value) => {
            if (!value) {
                return 'Enter the requirements you seek in a person for the JOB'
            } else {
                return ""
            }
        },

        tech_stack: (value) => {
            if (!value) {
                return 'Enter the required skills for the JOB'
            } else {
                return ""
            }
        }
    }


    const handleError = (e) => {
        const { name, value } = e.target
        const errorMessage = errors[name]?.(value)

        setError((prev) => ({
            ...prev,
            [name]: errorMessage
        }))
    }

    function normalizeJobType(str) {
        if (!str) return "";
        const cleaned = str.toLowerCase().replace(/[\s-_]/g, "");
        if (cleaned.includes("full")) return "Full-time";
        if (cleaned.includes("part")) return "Part-time";
        if (cleaned.includes("contract")) return "Contract";
        return str; // fallback, leave as is
    }


    const formattedForm = {
        ...form,

        job_type: normalizeJobType(form.job_type),


        // Convert comma-separated skills into an array
        tech_stack: form.tech_stack
            ? form.tech_stack.split(",").map(s => s.trim()).filter(Boolean)
            : [],

        // Convert each line of requirements into an array
        requirements: form.requirements
            ? form.requirements.split("\n").map(s => s.trim()).filter(Boolean)
            : [],

        // Convert each line of responsibilities into an array
        responsibility: form.responsibility
            ? form.responsibility.split("\n").map(s => s.trim()).filter(Boolean)
            : [],

        // Convert each line of benefits into an array
        benefits: form.benefits
            ? form.benefits.split("\n").map(s => s.trim()).filter(Boolean)
            : [],
    };


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:5000/api/job`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(formattedForm)
            })

            const details = await res.json()
            console.log(details)

            if (res.ok) {
                setTimeout(() => {
                    alert("Post successful");
                    setForm(initialFormState)
                    setError({})
                    navigate("/jobList")

                }, 2000);
            }
        } catch (err) {
            console.error(err)

        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        setForm(initialFormState)
        setError({})
        navigate("/jobList")

    }


    return (
        <main className={styles.postContainer}>
            <section className={styles.header}>
                <h3>Post New Job</h3>
                <p className={styles.headMessage}>
                    Create a new job listing to attract top talent
                </p>
            </section>

            <section className={`${styles.formCard} ${styles.jobPostCard}`}>
                <p className={styles.formHeading}>Job Details</p>
                <p className={styles.formMessage}>
                    Fill in the information about the position you're hiring for
                </p>

                <form method="POST" className={`formBody ${styles.formBody}`}>
                    {/* Row: Job Title + Company */}
                    <div className={styles.rowTwo}>
                        <div className={styles.field}>
                            <label htmlFor="title">Job Title*</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="eg., Web Developer"
                                value={form.title}
                                onBlur={handleError}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error.title && <p className="error">{error.title}</p>}


                        <div className={styles.field}>
                            <label htmlFor="company">Company*</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="eg., Amazon"
                                value={form.company}
                                onBlur={handleError}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error.company && <p className="error">{error.company}</p>}

                    </div>

                    {/* Row: Location + Job Type + Salary */}
                    <div className={styles.rowThree}>
                        <div className={styles.field}>
                            <label htmlFor="location">Location*</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="eg., Melbourne, Victoria"
                                value={form.location}
                                onBlur={handleError}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error.location && <p className="error">{error.location}</p>}


                        <div className={styles.field}>
                            <label htmlFor="job_type">Job Type*</label>
                            <select name="job_type" id="job_type" onBlur={handleError} onChange={handleChange} value={form.job_type} required>
                                <option value="" disabled>
                                    Select job type
                                </option>
                                <option value="partTime">Part-time</option>
                                <option value="fullTime">Full-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>
                        {error.job_type && <p className="error">{error.job_type}</p>}


                        <div className={styles.field}>
                            <label htmlFor="salary">Salary Range*</label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                placeholder="eg., $120k–$160k"
                                value={form.salary}
                                onBlur={handleError}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <span className="error">{error.salary}</span>

                    </div>

                    <label htmlFor="description">Job Description*</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Brief overview of the role..."
                        value={form.description}
                        onBlur={handleError}
                        onChange={handleChange}
                        required
                    />
                    {error.description && <p className="error">{error.description}</p>}


                    <label htmlFor="requirements">Requirements*</label>
                    <textarea
                        name="requirements"
                        id="requirements"
                        placeholder={`• 5+ years of experience in frontend development
• Expert knowledge of React and TypeScript
• Strong understanding of responsive design`}
                        value={form.requirements}
                        onBlur={handleError}
                        onChange={handleChange}
                        required
                    />
                    {error.requirements && <p className="error">{error.requirements}</p>}


                    <label htmlFor="responsibility">Responsibility</label>
                    <textarea
                        name="responsibility"
                        id="responsibility"
                        placeholder={`• Write clean, maintainable code
• Collaborate with cross-functional teams
• Participate in code reviews`}
                        value={form.responsibility}
                        onChange={handleChange}
                    />

                    <label htmlFor="benefits">Benefits</label>
                    <textarea
                        name="benefits"
                        id="benefits"
                        placeholder={`• Competitive salary and equity
• Health, dental, and vision insurance
• Flexible work hours and remote options`}
                        value={form.benefits}
                        onChange={handleChange}
                    />

                    <label htmlFor="tech_stack">Skills Required*</label>
                    <input
                        type="text"
                        id="skills"
                        name="tech_stack"
                        placeholder="Add skills required"
                        value={form.tech_stack}
                        onBlur={handleError}
                        onChange={handleChange}
                        required
                    />

                    <section className={styles.buttons}>
                        <button className={styles.cancelButton} onClick={handleCancel} type="button">
                            Cancel
                        </button>
                        <button className={styles.postButton} onClick={handleSubmit} type="submit">
                            Post Job
                        </button>
                    </section>
                </form>
            </section>
        </main>
    )
}
