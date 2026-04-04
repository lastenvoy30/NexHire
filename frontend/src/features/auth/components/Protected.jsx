import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
        return <div style={{ visibility: 'hidden', minHeight: '100vh' }} />
    }

    if(!user){
        return <Navigate to={'/login'} />
    }
    
    return children
}

export default Protected