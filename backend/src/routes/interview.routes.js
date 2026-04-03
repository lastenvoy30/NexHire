const express = require("express")
const rateLimit = require("express-rate-limit")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

// ── Rate Limiters ─────────────────────────────────────────────────────────────

const reportGenerationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 3,                    // 3 requests per window
    message: {
        message: "Too many interview reports generated. Please wait 15 minutes before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
})

const resumeLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // 1 hour
    max: 2,                     // 2 requests per window
    message: {
        message: "Too many resume requests. Please wait 15 minutes before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false,
})

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * @route POST /api/interview/
 * @description generate new interview report
 * @access private
 */
interviewRouter.post("/", authMiddleware.authUser, reportGenerationLimiter, upload.single("resume"), interviewController.generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authMiddleware.authUser, resumeLimiter, interviewController.generateResumePdfController)

/**
 * @route DELETE /api/interview/:interviewId
 * @description delete interview report by interviewId
 * @access private
 */
interviewRouter.delete("/:interviewId", authMiddleware.authUser, interviewController.deleteInterviewReportController)


module.exports = interviewRouter