import React, { useEffect, useState } from 'react'
import { useHttpHook } from '../../hooks/http-hook'
import UsersList from './UsersList'

import './users.css'

const Users = props => {
    const { isLoading, sendRequest } = useHttpHook()
    const [loadedUsers, setLoadedUsers] = useState()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resData = await sendRequest('http://localhost:5000/api/users')
                setLoadedUsers(resData.users)
            } catch (error) {

            }
        }
        fetchUser()
    }, [sendRequest])
    return (
        <React.Fragment>
            {!isLoading && loadedUsers && <UsersList users={loadedUsers} />}
        </React.Fragment>
    )
}

export default Users