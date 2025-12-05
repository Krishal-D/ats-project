import '../styles/dashboard.css'
import React from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/authContext"
import { JobCard } from "../components/jobCard"


export function Dashboard() {

    const boxes = [
        { id: 1, title: "Applications Submitted" },
        { id: 2, title: "Under Review" },
        { id: 3, title: "Shortlisted" },
        { id: 4, title: "Saved Jobs" },
    ]

    const navigate = useNavigate()
    const { user, accessToken, refreshAccessToken } = useAuth()

    const [activeTab, setActiveTab] = React.useState('applications')
    const [applications, setApplications] = React.useState([])
    const [recommendedJobs, setRecommendedJobs] = React.useState([])

    React.useEffect(() => {
        const fetchData = async () => {
            if (!user || !accessToken) return

            try {
                const fetchApplications = async () => {
                    let res = await fetch(`http://localhost:5000/api/applications/myapplication`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    if (res.status === 401) {
                        const newToken = await refreshAccessToken()
                        if (newToken) {
                            res = await fetch(`http://localhost:5000/api/applications/myapplication`, {
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
                        setApplications(data)
                    }
                }

                const fetchRecommendedJobs = async () => {
                    const res = await fetch('http://localhost:5000/api/jobs', {
                        method: 'GET',
                        credentials: 'include'
                    })
                    if (res.ok) {
                        const data = await res.json()
                        setRecommendedJobs(data)
                    }
                }

                await Promise.all([fetchApplications(), fetchRecommendedJobs()])
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            }
        }

        fetchData()
    }, [user, accessToken, refreshAccessToken])

    function browse() {
        navigate(`/jobList`)
    }

    return (
        <main className="dashboardContainer">
            <header className='dashboardHeader'>
                <section className='dashboardHeading'>
                    <h2>My Dashboard</h2>
                    <p>Track your applications and discover new opportunities</p>
                </section>
                <button className="browseJobsButton" onClick={browse}>Browse Jobs</button>
            </header>

            <section className='itemBoxes'>
                {boxes.map((box) => (
                    <div key={box.id} className="box">
                        <p className='boxTitle'>{box.title}</p>
                        <p className='totalItem'>
                            {
                                box.id === 1
                                    ? applications.length
                                    : box.id === 2
                                        ? applications.filter(app => app.status === "pending").length
                                        : box.id === 3
                                            ? applications.filter(app => app.status === "shortlisted").length
                                            : 0
                            }                        </p>
                    </div>
                ))}
            </section>

            <section className='chooseButton'>
                <button
                    className={`applicationsButton ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    My Applications
                </button>
                <button
                    className={`recommendButton ${activeTab === 'recommendedJobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recommendedJobs')}
                >
                    Recommended Jobs
                </button>
            </section>

            {activeTab === 'applications' && (
                <div className='applicationsSection'>
                    {applications.length === 0 ? (
                        <div className='emptyState'>
                            <h3>You haven't applied to any jobs yet</h3>
                            <button onClick={browse}>Browse Available Jobs</button>
                        </div>
                    ) : (
                        <div className='applicationsList'>
                            <h3>Application History</h3>
                            <p>Track the status of your job applications</p>
                            {applications.map((application) => (
                                <div key={application.applicant_id} className='applicationCard'>
                                    <h4>{application.job_title}</h4>
                                    <p>{application.company}</p>
                                    <span className={`status ${application.status}`}>
                                        {application.status}
                                    </span>
                                    <p className='appliedDate'>
                                        Applied: {new Date(application.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric', })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'recommendedJobs' && (
                <div className='recommendedJobsSection'>
                    {recommendedJobs.length === 0 ? (
                        <div className='emptyState'>
                            <h3>No recommended jobs available</h3>
                            <p>Check back later for personalized job recommendations</p>
                        </div>
                    ) : (
                        <div className='recommendedJobsList'>
                            <h3>Jobs available for you</h3>
                            <p>Personalized job recommendations</p>
                            {recommendedJobs.slice(0, 3).map((job) => (
                                <JobCard key={job.id} details={job} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </main>
    )
}