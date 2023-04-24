
import React from 'react'
import SubmitButton from '../../components/common/SubmitButton'
import { Link } from 'react-router-dom'
import { Form, Heading1, Heading4, Strong, SubmitContainer } from '../../components/common/commonStyles';
import InputValidated from '../../components/common/InputValidated';
import { NameContainer, NameInput } from './Register.styles';


const Register = ({errors, handleSubmit}) => {

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Heading1 align="center" color='primary'>
                Crear cuenta
            </Heading1>
            <NameContainer>
                <NameInput type='text' label='Nombre' wrong={errors.firstName}></NameInput>
                <NameInput type='text' label='Apellido' wrong={errors.lastName}></NameInput>
            </NameContainer>
            <InputValidated type='email' label='Correo electronico' wrong={errors.email}></InputValidated>
            <InputValidated type='password' label='Contraseña' wrong={errors.password}></InputValidated>
            <InputValidated type='password' label='Confirmar Contraseña'></InputValidated>
            <SubmitContainer>
                <SubmitButton text={'Crear cuenta'}></SubmitButton>
                <Heading4 style={{ marginTop: '20px' }}>¿Ya tienes una cuenta? <Link to={'/login'} style={{ textDecoration: 'none', color: '#4285F4' }}>Iniciar sesión</Link></Heading4>
            </SubmitContainer>
        </Form>
    )
}

export default Register