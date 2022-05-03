import { useRef, useState, useCallback, useEffect } from "react"

export const useHttpHook = () => {
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState()
    const activeRequest = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setisLoading(true)
        const abortController = new AbortController()
        activeRequest.current.push(abortController)

        try {
            const res = await fetch(url, {
                method, body, headers,
                signal: abortController.signal
            })

            const resData = await res.json()
            activeRequest.current = activeRequest.current.filter(
                req => req !== abortController
            )

            if (!res.ok) {
                throw new Error(resData.msg)
            }
            setisLoading(false)
            return resData
        } catch (err) {
            setisLoading(false)
            setError(err.message || err.msg || 'Something went wrong, please try again!')
            throw error
        }
    }, [error])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeRequest.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])

    return { isLoading, error, sendRequest, clearError }
}