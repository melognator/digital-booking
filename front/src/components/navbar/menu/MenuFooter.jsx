import React from 'react'
import socials from '../../common/socials'
import { CloseSessionButton, MenuFooterContainer } from './Menu.styles'
import { SocialIcon } from '../../footer/Footer.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { primaryColor, Separator, Strong } from '../../common/commonStyles'
import { useDispatch } from 'react-redux'
import { logoutSuccess } from '../../../utils/Redux/authReducer'
import { useNavigate } from 'react-router-dom'

const MenuFooter = ({ authenticated }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleCloseSesion = () => {
        dispatch(logoutSuccess())
        navigate(`/`);
    }

    return (
        <MenuFooterContainer>
            {
                authenticated &&
                <>
                    <p>¿Deseas <CloseSessionButton onClick={handleCloseSesion}>cerrar sesion</CloseSessionButton>? </p>
                    <Separator />
                </>
            }
            <div>
                {socials.map(social => <SocialIcon color={primaryColor} target={social.target} key={social.key} href={social.path}><FontAwesomeIcon fontSize={'24px'} icon={social.icon} /></SocialIcon>)}
            </div>
        </MenuFooterContainer>
    )
}

export default MenuFooter