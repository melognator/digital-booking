import React, { useEffect, useState } from 'react'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiURL } from '../../utils/proxy'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../utils/Redux/authReducer'

const ProfileContainer = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    const emptyUser = {
        city: "",
        email: "",
        id: -1,
        lastname: "",
        name: "",
        profileUrl: "",
        role: "",
    }

    const [userData, setUserData] = useState(auth.user ? auth.user : emptyUser)

    useEffect(() => {
        if (auth.user) {
            setUserData(auth.user)
        }
    }, [auth.user])

    const handleChange = (e) => {
        setUserData(state => (
            { ...state, [e.target.name]: e.target.value }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const config = {
            headers:{
                Authorization: `Bearer ${auth.token}`,
            }
        }
        axios.put(`${apiURL}/user`, userData, config)
        .then(res => {
            dispatch(updateUser(userData));
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return <Profile handleChange={handleChange} handleSubmit={handleSubmit} userData={userData} />
}

export default ProfileContainer