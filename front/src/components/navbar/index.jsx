import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'
import { FilledButton, OutlinedButton } from '../common/commonStyles'
import Logo from './Logo'
import { LinksContainer, LogoLink, LogoText, NavbarContainer } from './Navbar.styles'
import Menu from './menu'
import LoggedUser from './LoggedUser'
import MapRoutes from './MapRoutes'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const auth = useSelector(state => state.auth)

    return (
        <NavbarContainer>
            <LogoLink to={routes[0].path}>
                <Logo />
                <LogoText>Conduce el auto de tus sueños</LogoText>
            </LogoLink>

            <Menu />
            <LinksContainer>
                { auth.isAuthenticated ? 
                <LoggedUser user={auth.user}/> 
                :
                <MapRoutes type="outlinedButton" />
                }

                {/* // routes.map(route => route.type != "hidden" && route.path != location.pathname ?
                //     <Link key={route.key} to={route.path}>
                //         <OutlinedButton>{route.label}</OutlinedButton>
                //     </Link>
                //     : "")} */}
            </LinksContainer>
        </NavbarContainer>
    )
}

export default Navbar
