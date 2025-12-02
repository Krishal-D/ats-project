import React from "react"
import '../styles/form.css'
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";


export function Apply() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, accessToken, refreshAccessToken } = useAuth()

    const [jobData, setJobData] = React.useState({})
    const [form, setForm] = React.useState({
        cover_letter: '',
        resume: null
    })

    React.useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/jobs/${id}`)
                if (res.ok) {
                    const jobDetails = await res.json()
                    setJobData(Array.isArray(jobDetails) ? jobDetails[0] : jobDetails)
                }
            } catch (err) {
                console.error('Error fetching job details:', err)
            }
        }

        if (id) {
            fetchJob()
        }
    }, [id])


    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user.role !== "candidate") {
            alert('Only candidates can apply for jobs')
            return
        }

        const formData = new FormData()
        formData.append('user_id', user.id)
        formData.append('job_id', id)
        formData.append('status', 'pending')
        formData.append('cover_letter', form.cover_letter)
        if (form.resume) {
            formData.append('resume', form.resume)
        }

        try {
            let res = await fetch(`http://localhost:5000/api/applications`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData
            })

            if (res.status === 401) {
                const newToken = await refreshAccessToken()
                if (newToken) {
                    res = await fetch(`http://localhost:5000/api/applications`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${newToken}`
                        },
                        body: formData
                    })
                }
            }

            if (res.ok) {
                alert('Application submitted successfully!')
                navigate('/jobList')
            } else {
                const error = await res.json()
                console.error('Submission error:', error)
                alert('Failed to submit application. Please try again.')
            }
        } catch (err) {
            console.error('Error submitting application:', err)
            alert('An error occurred. Please try again.')
        }
    }



    return (

        <main className="applicationForm">
            <h1>Apply for {jobData.title || 'Position'}</h1>
            <p>Complete the form below to submit your application</p>
            <section className="formCard">
                <h3>Application Form</h3>
                <form method="post" className="formBody" onSubmit={handleSubmit}>
                    <h3>Personal Information</h3>

                    <label htmlFor="user_name">Full Name</label>
                    <input
                        type="text"
                        value={user?.name || ''}
                        id="user_name"
                        name="user_name"
                        readOnly
                        style={{ backgroundColor: '#f5f5f5' }}
                    />

                    <label htmlFor="user_email">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        id="user_email"
                        name="user_email"
                        readOnly
                        style={{ backgroundColor: '#f5f5f5' }}
                    />

                    <label htmlFor="jobTitle">Job Title</label>
                    <input
                        type="text"
                        value={jobData.title || ''}
                        id="jobTitle"
                        name="jobTitle"
                        readOnly
                        style={{ backgroundColor: '#f5f5f5' }}
                    />

                    <label htmlFor="cover_letter">Cover Letter*</label>
                    <h6>Why are you a good fit for this role?</h6>
                    <textarea
                        name="cover_letter"
                        id="cover_letter"
                        value={form.cover_letter}
                        onChange={handleChange}
                        placeholder="Tell us why you are interested in this position..."
                        required
                    />

                    <label htmlFor="resume" className="upload-box">
                        <span className="upload-title">Upload Resume*</span>
                        <div className="upload-content">
                            <p>Click to add resume</p>
                            <p>(PDF, DOC, DOCX – Max 5MB)</p>
                        </div>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                            required
                        />
                    </label>

                    <button className="postButton" type="submit">
                        Submit Application
                    </button>
                </form>
            </section>
        </main>


    )
}