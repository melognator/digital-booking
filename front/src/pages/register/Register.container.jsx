import React, { useState } from 'react'
import Register from './Register'
import { errors, checkRequired, checkEmailPattern, checkPassword } from '../../utils/validations';
import axios from 'axios';
import { apiURL } from '../../utils/proxy'
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess } from '../../utils/Redux/authReducer';
import { useNavigate } from 'react-router-dom';

const RegisterContainer = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [update, setUpdate] = useState(0);

    const handleSubmit = e => {
        e.preventDefault()

        let validated = true;

        if (!checkRequired('firstName', e.target[0].value)) {
            validated = false;
        }

        if (!checkRequired('lastName', e.target[1].value)) {
            validated = false;
        }

        if (checkRequired('email', e.target[2].value)) {
            if (!checkEmailPattern('email', e.target[2].value)) {
                validated = false;
            }
        } else {
            validated = false;
        }

        if (checkRequired('password', e.target[3].value)) {
            if (!checkPassword('password', e.target[3].value, e.target[4].value)) {
                validated = false;
            }
        } else {
            validated = false;
        }

        setUpdate(prev => prev + 1);

        if (validated) {
            let user = {
                name: e.target[0].value,
                lastname:e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value,
                role: {
                    name: "usuario"
                }
            }
            axios.post(`${apiURL}/user`, user)
            .then(res => {
                user = res.data.user
                const token = res.data.token;
                dispatch(registerSuccess(user, token))
                navigate('/')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return <Register errors={errors} handleSubmit={handleSubmit} />
}

export default RegisterContainer