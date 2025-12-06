import '../styles/dashboard.css'
import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext"
import { JobCard } from "../components/jobCard"


export function RecruiterDashboard() {

    const boxes = [
        { id: 1, title: "Active Jobs" },
        { id: 2, title: "Total Applications" },
        { id: 3, title: "Interview Scheduled" },
        { id: 4, title: "Shortlisted" },
    ]

    const navigate = useNavigate()
    const { user, accessToken, refreshAccessToken } = useAuth()

    const [activeTab, setActiveTab] = React.useState('myJobs')
    const [myJobs, setMyJobs] = React.useState([])
    const [candidates, setCandidates] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            if (!user || !accessToken) return

            try {
                // Fetch recruiter's jobs
                const fetchMyJobs = async () => {
                    let res = await fetch(`http://localhost:5000/api/jobs/myjobs`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.status === 401) {
                        const newToken = await refreshAccessToken()
                        if (newToken) {
                            res = await fetch(`http://localhost:5000/api/jobs/myjobs`, {
                                method: 'GET',
                                credentials: 'include',
                                headers: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            })
                        }
                    }

                    if (res.ok) {
                        const data = await res.json()
                        setMyJobs(data)
                    }
                }

                // Fetch candidates who applied to recruiter's jobs
                const fetchCandidates = async () => {
                    let res = await fetch(`http://localhost:5000/api/applications`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.status === 401) {
                        const newToken = await refreshAccessToken()
                        if (newToken) {
                            res = await fetch(`http://localhost:5000/api/applications`, {
                                method: 'GET',
                                credentials: 'include',
                                headers: {
                                    Authorization: `Bearer ${newToken}`
                                }
                            })
                        }
                    }

                    if (res.ok) {
                        const data = await res.json()
                        setCandidates(data)
                    }
                }

                await Promise.all([fetchMyJobs(), fetchCandidates()])
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            }
        }

        fetchData()
    }, [user, accessToken, refreshAccessToken])

    function postNewJob() {
        navigate(`/addJob`)
    }

    return (
        <main className="dashboardContainer">
            <header className='dashboardHeader'>
                <section className='dashboardHeading'>
                    <h2>Recruiter Dashboard</h2>
                    <p>Manage your jobs and track applications</p>
                </section>
                <button className="browseJobsButton" onClick={postNewJob}>Post New Job</button>
            </header>

            <section className='itemBoxes'>
                {boxes.map((box) => (
                    <div key={box.id} className="box">
                        <p className='boxTitle'>{box.title}</p>
                        <p className='totalItem'>
                            {
                                box.id === 1
                                    ? myJobs.length
                                    : box.id === 2
                                        ? candidates.length
                                        : box.id === 3
                                            ? candidates.filter(app => app.status === "reviewed").length
                                            : candidates.filter(app => app.status === "shortlisted").length
                            }
                        </p>
                    </div>
                ))}
            </section>

            <section className='chooseButton'>
                <button
                    className={`applicationsButton ${activeTab === 'myJobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('myJobs')}
                >
                    My Jobs
                </button>
                <button
                    className={`recommendButton ${activeTab === 'candidates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('candidates')}
                >
                    Candidates
                </button>
            </section>

            {activeTab === 'myJobs' && (
                <div className='applicationsSection'>
                    {myJobs.length === 0 ? (
                        <div className='emptyState'>
                            <h3>You haven't posted any jobs yet</h3>
                            <button onClick={postNewJob}>Post Your First Job</button>
                        </div>
                    ) : (
                        <div className='applicationsList'>
                            <h3>My Posted Jobs</h3>
                            <p>Manage and track your job postings</p>
                            {myJobs.map((job) => (
                                <JobCard key={job.id} details={job} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'candidates' && (
                <div className='recommendedJobsSection'>
                    {candidates.length === 0 ? (
                        <div className='emptyState'>
                            <h3>No applications received yet</h3>
                            <p>Post jobs to start receiving applications from candidates</p>
                        </div>
                    ) : (
                        <div className='recommendedJobsList'>
                            <h3>Job Applications</h3>
                            <p>Review and manage candidate applications</p>
                            {candidates.map((application) => (
                                <div key={application.applicant_id} className='applicationCard'>
                                    <h4>{application.user_name}</h4>
                                    <p><strong>Applied for:</strong> {application.job_title}</p>
                                    <p><strong>Email:</strong> {application.user_email}</p>
                                    <span className={`status ${application.status}`}>
                                        {application.status}
                                    </span>
                                    <p className='appliedDate'>
                                        Applied: {new Date(application.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}