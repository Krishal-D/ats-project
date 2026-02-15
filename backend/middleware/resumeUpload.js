import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/resumes/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX allowed for resumes.'))
    }
}

const resumeUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

export default resumeUpload