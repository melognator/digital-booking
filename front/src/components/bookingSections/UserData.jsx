import React from 'react'
import { FormCard, FormField, FormGroup, FormInput, FormLabel, FormTitle } from './BookingSectionStyles'

const UserData = ({user}) => {
    return (
        <FormGroup>
            <FormTitle>Completá tus datos</FormTitle>
            <FormCard type='data'>
                <FormField>
                    <FormLabel>Nombre</FormLabel>
                    <FormInput disabled value={user?.name} />
                </FormField>
                <FormField>
                    <FormLabel>Apellido</FormLabel>
                    <FormInput disabled value={user?.lastname} />
                </FormField>
                <FormField>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormInput disabled value={user?.email} />
                </FormField>
                <FormField>
                    <FormLabel>Ciudad</FormLabel>
                    <FormInput placeholder='Montevideo' />
                </FormField>
            </FormCard>
        </FormGroup>
    )
}

export default UserData