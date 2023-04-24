import React, { useState } from 'react'
import Hamburguer from './Hamburguer';
import { MenuContainer, MenuOverlay } from './Menu.styles';
import MenuHeader from './MenuHeader';
import MenuFooter from './MenuFooter';
import MenuBody from './MenuBody';
import { useSelector } from 'react-redux';

const Menu = () => {

    const auth = useSelector(state => state.auth)

    const [expanded, setExpanded] = useState(false);
    const handleExpanded = (value) => {
        document.body.classList.toggle('no-scroll')
        setExpanded(value)
    }

    return (
        <>
            <Hamburguer onClick={() => handleExpanded(true)} />
            <MenuContainer expanded={expanded} >
                <MenuHeader authenticated={auth.isAuthenticated} user={auth.user} onClick={() => handleExpanded(false)} />
                <MenuBody authenticated={auth.isAuthenticated} onClick={() => handleExpanded(false)} />
                <MenuFooter authenticated={auth.isAuthenticated} />
            </MenuContainer>
            {
                expanded && (
                    <MenuOverlay expanded={expanded} />
                )
            }
        </>
    )
}

export default Menu