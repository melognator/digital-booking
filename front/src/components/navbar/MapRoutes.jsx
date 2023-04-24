import React from 'react'
import { OutlinedButton, Separator } from '../common/commonStyles'
import { generatePath, Link, useLocation } from 'react-router-dom'
import { routes } from '../../utils/routes'
import { MenuButton } from './menu/Menu.styles'
import { useSelector } from 'react-redux'
import { LoggedIcon } from './Navbar.styles'


const MapRoutes = ({ type, onClick }) => {

    const auth = useSelector(state => state.auth)

    const routeButton = (route) => {
        switch (type) {
            case "outlinedButton":
                if(route.key === 'profile' || route.key === 'bookings'){
                    return
                }
                return (
                    <Link onClick={onClick} key={route.key} to={route.path}>
                        <OutlinedButton>{route.label}</OutlinedButton>
                    </Link>
                )
            case "menuButton":
                if(auth.isAuthenticated && (route.key === 'login' || route.key === 'register')){
                    return
                }else if (!auth.isAuthenticated && (route.key === 'profile' || route.key === 'bookings')){
                    return
                }
                return (
                    <React.Fragment key={route.key}>
                        <Link onClick={onClick} to={route.path.includes(':username') ? generatePath(route.path, {username: `${auth.user.name} ${auth.user.lastname}`}) : route.path}>
                            <MenuButton>
                                {
                                    route.icon && <LoggedIcon icon={route.icon}/>
                                }
                                {route.label}
                            </MenuButton>
                        </Link>
                        <Separator />
                    </React.Fragment>
                )
            
        }
    }

    const location = useLocation();
    return (
        <>
            {
                routes.map(route => route.type != "hidden" && (route.path != location.pathname || auth.isAuthenticated) && (route.type != "admin" || auth.user?.role == "ROLE_ADMIN") ?
                    routeButton(route)
                    : "")
            }
        </>
    )
}

export default MapRoutes