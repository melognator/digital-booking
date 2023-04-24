import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Separator } from '../common/commonStyles'
import { SelectOption } from '../search/SearchStyles'
import MapRoutes from './MapRoutes'
import { LoggedIcon, LoggedMenuContainer, LoggedMenuOption } from './Navbar.styles'

const LoggedMenu = ({visible, handleCloseSesion}) => {


  return (
    <LoggedMenuContainer visible={visible}>
      <MapRoutes type={'menuButton'}/>
      <Separator/>
      <LoggedMenuOption color='red' onClick={handleCloseSesion}>
        <LoggedIcon icon={'fa-solid fa-right-from-bracket'}/>
        Cerrar Sesion
      </LoggedMenuOption>
    </LoggedMenuContainer>
  )
}

export default LoggedMenu