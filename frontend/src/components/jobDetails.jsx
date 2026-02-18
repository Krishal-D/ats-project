import React from "react"
import { CiLocationOn } from 'react-icons/ci'
import { BsCurrencyDollar } from 'react-icons/bs'
import { IoIosTimer } from 'react-icons/io'
import '../styles/jobDetails.css'
import { useParams } from "react-router-dom"
import API_BASE_URL from '../config/api'

export function Details() {

    const [data, setData] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const { id } = useParams()

    const date = data.created_at ? new Date(data.created_at) : null
    const createdTime = date && !isNaN(date) ? date.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"


    const getDetails = async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch(`${API_BASE_URL}/api/jobs/${id}`)
            if (!res.ok) {
                throw new Error('Job not found')
            }
            const details = await res.json()
            setData(Array.isArray(details) ? details[0] : details)
        } catch (err) {
            setError(err.message)
            setData({})
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getDetails()
    }, [id])

    if (!id) return null

    if (loading) {
        return (
            <div className="container">
                <div className="innerContainer">
                    <p>Loading job details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <div className="innerContainer">
                    <p>Error: {error}</p>
                </div>
            </div>
        )
    }

    if (!data || !data.title) {
        return (
            <div className="container">
                <div className="innerContainer">
                    <p>Job not found</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="innerContainer">
                <section className="detailCard">
                    <header className="header">
                        <h1>{data.title}</h1>
                        <h4>{data.company}</h4>
                    </header>

                    <section className="infoSection">
                        <div className="subInfo">
                            <CiLocationOn />
                            <span>{data.location}</span>
                        </div>
                        <div className="subInfo">
                            <BsCurrencyDollar />
                            <span>{data.salary}</span>
                        </div>
                        <div className="subInfo">
                            <IoIosTimer />
                            <span>{createdTime}</span>
                        </div>
                    </section>
                </section>

                <section className="jobDescription">
                    <h2>Job Description</h2>

                    <h3>About the Role</h3>
                    <p>
                        {data?.description}
                    </p>

                    {data.responsibility && data.responsibility.length > 0 && (
                        <section className="responsibility">
                            <h3>Responsibilities</h3>
                            <ul>
                                {data.responsibility.map((d, index) => (
                                    <li key={index}>{d}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.requirements && data.requirements.length > 0 && (
                        <section className="requirements">
                            <h3>Requirements</h3>
                            <ul>
                                {data.requirements.map((d, index) => (
                                    <li key={index}>{d}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {data.benefits && data.benefits.length > 0 && (
                        <section className="benefits">
                            <h3>Benefits</h3>
                            <ul>
                                {data.benefits.map((d, index) => (
                                    <li key={index}>{d}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </section>
            </div>
        </div>
    )
}