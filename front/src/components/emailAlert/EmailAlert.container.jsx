import React, { useEffect, useState } from 'react'
import { AlertContainer } from '../../pages/login/LoginStyles'
import { StickyAlertContainer } from './EmailAlert.styles'
import EmailAlert from './EmailAlert'
import { useSelector } from 'react-redux'
import { apiURL } from '../../utils/proxy'
import axios from 'axios'

const EmailAlertContainer = () => {

    const [show, setShow] = useState(false)
    
    const auth = useSelector(state => state.auth)
    
    useEffect(() => {
        if(auth.user && !auth.user.emailValid){
            setShow(true)
        } else {
            setShow(false)
        }
    },[auth.isAuthenticated])

    const handleClose = () => {
        setShow(false)
    }

    const handleSendEmail = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            }
        };

        axios.get(`${apiURL}/user/sendVerificationEmail`, config)
        .catch(err => console.log(err))

        handleClose()
    }   

    return <EmailAlert show={show} handleClose={handleClose} handleSendEmail={handleSendEmail} />
}

export default EmailAlertContainer