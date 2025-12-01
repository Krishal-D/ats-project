import React from "react"
import { CiLocationOn } from 'react-icons/ci'
import { BsCurrencyDollar } from 'react-icons/bs'
import { IoIosTimer } from 'react-icons/io'
import '../styles/jobDetails.css'
import { useParams } from "react-router-dom"

export function Details() {

    const [data, setData] = React.useState({})
    const { id } = useParams()

    const date = new Date(data.created_at)
    const createdTime = date ? date.toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A"


    const getDetails = async () => {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`)
        const details = await res.json()
        setData(Array.isArray(details) ? details[0] : details);

    }

    React.useEffect(() => {
        getDetails()
    }, [id])



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

                    <section className="responsibility">
                        <h3>Responsibilities</h3>
                        <ul>
                            {data.responsibility?.map((d, index) => (
                                <li key={index}>{d}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="requirements">
                        <h3>Requirements</h3>
                        <ul>
                            {data.requirements?.map((d, index) => (
                                <li key={index}>{d}</li>
                            ))}
                        </ul>

                    </section>


                    <section className="benefits">
                        <h3>Benefits</h3>
                        <ul>
                            {data.benefits?.map((d, index) => (
                                <li key={index}>{d}</li>
                            ))}
                        </ul>
                    </section>

                </section>

            </div>
        </div>
    )
}