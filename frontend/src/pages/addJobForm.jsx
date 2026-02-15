import "../styles/form.css"
import styles from "../styles/addJobForm.module.css"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext"


export function PostJob(props) {

    const selectedJobs = props.selectedJobs
    const onClose = props.onClose

    const navigate = useNavigate()

    function mapJobToForm(job) {
        return {
            title: job?.title || "",
            company: job?.company || "",
            location: job?.location || "",
            job_type: job?.job_type || "",
            salary: job?.salary || "",
            description: job?.description || "",
            requirements: Array.isArray(job?.requirements)
                ? job.requirements.join("\n")
                : job?.requirements || "",
            responsibility: Array.isArray(job?.responsibility)
                ? job.responsibility.join("\n")
                : job?.responsibility || "",
            benefits: Array.isArray(job?.benefits)
                ? job.benefits.join("\n")
                : job?.benefits || "",
            tech_stack: Array.isArray(job?.tech_stack)
                ? job.tech_stack.join(", ")
                : job?.tech_stack || "",
        }
    }


    const { user, accessToken, refreshAccessToken } = useAuth()


    const [error, setError] = React.useState({})

    const [form, setForm] = React.useState(() => mapJobToForm(selectedJobs))

    React.useEffect(() => {
        if (selectedJobs) {
            setForm(mapJobToForm(selectedJobs))
        }
    }, [selectedJobs])


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

    const formattedForm = {
        ...form,

        tech_stack: form.tech_stack
            ? form.tech_stack.split(",").map(s => s.trim()).filter(Boolean)
            : [],

        requirements: form.requirements
            ? form.requirements.split("\n").map(s => s.trim()).filter(Boolean)
            : [],

        responsibility: form.responsibility
            ? form.responsibility.split("\n").map(s => s.trim()).filter(Boolean)
            : [],

        benefits: form.benefits
            ? form.benefits.split("\n").map(s => s.trim()).filter(Boolean)
            : [],
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user.role !== "employer") {
            alert('Only employers can post jobs')
            return
        }

        try {
            let res = await fetch(selectedJobs ?
                `http://localhost:5000/api/jobs/${selectedJobs.id}` :
                `http://localhost:5000/api/jobs`,
                {
                    method: selectedJobs ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(formattedForm)
                })

            if (res.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    res = await fetch(selectedJobs ?
                        `http://localhost:5000/api/jobs/${selectedJobs.id}` :
                        `http://localhost:5000/api/jobs`,
                        {
                            method: selectedJobs ? "PUT" : "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${newToken}`
                            },
                            body: JSON.stringify(formattedForm),
                            credentials: "include",
                        })
                }
            }

            const details = await res.json()
            console.log(details)

            if (res.ok) {
                setTimeout(() => {
                    alert("Post successful");
                    setForm(mapJobToForm(selectedJobs))
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
        setForm(mapJobToForm(selectedJobs))
        setError({})
        selectedJobs ? onClose() : navigate("/jobList")

    }


    return (
        <main className={styles.postContainer}>
            <section className={styles.header}>
                <h3>{selectedJobs ? `Edit Your Job Listing` : `Post New Job`}</h3>
                <p className={styles.headMessage}>
                    {selectedJobs ? `Edit Your job listing to attract top talent` : `Create a new job listing to attract top talent`}
                </p>
            </section>

            <section className={`${styles.formCard} ${styles.jobPostCard}`}>
                <p className={styles.formHeading}>Job Details</p>
                <p className={styles.formMessage}>
                    Fill in the information about the position you're hiring for
                </p>

                <form method="POST" className={`formBody ${styles.formBody}`}>
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
                        {error.salary && <p className="error">{error.salary}</p>}

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
                            {selectedJobs ? `Edit Job` : `Post Job`}
                        </button>
                    </section>
                </form>
            </section>
        </main>
    )
}
