import { findAllApplication, findApplicationById, createApplication, updateApplicationStatus, updateResume, deleteApplication, findApplicationByUserId, findUserByJobId } from "../models/applicationModel.js";
import { ApiError } from "../utils/apiError.js";

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
            return next(new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found'))
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

export const editApplicationStatus = async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body

        const application = await updateApplicationStatus(status, id)
        if (!application) {
            return next(new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found'))
        }

        res.json(application)
    } catch (err) {
        next(err)
    }
}


export const editResume = async (req, res, next) => {
    try {
        const { id } = req.params
        const resume_path = req.file ? req.file.path : undefined;
        const application = await updateResume(resume_path, id)
        if (!application) {
            return next(new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found'))
        }

        res.json(application)
    } catch (err) {
        next(err)
    }
}



export const removeApplication = async (req, res, next) => {
    try {
        const { id } = req.params
        const application = await deleteApplication(id)

        if (!application) {
            return next(new ApiError(404, 'APPLICATION_NOT_FOUND', 'Application not found'))
        }

        res.json(application)
    } catch (err) {
        next(err)
    }
}


export const getApplicationByUserId = async (req, res, next) => {
    try {
        const user_id = req.user.id
        const applications = await findApplicationByUserId(user_id)

        res.json(applications)
    } catch (err) {
        next(err)
    }
}

export const getUserByJobId = async (req, res, next) => {
    try {
        const { job_id } = req.params
        const applications = await findUserByJobId(job_id)

        res.json(applications)
    } catch (err) {
        next(err)
    }
}