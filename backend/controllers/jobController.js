import {
  findAllJobs,
  findJobById,
  createJobs,
  editJobs,
  removeJobs,
  findJobsByRecruiterId
} from '../models/jobModel.js'

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await findAllJobs()
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}

export const getJobsById = async (req, res, next) => {
  try {
    const { id } = req.params
    const jobs = await findJobById(id)
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}

export const getJobsByRecruiterId = async (req, res, next) => {
  try {
    const recruiter_id = req.user.id
    const jobs = await findJobsByRecruiterId(recruiter_id)
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}


export const registerJobs = async (req, res, next) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits
    } = req.body

    const recruiter_id = req.user.id

    const jobs = await createJobs(
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits,
      recruiter_id
    )
    res.status(200).json(jobs)
  } catch (err) {
    next(err)
  }
}

export const updateJobs = async (req, res, next) => {
  try {
    const { id } = req.params
    const {
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits
    } = req.body
    const jobs = await editJobs(
      title,
      company,
      description,
      location,
      salary,
      job_type,
      tech_stack,
      requirements,
      responsibility,
      benefits,
      id
    )
    res.json(jobs)
  } catch (err) {
    next(err)
  }
}

export const deleteJobs = async (req, res, next) => {
  try {
    const { id } = req.params
    const jobs = await removeJobs(id)

    res.json(jobs)
  } catch (err) {
    next(err)
  }
}
