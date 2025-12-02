import { findAllApplication, findApplicationById, createApplication, updateApplication, deleteApplication, findApplicationByUserId } from "../models/applicationModel.js";

export const getApplication = async (req, res, next) => {

    try {
        const applications = await findAllApplication()
        res.json(applications)
    } catch (err) {
        next(err)
    }

}

export const getApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params
        const application = await findApplicationById(id)

        if (!application) {
            return res.status(404).json({ err: 'application not found' })
        }

        res.json(application)
    } catch (err) {
        next(err)
    }

}


export const registerApplication = async (req, res, next) => {
    try {
        const { user_id, job_id, status, cover_letter } = req.body

        const resume_path = req.file ? req.file.path : undefined;

        const application = await createApplication(user_id, job_id, status, cover_letter, resume_path)

        res.status(200).json(application)

    } catch (err) {
        next(err)
    }
}

export const editApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const resume_path = req.file ? req.file.path : undefined;

        const application = await updateApplication(status, resume_path, id)
        res.json(application)
    } catch (err) {
        next(err)
    }
}


export const removeApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const application = await deleteApplication(id)

        res.json(application)
    } catch (err) {
        next(err)
    }
}


export const getApplicationByUserId = async (req, res) => {
    try {
        const { user_id } = req.user.id
        const application = await findApplicationByUserId(user_id)

        res.json(application)
    } catch (err) {
        next(err)
    }
}