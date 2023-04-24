import styled from 'styled-components'
import { primaryColor } from '../common/commonStyles'


export const StickyAlertContainer = styled.div`
    display: ${({show}) => show ? 'flex' : 'none'};
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,.25);
    background-color: ${primaryColor};
    justify-content: space-between;
    padding: 7px 20px;
    align-items: center;
    & > * {
        color: white;
    }
`

export const EmailAlertButton = styled.button`
    min-height: 1.5rem;
    min-width: 1.5rem;
    cursor: pointer;
    border: 0;
    background-color: ${primaryColor};
    outline: 0;
    border-radius: 2px;

    &:hover {
        filter: brightness(90%);
    }
    &:active {
        filter: brightness(80%);
    }
`

export const ConfirmEmailButton = styled.button`
    background-color: transparent;
    color: white;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        filter: brightness(90%);
    }
    &:active {
        filter: brightness(80%);
    }
`