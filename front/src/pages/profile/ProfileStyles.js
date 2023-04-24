import styled from "styled-components"
import { Card, FilledButton, Form, InputContainer, Section, primaryColor, transparent2_1} from "../../components/common/commonStyles"
import breakpoints from "../../components/common/breakpoints"


export const ProfileContainer = styled(Form)`
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0,0,0,.15);
    padding: 15px;
    min-height: auto;
    @media (min-width: ${breakpoints.desktop}) {
        width: 700px;
    }
`

export const ProfileSection = styled(Section)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100svh - 90px - 58px);
    background-color: ${transparent2_1};
    padding: 0;
`

export const ProfileHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const ProfileBody = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    
`

export const ButtonContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    
`

export const InputImageContainer = styled.div`

    & > div {
        display: flex;
        /* grid-template-columns: 1fr 3fr; */
        gap: 15px;
        margin: 10px 0;
        align-items: center;
    }

`

export const ImageInput = styled(InputContainer)`
    flex-grow: 1;
    width: 100%;
`

export const UserImg = styled.div`
    & > * {
        aspect-ratio: 1/1;
        width: 80px;
        border-radius: 50%;
        @media (min-width: ${breakpoints.tablet}) {
            width: 100px;
        }
    }
    & > p {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${primaryColor};
        color: white;
        font-size: 36px;
        font-weight: bold;
    }
`