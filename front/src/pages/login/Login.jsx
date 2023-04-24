import React from 'react'
import SubmitButton from '../../components/common/SubmitButton'
import { Link } from 'react-router-dom'
import { Form, Heading1, Heading4, SubmitContainer } from '../../components/common/commonStyles';
import InputValidated from '../../components/common/InputValidated';
import { AlertContainer } from './LoginStyles';
import { authError } from '../../utils/Redux/authReducer';


const Login = ({handleSubmit, errors, authError}) => {

    return (
        <Form noValidate onSubmit={handleSubmit}>
            {
                (authError) && (

                    <AlertContainer>
                        <span>!</span>
                        <p>
                            {authError}
                        </p>
                    </AlertContainer>
                )
            }
            <Heading1 align='center' color='primary'>
                Iniciar sesión
            </Heading1>
            <InputValidated type='email' label='Correo electronico' wrong={errors.user}></InputValidated>
            <InputValidated type='password' label='Contraseña' wrong={errors.user}></InputValidated>
            <SubmitContainer>
                <SubmitButton text={'Ingresar'}></SubmitButton>
                <Heading4 style={{ marginTop: '20px' }}>¿Aún no tenes cuenta? <Link to={'/register'} style={{ textDecoration: 'none', color: '#4285F4' }}>Regístrate</Link></Heading4>
            </SubmitContainer>
        </Form>
    )
}

export default Login