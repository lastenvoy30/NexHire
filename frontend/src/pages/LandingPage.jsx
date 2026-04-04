import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../style/landing.scss'

// ── Abstract animated canvas for hero background ──────────────────────
const AbstractCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animFrameId
        let time = 0

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }

        const drawNode = (x, y, r, alpha) => {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(19, 105, 106, ${alpha})`
            ctx.fill()
        }

        const drawConnection = (x1, y1, x2, y2, alpha) => {
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = `rgba(0, 32, 69, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
        }

        const nodes = Array.from({ length: 22 }, (_, i) => ({
            baseX: (Math.random() * 0.9 + 0.05) * 800,
            baseY: (Math.random() * 0.9 + 0.05) * 480,
            speed: Math.random() * 0.4 + 0.1,
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 20 + 8,
            size: Math.random() * 3 + 2,
        }))

        const animate = () => {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
            time += 0.006

            // Background gradient
            const grad = ctx.createRadialGradient(400, 240, 0, 400, 240, 500)
            grad.addColorStop(0, 'rgba(163, 237, 237, 0.12)')
            grad.addColorStop(0.5, 'rgba(214, 227, 255, 0.08)')
            grad.addColorStop(1, 'rgba(247, 249, 251, 0)')
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

            const positions = nodes.map(n => ({
                x: n.baseX + Math.cos(n.angle + time * n.speed) * n.radius,
                y: n.baseY + Math.sin(n.angle + time * n.speed * 0.7) * n.radius,
                size: n.size,
            }))

            // Draw connections
            positions.forEach((a, i) => {
                positions.slice(i + 1).forEach(b => {
                    const dist = Math.hypot(a.x - b.x, a.y - b.y)
                    if (dist < 140) {
                        drawConnection(a.x, a.y, b.x, b.y, (1 - dist / 140) * 0.12)
                    }
                })
            })

            // Draw nodes
            positions.forEach(n => {
                const pulse = 1 + Math.sin(time * 2 + n.x) * 0.15
                drawNode(n.x, n.y, n.size * pulse, 0.35)
                drawNode(n.x, n.y, n.size * pulse * 0.4, 0.7)
            })

            animFrameId = requestAnimationFrame(animate)
        }

        resize()
        animate()
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(animFrameId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="hero-canvas" />
}

// ── Scroll-triggered section wrapper ─────────────────────────────────
const FadeUp = ({ children, delay = 0, className = '' }) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
        {children}
    </motion.div>
)

// ── Feature cards data ────────────────────────────────────────────────
const FEATURES = [
    {
        icon: '⬡',
        iconBg: 'teal',
        title: 'Intelligent Resume Analysis',
        desc: 'Upload your resume to receive an instant deep-dive. Our AI identifies skill gaps, optimizes for ATS, and suggests powerful action verbs to increase callbacks.',
        tags: ['ATS Optimization', 'Skill Mapping'],
    },
    {
        icon: '◈',
        iconBg: 'navy',
        title: 'Semantic Job Matching',
        desc: 'Go beyond keywords. Our AI understands the nuances of your experience and teaches you the skills you need while you\'re actively there.',
        tags: ['Deep Semantic AI', 'Cultural Fit'],
        featured: true,
    },
    {
        icon: '◎',
        iconBg: 'indigo',
        wide: true,
        title: 'AI Interview Prep Reports',
        desc: 'Receive a comprehensive post-simulation report. We analyze your body language, speech patterns, and technical accuracy to give you the competitive edge.',
        badge: '4.8/5 AVG. CONFIDENCE SCORE',
    },
]

// ── Stats ─────────────────────────────────────────────────────────────
const STATS = [
    { value: '10,000+', label: 'Professionals Placed' },
    { value: '92%', label: 'Interview Success Rate' },
    { value: '3×', label: 'Faster Job Search' },
]

