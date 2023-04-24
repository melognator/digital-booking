import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiURL } from '../../utils/proxy';
import { authenticateUser, authError } from '../../utils/Redux/authReducer';
import Layout from './Layout'

const LayoutContainer = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirectLogin = () => {
        if (location.pathname.includes('booking')) {
            navigate('/login', {state: {authError: 'Para realizar una reserva necesitas estar logueado'}});
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            axios.get(`${apiURL}/user/my`, config)
                .then(res => {
                    if (res.data === '') {
                        dispatch(authError("Token inválida"));
                        redirectLogin();
                    }else {
                        const user = {
                            id: res.data.id,
                            name: res.data.name,
                            lastname: res.data.lastname,
                            city: res.data.city,
                            email: res.data.email,
                            role: res.data.role,
                            profileUrl: res.data.profileUrl,
                            emailValid: res.data.emailValid
                        }
                        dispatch(authenticateUser(user, token));
                    }
                })
                .catch(err => {
                    dispatch(authError("Token inválida"))
                    redirectLogin()
                })
        } else {
            dispatch(authError("Token inválida"))
            redirectLogin()
        }
    }, []);
    return <Layout />
}

export default LayoutContainer