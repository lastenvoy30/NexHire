import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return <main className='loading-screen'><h1>Signing you in</h1></main>
    }

    return (
        <main className='auth-page'>
            <div className='form-container'>

                <div className='auth-brand'>
                    <div className='auth-brand__logo'>
                        <span>NexHire</span>
                    </div>
                    <p className='auth-brand__tagline'>AI-Powered Interview Preparation</p>
                </div>

                <div className='form-header'>
                    <h1>Welcome back</h1>
                    <p>Sign in to continue to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type='email' id='email' name='email'
                            placeholder='you@example.com' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type='password' id='password' name='password'
                            placeholder='Enter your password' />
                    </div>
                    <button type='submit' className='auth-submit'>Sign In</button>
                </form>

                <p className='auth-footer'>
                    Don't have an account?
                    <Link to='/register'>Create one</Link>
                </p>

            </div>
        </main>
    )
}

export default Login