import React from 'react'
import { MenuHeaderContainer, MenuTitle } from './Menu.styles'
import Close from './Close'
import LoggedUser from '../LoggedUser'

const MenuHeader = ({ onClick, authenticated, user }) => {
    return (
        <MenuHeaderContainer>
            <Close onClick={onClick} />
            {
                !authenticated ?
                    <MenuTitle>Menú</MenuTitle>
                :
                <LoggedUser user={user}/> 
            }
        </MenuHeaderContainer>
    )
}

export default MenuHeader