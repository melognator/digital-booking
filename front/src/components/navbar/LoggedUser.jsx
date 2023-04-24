import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../utils/Redux/authReducer';
import { Heading4, Strong } from '../common/commonStyles'
import { HeadingUser, UserContainer, UserName, UserPicture, UserPictureContainer } from './Navbar.styles';
import useComponentVisible from '../../utils/ClickOutsideHook';
import LoggedMenu from './LoggedMenu';

export const getInitials = (string) => {
    if (string) {
        const trimmed = string.trim()
        if(trimmed) {
            const array = trimmed.split(' ');
            if(array.length >= 2)
            return `${array[0].slice(0, 1).toUpperCase()}${array[1].slice(0, 1).toUpperCase()}`
        }
    }
    return ""
}


const LoggedUser = ({ user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);



    const handleCloseSesion = () => {
        dispatch(logoutSuccess())
        navigate(`/`);
    }
    return (
        <UserContainer>
            <UserPictureContainer>
                <UserPicture ref={ref} onClick={() => setIsComponentVisible(!isComponentVisible)}>
                    {
                        user?.profileUrl ? 
                        (
                            <img src={user?.profileUrl} alt='profile-image'/> 
                        )
                            :
                        (
                            <p>
                                {getInitials(`${user?.name} ${user?.lastname}`)}
                            </p>
                        )
                    }
                </UserPicture>
                {
                    <LoggedMenu visible={isComponentVisible} handleCloseSesion={handleCloseSesion} />
                }
            </UserPictureContainer>
            <div>
                <HeadingUser>Hola,</HeadingUser>
                <UserName>{`${user.name} ${user.lastname}`}</UserName>
            </div>
        </UserContainer>
    )
}

export default LoggedUser