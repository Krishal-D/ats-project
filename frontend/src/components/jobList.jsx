import { JobCard } from './jobCard'
import React from 'react'

export function JobList() {
  const [data, setData] = React.useState([])

  const [filter, setFilter] = React.useState({
    search: "",
    location: "",
    job_type: ""
  })

  const getDetails = async () => {
    const res = await fetch('http://localhost:5000/api/job')
    const details = await res.json()
    setData(details)
  }

  React.useEffect(() => {
    getDetails()
  }, [])



  const filteredOutput = data.filter(d => {

    const techStack = Array.isArray(d.tech_stack) ? d.tech_stack : [];

    return (
      (filter.search ?
        d.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        d.company.toLowerCase().includes(filter.search.toLowerCase()) ||
        techStack.some(skill =>
          skill.toLowerCase().includes(filter.search.toLowerCase())
        )
        : true) &&
      (filter.location ? d.location === filter.location : true) &&
      (filter.job_type ? d.job_type === filter.job_type : true)
    )
  }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }))
  }






  return (
    <div className="listContainer">

      <section className="header">
        <h3>Find Your Dream Job
        </h3>
        <p className="headMessage">
          Discover  exciting opportunities from top companies
        </p>
      </section>


      <section className='searchBox'>
        <input
          type="search"
          name="search"
          id="searchJob"
          placeholder='Search jobs,skills etc'
          value={filter.search}
          onChange={handleChange}
        />

        <select name="location" id="location"
          value={filter.location}
          onChange={handleChange}
        >
          <option defaultValue="" disabled>Location</option>
          {Array.from(new Set(data.map((job) => job.location))).map((l, index) => (
            <option key={index} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select name="job_type" id="job_type"
          value={filter.job_type}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select job type
          </option>
          <option value="partTime">Part-time</option>
          <option value="fullTime">Full-time</option>
          <option value="contract">Contract</option>
        </select>
      </section>


      <section className="jobList">
        {filteredOutput.map((job) => (
          <JobCard key={job.id} details={job} />
        ))}
      </section>


    </div>
  )
}
