import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const JOBS = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Data Scientist", "Data Analyst", "Machine Learning Engineer",
    "DevOps Engineer", "Product Manager", "UI/UX Designer",
    "QA Engineer", "Cloud Architect", "Mobile (iOS/Android) Developer",
    "System Administrator", "Database Administrator", "Cybersecurity Engineer"
]

const SKILLS = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust",
    "Ruby", "PHP", "Swift", "Kotlin", "HTML/CSS", "React.js", "Angular", "Vue.js",
    "Node.js", "Express.js", "Django", "Spring Boot", "SQL", "PostgreSQL",
    "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud",
    "Git", "CI/CD", "Terraform", "GraphQL", "REST APIs", "Linux",
    "Figma", "Product Strategy", "Leadership", "Agile", "Data Analysis",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision"
]

// ── Searchable Skills Combobox ────────────────────────────────────────────────
const SkillsCombobox = ({ skillsList, onChange }) => {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const wrapRef = useRef(null)

    const filtered = query.length > 0
        ? SKILLS.filter(s => s.toLowerCase().includes(query.toLowerCase()) && !skillsList.includes(s))
        : SKILLS.filter(s => !skillsList.includes(s))

    const add = (skill) => {
        onChange([...skillsList, skill])
        setQuery('')
        setOpen(false)
    }

    const remove = (skill) => onChange(skillsList.filter(s => s !== skill))

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="skills-combobox" ref={wrapRef}>
            {/* Selected pills inside the input box */}
            <div className="skills-combobox__box" onClick={() => { setOpen(true) }}>
                {skillsList.map(s => (
                    <span key={s} className="skill-pill">
                        {s}
                        <button type="button" className="skill-pill__remove" onClick={(e) => { e.stopPropagation(); remove(s) }}>×</button>
                    </span>
                ))}
                <input
                    type="text"
                    className="skills-combobox__input"
                    placeholder={skillsList.length === 0 ? "Type or select skills..." : "Add more..."}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
                    onFocus={() => setOpen(true)}
                />
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {open && filtered.length > 0 && (
                    <motion.ul
                        className="skills-combobox__dropdown"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                    >
                        {filtered.slice(0, 10).map(skill => (
                            <li key={skill} className="skills-combobox__option" onMouseDown={() => add(skill)}>
                                {skill}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Job Title Combobox ────────────────────────────────────────────────────────
const JobCombobox = ({ value, onChange }) => {
    const [query, setQuery] = useState(value)
    const [open, setOpen] = useState(false)
    const wrapRef = useRef(null)

    const filtered = JOBS.filter(j => j.toLowerCase().includes(query.toLowerCase()))

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    return (
        <div className="job-combobox" ref={wrapRef}>
            <input
                type="text"
                className="combobox-input"
                placeholder="Type or select a job title..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); setOpen(true) }}
                onFocus={() => setOpen(true)}
            />
            <span className="combobox-arrow">▾</span>
            <AnimatePresence>
                {open && filtered.length > 0 && (
                    <motion.ul
                        className="skills-combobox__dropdown"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                    >
                        {filtered.map(job => (
                            <li key={job} className="skills-combobox__option" onMouseDown={() => { setQuery(job); onChange(job); setOpen(false) }}>
                                {job}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
const JobMatch = () => {
    const { loading, error, generateReport, reports, deleteReport } = useInterview()
    const [jobTitle, setJobTitle] = useState("")
    const [skillsList, setSkillsList] = useState([])
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0]
        let finalJobDescription = ""
        if (jobTitle) finalJobDescription += `Target Role: ${jobTitle}.\n`
        if (skillsList.length > 0) finalJobDescription += `Required Skills: ${skillsList.join(', ')}.\n`
        if (jobDescription) finalJobDescription += `Additional Details: ${jobDescription}`

        const data = await generateReport({ jobDescription: finalJobDescription, selfDescription, resumeFile })
        if (data) navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Analyzing your profile</h1>
                <p className='loading-hint'>This usually takes 20–40 seconds. Please don't close this tab.</p>
            </main>
        )
    }

    return (
        <div className='home-page'>
            {error && (
                <div className='error-banner floating-card'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    {error}
                </div>
            )}

            {/* ── Page Header ─────────────────────────────────────────── */}
            <header className='page-header'>
                <h1 className='page-header__title'>
                    Refine Your Path with <br/>
                    <span className='page-header__subtitle'>Intelligent Precision.</span>
                </h1>
                <p className='page-header__desc'>
                    NexHire acts as your personal career concierge, using generative intelligence to align your unique story with the world's most demanding roles.
                </p>
            </header>

            {/* ── Two-Panel Layout ─────────────────────────────────────── */}
            <div className='jm-panels'>

                {/* ── Left Panel: Resume ── */}
                <section className='panel panel-card'>
                    <div className='panel__top'>
                        <div className='panel__header'>
                            <div className='panel__icon bg-primary-container'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                            </div>
                            <h2 className='panel__heading'>Your Resume</h2>
                        </div>
                        <span className='panel__section-tag'>Section 01</span>
                    </div>

                    <div className='panel__body border-dashed'>
                        <div className='upload-hub' onClick={() => resumeInputRef.current?.click()}>
                            <div className='upload-hub__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm220-160 160-160-56-56-64 64v192h-80v-192l-64 64-56-56 160 160Z"/></svg>
                            </div>
                            <h3>Upload Professional Profile</h3>
                            <p>Drop your PDF or DOCX here, or click to browse your local storage.</p>
                            <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                        </div>
                        <div className='divider-line'></div>
                        <textarea
                            onChange={(e) => setSelfDescription(e.target.value)}
                            className='textarea-invisible'
                            placeholder="Or paste your resume content directly here..."
                            value={selfDescription}
                        />
                    </div>
                </section>

                {/* ── Right Panel: Target Role ── */}
                <section className='panel panel-card'>
                    <div className='panel__top'>
                        <div className='panel__header'>
                            <div className='panel__icon bg-secondary-container'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-40q0-33 23.5-56.5T400-840h160q33 0 56.5 23.5T640-760v40h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-40H400v40ZM160-200v-440 440Z"/></svg>
                            </div>
                            <h2 className='panel__heading'>Target Role</h2>
                        </div>
                        <span className='panel__section-tag'>Section 02</span>
                    </div>

                    <div className='panel__body panel__body--gray'>
                        {/* Job Title */}
                        <div className='form-group'>
                            <label className='form-label'>Job Title</label>
                            <JobCombobox value={jobTitle} onChange={setJobTitle} />
                        </div>

                        {/* Required Skills — searchable combobox */}
                        <div className='form-group'>
                            <label className='form-label'>Required Skills</label>
                            <SkillsCombobox skillsList={skillsList} onChange={setSkillsList} />
                        </div>

                        {/* Job Description */}
                        <div className='form-group form-group--grow'>
                            <label className='form-label'>Job Description</label>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                className='textarea-box'
                                placeholder="Paste the specific job description you are targeting to discover your compatibility score and optimization points..."
                                value={jobDescription}
                            />
                        </div>

                        <div className='info-banner'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <p>AI will look for keywords, seniority signals, and cultural fit markers.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── Analyze Button (full-width, below both panels) ─────── */}
            <div className='jm-action-row'>
                <button className='jm-analyze-btn' onClick={handleGenerateReport} disabled={loading}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#ffffff"><path d="M440-160v-387L316-423l-56-57 220-220 220 220-56 57-124-124v387h-80Z"/></svg>
                    Analyze &amp; Match
                </button>
                <p className='jm-action-hint'>Takes 20–40 seconds · AI-powered compatibility scoring</p>
            </div>

            {/* ── Previous Reports ─────────────────────────────────────── */}
            {reports.length > 0 && (
                <div className='reports-row'>
                    {reports.map(report => (
                        <div key={report._id} className='preview-card' onClick={() => navigate(`/interview/${report._id}`)}>
                            <div className='preview-card__icon bg-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                            </div>
                            <div className='preview-card__info'>
                                <div className='preview-card__tag'>Previous Strategy</div>
                                <h4 className='preview-card__title'>{report.title || 'Untitled Role'}</h4>
                                <p className='preview-card__desc'>Match Score: {report.matchScore}% &bull; {new Date(report.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default JobMatch