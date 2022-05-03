import { useCallback, useEffect, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(false)

    const login = useCallback((userId, token) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('user', JSON.stringify({ userId: userId, token: token }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('user')
    }, [])

    useEffect(() => {
        const storeData = JSON.parse(localStorage.getItem('user'))
        if(storeData && storeData.token) {
            login(storeData.userId, storeData.token)
        }
    },[login])

    return { token, login, logout, userId }

}