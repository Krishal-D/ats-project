import { findAllJobs, findJobById, createJobs, editJobs, removeJobs } from "../models/jobModel.js";

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

export const registerJobs = async (req, res, next) => {
    try {
        const { title, description, location, salary, created_at } = req.body

        const jobs = await createJobs(title, description, location, salary, created_at)
        res.status(200).json(jobs)

    } catch (err) {
        next(err)
    }
}

export const updateJobs = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, location, salary, created_at } = req.body

        const jobs = await editJobs( title, description, location, salary, created_at,id)

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

