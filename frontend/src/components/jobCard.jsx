import { CiLocationOn } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import "../styles/jobCard.css"
import React from "react";




export function JobCard({ details }) {

    const time = details.created_at
    const createdTime = time.split('T')[0]


    const T = Date.now()
    console.log(T)



    return (
        <div className="container">

            <main className="jobBox">
                <header className="heading">

                    <section className="subHeader">
                        <h2>{details.title}</h2>
                        <h4>{details.company}</h4>
                    </section>
                    <p className="jobType">{details.job_type}</p>
                </header>

                <section className="infoBar">
                    <div className="subInfo">
                        <CiLocationOn /><span>{details.location}</span>
                    </div>
                    <div className="subInfo">
                        <BsCurrencyDollar /><span>{details.salary}</span>
                    </div>
                    <div className="subInfo">
                        <IoIosTimer /><span>{createdTime}</span>
                    </div>
                </section>

                <section className="descriptionWrapper">
                    <section className="description">
                        <p>
                            {details.description}
                        </p>
                    </section>

                </section>

                <section className="techStack">
                    {details.tech_stack.map((tech, idx) => (<p key={idx} className="tag">{tech}</p>))}
                </section>

                <button className="applyButton" type="submit">Apply now</button>
            </main>

        </div>
    )
}