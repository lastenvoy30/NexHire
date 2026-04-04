import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../style/resume-lab.scss'

const SKILLS = ['Product Strategy', 'UI/UX Design', 'React.js', 'Data Analysis']
const VISUAL_STYLES = [
    { id: 'classic', label: 'Classic ATS' },
    { id: 'modern', label: 'Modern Duo' },
    { id: 'forward', label: 'Tech Forward' },
]

const ResumeLab = () => {
    const [activeStyle, setActiveStyle] = useState('classic')
    const [skills, setSkills] = useState(SKILLS)
    const [newSkill, setNewSkill] = useState('')
    const [experiences, setExperiences] = useState([
        {
            company: 'TechFlow Systems',
            period: 'Jan 2021 — Present',
            bullets: [
                'Led a cross-functional team of 12 to redesign the core e-commerce platform, resulting in a 45% increase in conversion rates and $2M annual revenue growth.',
                'Developed and implemented a new design system using React and Figma that reduced front-end development time by 30% across three primary product lines.',
            ],
        },
    ])

    const addSkill = () => {
        if (newSkill.trim()) {
            setSkills(prev => [...prev, newSkill.trim()])
            setNewSkill('')
        }
    }

    const removeSkill = (skill) => {
        setSkills(prev => prev.filter(s => s !== skill))
    }

    return (
        <div className="resume-lab">
            {/* Left — Editor */}
            <div className="rl-editor">
                <div className="rl-editor__header">
                    <div>
                        <h1>Resume Editor</h1>
                        <p>Drafting Alex Sterling's Professional Resume</p>
                    </div>
                </div>

                {/* Personal Details */}
                <section className="rl-section">
                    <div className="rl-section__title">
                        <span className="rl-section__icon">👤</span>
                        <h2>Personal Details</h2>
                    </div>
                    <div className="rl-field-grid">
                        <div className="rl-field">
                            <label>FULL NAME</label>
                            <input type="text" defaultValue="Alex Sterling" />
                        </div>
                        <div className="rl-field">
                            <label>PROFESSIONAL TITLE</label>
                            <input type="text" defaultValue="Senior Product Designer" />
                        </div>
                    </div>
                </section>

                {/* Professional Experience */}
                <section className="rl-section">
                    <div className="rl-section__title">
                        <span className="rl-section__icon">💼</span>
                        <h2>Professional Experience</h2>
                        <button className="rl-add-btn">+ Add Role</button>
                    </div>

                    {experiences.map((exp, i) => (
                        <div key={i} className="rl-experience">
                            <div className="rl-field-grid">
                                <div className="rl-field">
                                    <input type="text" defaultValue={exp.company} />
                                </div>
                                <div className="rl-field">
                                    <input type="text" defaultValue={exp.period} />
                                </div>
                            </div>
                            <div className="rl-bullets">
                                {exp.bullets.map((bullet, j) => (
                                    <div key={j} className="rl-bullet">
                                        <textarea defaultValue={bullet} rows={3} />
                                        <button className="rl-ai-btn">✦ AI Rewrite</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Core Competencies */}
                <section className="rl-section">
                    <div className="rl-section__title">
                        <span className="rl-section__icon">⚡</span>
                        <h2>Core Competencies</h2>
                    </div>
                    <div className="rl-skills">
                        {skills.map(skill => (
                            <span key={skill} className="rl-skill-tag">
                                {skill}
                                <button onClick={() => removeSkill(skill)}>×</button>
                            </span>
                        ))}
                        <div className="rl-skill-input">
                            <input
                                placeholder="+ Add Skill"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSkill()}
                            />
                        </div>
                    </div>
                </section>

                {/* Visual Style */}
                <section className="rl-section">
                    <label className="rl-section__sublabel">VISUAL STYLE</label>
                    <div className="rl-style-picker">
                        {VISUAL_STYLES.map(s => (
                            <button
                                key={s.id}
                                className={`rl-style-option${activeStyle === s.id ? ' rl-style-option--active' : ''}`}
                                onClick={() => setActiveStyle(s.id)}
                            >
                                <div className="rl-style-preview">
                                    {s.id === 'classic' && <div className="preview-lines"><div style={{ width: '80%' }}></div><div style={{ width: '60%' }}></div><div style={{ width: '70%' }}></div></div>}
                                    {s.id === 'modern' && <div className="preview-lines modern"><div style={{ width: '100%', background: '#1a365d', height: '4px' }}></div><div style={{ width: '70%' }}></div><div style={{ width: '50%' }}></div></div>}
                                    {s.id === 'forward' && <div className="preview-lines"><div className="preview-circle"></div><div style={{ width: '60%' }}></div></div>}
                                </div>
                                <span>{s.label}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right — Preview */}
            <div className="rl-preview">
                <div className="rl-preview__toolbar">
                    <div className="rl-preview__live">
                        <span className="live-dot"></span>
                        Live Optimization Preview
                    </div>
                    <div className="rl-preview__actions">
                        <button className="rl-preview-btn">⊡ Full Screen</button>
                        <button className="rl-preview-btn rl-preview-btn--cta">⬇ Download for ATS</button>
                    </div>
                </div>

                <div className="rl-preview__content">
                    <div className="ats-score-badge">98% ATS SCORE</div>

                    <div className="resume-preview">
                        <div className="rp-header">
                            <h1>ALEX STERLING</h1>
                            <h2>SENIOR PRODUCT DESIGNER</h2>
                            <div className="rp-contact">
                                <span>✉ alex.sterling@design.com</span>
                                <span>📍 San Francisco, CA</span>
                                <span>🔗 portfolio.design/alexs</span>
                            </div>
                        </div>

                        <div className="rp-divider"></div>

                        <div className="rp-section">
                            <div className="rp-section__label">PROFESSIONAL EXPERIENCE</div>

                            <div className="rp-job">
                                <div className="rp-job__header">
                                    <strong>TECHFLOW SYSTEMS</strong>
                                    <span>Jan 2021 – Present</span>
                                </div>
                                <div className="rp-job__title">SENIOR PRODUCT DESIGNER</div>
                                <ul>
                                    <li>Led a cross-functional team of 12 to redesign the core e-commerce platform, resulting in a <strong>45% increase in conversion rates</strong> and $2M annual revenue growth.</li>
                                    <li>Developed and implemented a new design system using React and Figma that <strong>reduced front-end development time by 30%</strong> across three primary product lines.</li>
                                    <li>Mentored junior designers and established weekly design critique sessions to improve overall output quality by 20%.</li>
                                </ul>
                            </div>

                            <div className="rp-job">
                                <div className="rp-job__header">
                                    <strong>CREATIVEPULSE</strong>
                                    <span>June 2018 – Dec 2020</span>
                                </div>
                                <div className="rp-job__title">UI DESIGNER</div>
                                <ul>
                                    <li>Architected user interfaces for 15+ mobile applications, maintaining a 4.8-star average rating across the App Store.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="rp-divider"></div>

                        <div className="rp-two-col">
                            <div className="rp-section">
                                <div className="rp-section__label">EDUCATION</div>
                                <strong>RHODE ISLAND SCHOOL OF DESIGN</strong>
                                <p>BFA in Graphic Design, 2018</p>
                            </div>
                            <div className="rp-section">
                                <div className="rp-section__label">EXPERTISE</div>
                                <div className="rp-tags">
                                    {['FIGMA', 'DESIGN SYSTEMS', 'REACT.JS', 'USER RESEARCH', 'AGILE WORKFLOW'].map(t => (
                                        <span key={t} className="rp-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="rl-ai-rec">
                        <span className="rl-ai-rec__icon">💡</span>
                        <div>
                            <strong>AI Recommendation</strong>
                            <p>Your "Senior Product Designer" role description is strong, but adding more <strong>quantifiable metrics</strong> for the Creative Pulse role would increase your job match score by <strong>+12%</strong>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeLab
