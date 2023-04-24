import React from 'react'
import { ConfirmEmailButton, EmailAlertButton, StickyAlertContainer } from './EmailAlert.styles'
import { Text1 } from '../common/commonStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EmailAlert = ({handleSendEmail, handleClose, show}) => {
  return (
    <StickyAlertContainer show={show}>
        <Text1>Veo que aún no has verificado tu email, haz <ConfirmEmailButton onClick={handleSendEmail}>click aquí</ConfirmEmailButton> para enviar un correo de confirmación</Text1>
        <EmailAlertButton onClick={handleClose}>
            <FontAwesomeIcon icon='fa-solid fa-xmark' />
        </EmailAlertButton>
    </StickyAlertContainer>
  )
}

export default EmailAlert