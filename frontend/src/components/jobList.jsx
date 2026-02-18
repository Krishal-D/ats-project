import { JobCard } from './jobCard'
import React from 'react'
import { Loading } from './Loading'
import API_BASE_URL from '../config/api'

export function JobList() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const [filter, setFilter] = React.useState({
    search: '',
    location: '',
    job_type: '',
  })

  const getDetails = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE_URL}/api/jobs`)
      const details = await res.json()
      setData(details)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getDetails()
  }, [])

  const filteredOutput = data.filter((d) => {
    const techStack = Array.isArray(d.tech_stack) ? d.tech_stack : []

    return (
      (filter.search
        ? d.title?.toLowerCase().includes(filter.search.toLowerCase()) ||
          d.company?.toLowerCase().includes(filter.search.toLowerCase()) ||
          techStack.some((skill) => skill?.toLowerCase().includes(filter.search.toLowerCase()))
        : true) &&
      (filter.location
        ? d.location?.trim().toLowerCase() === filter.location.toLowerCase()
        : true) &&
      (filter.job_type
        ? d.job_type?.toLowerCase().replace(/\s|-/g, '') === filter.job_type.toLowerCase()
        : true)
    )
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="listContainer">
      <section className="header">
        <h3>Find Your Dream Job</h3>
        <p className="headMessage">Discover exciting opportunities from top companies</p>
      </section>

      <section className="searchBox">
        <input
          type="search"
          name="search"
          id="searchJob"
          placeholder="Search jobs,skills etc"
          value={filter.search}
          onChange={handleChange}
        />

        <select name="location" id="location" value={filter.location} onChange={handleChange}>
          <option value="">All Locations</option>
          {Array.from(new Set(data.map((job) => job.location))).map((l, index) => (
            <option key={index} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select name="job_type" id="job_type" value={filter.job_type} onChange={handleChange}>
          <option value="">All Job Types</option>
          <option value="partTime">Part-time</option>
          <option value="fullTime">Full-time</option>
          <option value="contract">Contract</option>
        </select>
      </section>

      <section className="jobList">
        {loading ? (
          <Loading message="Loading jobs..." />
        ) : (
          filteredOutput.map((job) => <JobCard key={job.id} details={job} />)
        )}
      </section>
    </div>
  )
}
