import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const hasFetched = useRef(false)

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
        } catch (_err) {
            console.log(_err)  // ✅ no empty block
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (_err) {
            console.log(_err) 
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (_err) {
            console.log(_err) 
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (_err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [setLoading, setUser])  

    return { user, loading, handleRegister, handleLogin, handleLogout }
}