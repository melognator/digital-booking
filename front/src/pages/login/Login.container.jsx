import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiURL } from '../../utils/proxy';
import { loginSuccess } from '../../utils/Redux/authReducer';
import { checkUser, errors } from '../../utils/validations';
import Login from './Login'

const LoginContainer = () => {

    const navigate = useNavigate();

    const [update, setUpdate] = useState(0);
    const location = useLocation();

    const dispatch = useDispatch()
    
    const handleSubmit = e => {
        e.preventDefault()
        let user = {
            username: e.target[0].value,
            password: e.target[1].value,
        }
        axios.post(`${apiURL}/user/login`, user)
            .then(res => {
                const token = res.data.token;
                const user = res.data.user;
                dispatch(loginSuccess(user, token))
                if(location.state) {
                    navigate(location.state.pathname, {state: {selectedRange: location.state.selectedRange}})
                } else {
                    navigate('/')
                }
            })
            .catch(err => {
                checkUser(e.target[0].value, e.target[1].value)
                setUpdate(prev => prev + 1);
            })

    }

    return <Login handleSubmit={handleSubmit} authError={location.state?.authError} errors={errors}/>
}

export default LoginContainer