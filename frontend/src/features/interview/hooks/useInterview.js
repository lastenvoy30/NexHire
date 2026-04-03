import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect, useCallback } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports, error, setError } = context

const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)
    setError(null)
    let response = null
    try {
        response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
        setReport(response.interviewReport)
    } catch (_err) {                 
        setError("Failed to generate your interview plan. Please try again.")
        return null
    } finally {
        setLoading(false)
    }
    return response.interviewReport
}

const getReportById = useCallback(async (interviewId) => {
    setLoading(true)
    setError(null)
    let response = null
    try {
        response = await getInterviewReportById(interviewId)
        setReport(response.interviewReport)
    } catch (_err) {                  
        setError("Failed to load your interview plan. Please refresh.")
    } finally {
        setLoading(false)
    }
    return response?.interviewReport
}, [setLoading, setReport, setError])

const getReports = useCallback(async () => {
    setLoading(true)
    setError(null)
    let response = null
    try {
        response = await getAllInterviewReports()
        setReports(response.interviewReports)
    } catch (_err) {                    
        setError("Failed to load your reports.")
    } finally {
        setLoading(false)
    }
    return response?.interviewReports
}, [setLoading, setReports, setError])

const getResumePdf = async (interviewReportId) => {
    setLoading(true)
    setError(null)
    try {
        const response = await generateResumePdf({ interviewReportId })
        const html = response.html
        const html2pdf = (await import('html2pdf.js')).default
        const opt = {
            margin: [15, 15],
            filename: `resume_${interviewReportId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }
        html2pdf().set(opt).from(html).save()
    } catch (_err) {                    
        setError("Failed to generate resume PDF. Please try again.")
    } finally {
        setLoading(false)
    }
}

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId, getReportById, getReports])

    return { loading, error, report, reports, generateReport, getReportById, getReports, getResumePdf }
}