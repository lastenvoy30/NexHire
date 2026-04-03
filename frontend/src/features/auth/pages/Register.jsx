import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return <main className='loading-screen'><h1>Creating your account</h1></main>
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
                    <h1>Create account</h1>
                    <p>Start preparing smarter, not harder</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type='text' id='username' name='username'
                            placeholder='johndoe' />
                    </div>
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
                            placeholder='Create a strong password' />
                    </div>
                    <button type='submit' className='auth-submit'>Create Account</button>
                </form>

                <p className='auth-footer'>
                    Already have an account?
                    <Link to='/login'>Sign in</Link>
                </p>

            </div>
        </main>
    )
}

export default Register