import { JobCard } from './jobCard'
import React from 'react'

export function JobList() {
  const [data, setData] = React.useState([])

  const getDetails = async () => {
    const res = await fetch('http://localhost:5000/api/job')
    const details = await res.json()
    setData(details)
  }

  React.useEffect(() => {
    getDetails()
  }, [])

  return (
    <div className="listContainer">
      <section className="jobList">
        {data.map((job) => (
          <JobCard key={job.id} details={job} />
        ))}
      </section>
    </div>
  )
}
