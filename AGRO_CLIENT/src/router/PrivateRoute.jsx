import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/UseAuth"

export const PrivateRoute = ({children}) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}