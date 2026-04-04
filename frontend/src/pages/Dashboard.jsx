import React from 'react'
import { Link, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import '../style/dashboard.scss'

const FadeUp = ({ children, delay = 0, className = '' }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
        {children}
    </motion.div>
)

const Dashboard = () => {
    const navigate = useNavigate()

    const metrics = [
        { label: 'Resumes Analyzed', value: '12', trend: '+2 this week', trendType: 'up', icon: '📄' },
        { label: 'Interviews Prepared', value: '08', trend: 'Ready for Meta', trendType: 'neutral', icon: '🎯' },
        { label: 'Job Matches', value: '42', trend: '5 High Priority', trendType: 'priority', icon: '⭐' },
    ]

    const recentAnalyses = [
        { title: 'Senior Product Designer v2', meta: 'Last updated 2 hours ago', score: 'ATS Score: 88', icon: '📝', iconBg: '#e1e0ff' },
        { title: 'Technical Architect – FinTech Hub', meta: 'Last updated Yesterday', score: 'Match Probability: 92%', icon: '📊', iconBg: '#a2eded' },
    ]

    return (
        <div className="dashboard-page">
            {/* Welcome Header */}
            <FadeUp className="db-header">
                <div className="db-header__text">
                    <h1>Welcome back,<br /><span>Alex.</span></h1>
                    <p>Your intelligent career concierge has 3 new updates for you.</p>
                </div>
                <div className="db-header__actions">
                    <button className="db-btn db-btn--outline" onClick={() => navigate('/interview-prep')}>
                        Generate Prep Report
                    </button>
                    <button className="db-btn db-btn--primary" onClick={() => navigate('/job-match')}>
                        ✦ Analyze New Resume
                    </button>
                </div>
            </FadeUp>

            {/* Metrics Row */}
            <div className="db-metrics">
                {metrics.map((m, i) => (
                    <FadeUp key={i} delay={0.1 + i * 0.08} className="db-metric-card">
                        <span className="db-metric-card__label">{m.label}</span>
                        <span className="db-metric-card__value">{m.value}</span>
                        <span className={`db-metric-card__trend db-metric-card__trend--${m.trendType}`}>
                            {m.trendType === 'up' ? '↑ ' : m.trendType === 'priority' ? '● ' : '✓ '}
                            {m.trend}
                        </span>
                        <div className="db-metric-card__icon">{m.icon}</div>
                    </FadeUp>
                ))}
            </div>

            {/* Main 2-col grid */}
            <div className="db-main-grid">
                {/* Recent Analysis */}
                <FadeUp delay={0.3} className="db-panel">
                    <div className="db-panel__header">
                        <h2>Recent Analysis</h2>
                        <Link to="/job-match" className="db-link">View All</Link>
                    </div>
                    <div className="db-analysis-list">
                        {recentAnalyses.map((a, i) => (
                            <div key={i} className="db-analysis-item">
                                <div className="db-analysis-item__icon" style={{ background: a.iconBg }}>{a.icon}</div>
                                <div className="db-analysis-item__info">
                                    <strong>{a.title}</strong>
                                    <span>{a.meta} · {a.score}</span>
                                </div>
                                <button className="db-analysis-item__arrow">→</button>
                            </div>
                        ))}
                    </div>
                </FadeUp>

                {/* Profile Strength */}
                <FadeUp delay={0.35} className="db-panel">
                    <div className="db-panel__header">
                        <h2>Profile Strength</h2>
                    </div>
                    <div className="db-strength">
                        <div className="db-strength__score-row">
                            <span className="db-strength__label">Expert Level</span>
                            <span className="db-strength__score">82<small>/100</small></span>
                        </div>
                        <div className="db-strength__bar">
                            <motion.div
                                className="db-strength__fill"
                                initial={{ width: 0 }}
                                animate={{ width: '82%' }}
                                transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                        <div className="db-strength__items">
                            <div className="db-strength__item db-strength__item--done">
                                <span className="dot done"></span>
                                LinkedIn profile synchronized
                            </div>
                            <div className="db-strength__item">
                                <span className="dot pending"></span>
                                Add professional certification
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </div>

            {/* AI Insight Banner + Next Interview */}
            <div className="db-bottom-grid">
                {/* AI Insight */}
                <FadeUp delay={0.4} className="db-ai-insight">
                    <div className="db-ai-insight__content">
                        <span className="db-badge">✦ AI INSIGHT</span>
                        <h2>Your Resume is 15% more effective today.</h2>
                        <p>Based on current trends in Tech hiring, your recent addition of "Generative AI Workflows" has increased your visibility to recruiters at Google and Anthropic.</p>
                        <button className="db-btn db-btn--ghost-light">Refine Skill Keywords</button>
                    </div>
                    <div className="db-ai-insight__decor">
                        <div className="db-ai-decor-ring db-ai-decor-ring--1"></div>
                        <div className="db-ai-decor-ring db-ai-decor-ring--2"></div>
                        <div className="db-ai-decor-core">✦</div>
                    </div>
                </FadeUp>

                {/* Next Interview */}
                <FadeUp delay={0.45} className="db-panel db-next-interview">
                    <div className="db-panel__header">
                        <span className="db-next-label">NEXT INTERVIEW</span>
                        <span className="db-next-badge">2 DAYS LEFT</span>
                    </div>
                    <h3 className="db-next-company">Meta Platforms, Inc.</h3>
                    <p className="db-next-role">Senior UX Researcher</p>
                    <div className="db-next-avatars">
                        {['MK', 'JL', 'SR'].map((a, i) => (
                            <div key={i} className="db-avatar" style={{ marginLeft: i > 0 ? '-8px' : '0' }}>{a}</div>
                        ))}
                        <span className="db-avatar-more">+3</span>
                    </div>
                    <button className="db-btn db-btn--primary db-btn--full" onClick={() => navigate('/interview-prep')}>
                        Start Prep Session
                    </button>
                </FadeUp>
            </div>
        </div>
    )
}

export default Dashboard
