import React, { useEffect } from 'react'
import { Heading2, primaryColor, Separator, Text1, InputContainer, Input, FilledButton, transparent2_5, OutlinedButton } from '../../components/common/commonStyles'
import { ButtonContainer, ImageInput, InputImageContainer, ProfileBody, ProfileContainer, ProfileHeader, ProfileSection, UserImg } from './ProfileStyles'
import { useSelector } from 'react-redux'
import { UserPicture, UserPictureContainer } from '../../components/navbar/Navbar.styles'
import { getInitials } from '../../components/navbar/LoggedUser'
import { useState } from 'react'


const Profile = ({handleSubmit, handleChange, userData}) => {

    return (
        <ProfileSection>
            <ProfileContainer onSubmit={handleSubmit}>
                <ProfileHeader>
                    <Heading2>
                        {userData.name} {userData.lastname}
                    </Heading2>
                    <Separator color={primaryColor} />
                </ProfileHeader>
                <ProfileBody>
                    <InputImageContainer>
                        <label>
                            <Text1>Imagen:</Text1>
                        </label>
                        <div>
                            <UserImg>
                                {
                                    userData.profileUrl ?
                                        (
                                            <img src={userData.profileUrl} alt='profile-image' />
                                        )
                                        :
                                        (
                                            <p>
                                                {getInitials(`${userData.name} ${userData.lastname}`)}
                                            </p>
                                        )
                                }
                            </UserImg>
                            <ImageInput>
                                <label>
                                    <Text1>Subir imagen</Text1>
                                </label>
                                <Input name='profileUrl' onChange={handleChange} placeholder='Ingresar URL de imagen...' value={userData.profileUrl} />
                            </ImageInput>
                        </div>
                    </InputImageContainer>
                    <InputContainer>
                        <label>
                            <Text1>Nombre:</Text1>
                        </label>
                        <Input required name='name' onChange={handleChange} placeholder='Ingrese nombre...' value={userData.name} />
                    </InputContainer>
                    <InputContainer>
                        <label>
                            <Text1>Apellido:</Text1>
                        </label>
                        <Input required name='lastname' onChange={handleChange} placeholder='Ingrese apellido...' value={userData.lastname} />
                    </InputContainer>
                    <InputContainer>
                        <label>
                            <Text1>Correo:</Text1>
                        </label>
                        <Input required name='email' onChange={handleChange} placeholder='Ingrese email...' value={userData.email} />
                    </InputContainer>
                    <InputContainer>
                        <label>
                            <Text1>Ciudad:</Text1>
                        </label>
                        <Input name='city' onChange={handleChange} placeholder='Ingrese ciudad...' value={userData.city ? userData.city : ""} />
                    </InputContainer>
                </ProfileBody>
                <ButtonContainer>
                    <OutlinedButton type='button'>Cancelar</OutlinedButton>
                    <FilledButton>Guardar</FilledButton>
                </ButtonContainer>
            </ProfileContainer>
        </ProfileSection>
    )
}

export default Profile