const LandingPage = () => {
    const { scrollYProgress } = useScroll()
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

    return (
        <div className="landing-page">
            {/* ── Navbar ───────────────────────────────────────────── */}
            <nav className="lp-nav">
                <div className="lp-nav__logo">Nex<span>Hire</span></div>
                <div className="lp-nav__links">
                    {['Dashboard', 'Resume Lab', 'Job Match', 'Interview Prep'].map((tab, i) => (
                        <Link
                            key={i}
                            to={`/${tab.toLowerCase().replace(' ', '-')}`}
                            className="lp-nav__link"
                        >
                            {tab}
                        </Link>
                    ))}
                </div>
                <div className="lp-nav__actions">
                    <Link to="/login" className="lp-btn lp-btn--ghost">Log In</Link>
                    <Link to="/register" className="lp-btn lp-btn--primary">Get Started</Link>
                </div>
            </nav>

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className="lp-hero">
                <AbstractCanvas />
                <motion.div className="lp-hero__content" style={{ y: heroY, opacity: heroOpacity }}>
                    <motion.div
                        className="lp-hero__badge"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        ✦ Next-Gen Career Intelligence
                    </motion.div>
                    <motion.h1
                        className="lp-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Master Your Next<br />Interview with<br />
                        <span className="lp-hero__title-accent">Gemini-Powered</span><br />
                        Insights.
                    </motion.h1>
                    <motion.p
                        className="lp-hero__sub"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                    >
                        NexHire acts as your personal career concierge, using advanced AI<br />
                        to bridge the gap between your potential and your dream role.
                    </motion.p>
                    <motion.div
                        className="lp-hero__ctas"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <Link to="/register" className="lp-btn lp-btn--primary lp-btn--lg">Get Started Free</Link>
                        <button className="lp-btn lp-btn--outline lp-btn--lg">View Demo</button>
                    </motion.div>
                </motion.div>

                {/* ── Hero Dashboard Mockup ───────────────────────── */}
                <motion.div
                    className="lp-hero__mockup"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Main Score Card */}
                    <div className="hm-card hm-card--main">
                        <div className="hm-card__label">INTERVIEW READINESS</div>
                        <div className="hm-score-ring">
                            <svg viewBox="0 0 100 100" className="hm-ring-svg">
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#e0e3e5" strokeWidth="8"/>
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#13696a" strokeWidth="8"
                                    strokeDasharray="237" strokeDashoffset="33"
                                    strokeLinecap="round" transform="rotate(-90 50 50)"/>
                            </svg>
                            <div className="hm-ring-label">
                                <span className="hm-ring-value">86</span>
                                <span className="hm-ring-unit">/100</span>
                            </div>
                        </div>
                        <div className="hm-skill-bars">
                            {[['Confidence', 88, '#13696a'], ['Clarity', 76, '#1910af'], ['Technical', 91, '#002045']].map(([lab, val, col]) => (
                                <div className="hm-skill-row" key={lab}>
                                    <span>{lab}</span>
                                    <div className="hm-bar"><div className="hm-bar__fill" style={{ width: `${val}%`, background: col }}></div></div>
                                    <strong>{val}%</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Tip Floating Card */}
                    <motion.div
                        className="hm-card hm-card--tip"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    >
                        <span className="hm-tip-icon">✦</span>
                        <p><strong>AI Insight:</strong> Use the STAR method for your "Conflict Resolution" answer to increase score by <strong>+9 pts</strong>.</p>
                    </motion.div>

                    {/* Match Badge */}
                    <motion.div
                        className="hm-card hm-card--match"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.8 }}
                    >
                        <span className="hm-match-pct">94%</span>
                        <span className="hm-match-label">Job Match</span>
                        <span className="hm-match-role">Sr. Product Designer ↗</span>
                    </motion.div>

                    {/* Skill Pills Row */}
                    <div className="hm-card hm-card--skills">
                        <span className="hm-skills-label">TOP MATCHED SKILLS</span>
                        <div className="hm-pills">
                            {['React.js', 'Figma', 'Leadership', 'Data Analysis'].map(s => (
                                <span key={s} className="hm-pill">{s}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="lp-hero__scroll-hint">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    >
                        ↓
                    </motion.div>
                </div>
            </section>

            {/* ── Stats ────────────────────────────────────────────── */}
            <section className="lp-stats">
                {STATS.map((s, i) => (
                    <FadeUp key={i} delay={i * 0.1} className="lp-stat">
                        <span className="lp-stat__value">{s.value}</span>
                        <span className="lp-stat__label">{s.label}</span>
                    </FadeUp>
                ))}
            </section>

            {/* ── Precision Tools ──────────────────────────────────── */}
            <section className="lp-features">
                <FadeUp className="lp-features__header">
                    <h2>Precision Tools for Modern Careers.</h2>
                    <p>We've reimagined the job search as a seamless, data-driven journey.<br />No more guessing, just growth.</p>
                </FadeUp>

                <div className="lp-features__grid">
                    {FEATURES.map((f, i) => (
                        <FadeUp key={i} delay={i * 0.12} className={`feature-card${f.featured ? ' feature-card--featured' : ''}${f.wide ? ' feature-card--wide' : ''}`}>
                            <div className={`feature-card__icon feature-card__icon--${f.iconBg}`}>{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                            {f.tags && (
                                <div className="feature-card__tags">
                                    {f.tags.map(t => (
                                        <span key={t} className="feature-tag">{t}</span>
                                    ))}
                                </div>
                            )}
                            {f.badge && <div className="feature-card__badge">{f.badge}</div>}
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ── Testimonial ──────────────────────────────────────── */}
            <section className="lp-testimonial">
                <div className="lp-testimonial__visual">
                    {/* Polished metrics stats panel – no humans */}
                    <div className="tm-stats-panel">
                        <div className="tm-stats-panel__header">
                            <span className="tm-panel-label">CAREER IMPACT</span>
                            <span className="tm-panel-since">Since joining NexHire</span>
                        </div>
                        <div className="tm-big-stat">
                            <span className="tm-big-val">+47%</span>
                            <span className="tm-big-desc">Increase in Recruiter Responses</span>
                        </div>
                        <div className="tm-metrics-grid">
                            <div className="tm-metric">
                                <span className="tm-metric__val">3.2x</span>
                                <span className="tm-metric__lab">Faster Offers</span>
                            </div>
                            <div className="tm-metric">
                                <span className="tm-metric__val">92%</span>
                                <span className="tm-metric__lab">Interview Pass Rate</span>
                            </div>
                            <div className="tm-metric tm-metric--wide">
                                <div className="tm-bar-row">
                                    <span>Before NexHire</span>
                                    <div className="tm-bar"><div className="tm-bar__fill" style={{ width: '32%', background: '#c4c6cf' }}></div></div>
                                    <span>32%</span>
                                </div>
                                <div className="tm-bar-row">
                                    <span>After NexHire</span>
                                    <div className="tm-bar"><div className="tm-bar__fill" style={{ width: '88%', background: '#13696a' }}></div></div>
                                    <span>88%</span>
                                </div>
                                <span className="tm-bar-note">Interview Confidence Score</span>
                            </div>
                        </div>
                        <div className="tm-source">Based on 10,000+ user outcomes · Updated monthly</div>
                    </div>
                </div>
                <FadeUp className="lp-testimonial__content">
                    <span className="lp-label">EXPERT PERSPECTIVES</span>
                    <h2>The career advisor<br />that never sleeps.</h2>
                    <blockquote>
                        "NexHire didn't just fix my resume. It changed how I speak about my value. The interview prep reports felt like having a senior director coaching me through every question."
                    </blockquote>
                    <div className="testimonial-author">
                        <div className="testimonial-author__avatar">SJ</div>
                        <div>
                            <strong>Sarah Jenkins</strong>
                            <span>Senior Product Manager at Salesforce</span>
                        </div>
                    </div>
                </FadeUp>
            </section>

            {/* ── CTA Banner ───────────────────────────────────────── */}
            <FadeUp>
                <section className="lp-cta-banner">
                    <div className="lp-cta-banner__bg">
                        <div className="cta-glow cta-glow--1"></div>
                        <div className="cta-glow cta-glow--2"></div>
                    </div>
                    <div className="lp-cta-banner__content">
                        <h2>Ready for your breakthrough?</h2>
                        <p>Join 10,000+ professionals using NexHire to secure roles at top-tier tech companies.</p>
                        <Link to="/register" className="lp-btn lp-btn--white lp-btn--lg">Start Your Free Trial</Link>
                        <span className="lp-cta-banner__note">We never use your data in design submissions.</span>
                    </div>
                </section>
            </FadeUp>

            {/* ── Footer ───────────────────────────────────────────── */}
            <footer className="lp-footer">
                <div className="lp-footer__brand">
                    <strong>NexHire</strong>
                    <span>© 2024 NexHire AI. Your Intelligent Career Concierge.</span>
                </div>
                <div className="lp-footer__links">
                    {['Privacy Policy', 'Terms of Service', 'AI Ethics', 'Contact Support'].map(l => (
                        <a key={l} href="#">{l}</a>
                    ))}
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
