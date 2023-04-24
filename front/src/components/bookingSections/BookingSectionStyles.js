import styled, { css } from "styled-components";
import breakpoints from "../common/breakpoints";
import Calendar from "../common/Calendar";
import { Card, color2, FilledButton, Input, primaryColor } from "../common/commonStyles";
import { SelectContainer } from "../search/SearchStyles";

export const BookingCalendar = styled(Calendar)`
    margin-bottom: 30px;
    position: static;
    animation: none;
    border-radius: 5px;
    width: 100%;
    display: inline-block;
    z-index: 0;

    & > button {
        display: none;
    }

    @media (min-width: ${breakpoints.desktop}) {
        /* max-width: 900px; */
        & > div > svg {
            align-self: center;
            color: white;
            border-radius: 50%;
            padding: 10px 12.5px;
            background-color: ${primaryColor};
        }
    }
`

export const FormGroup = styled.section`

`

export const FormTitle = styled.h2`
    font-size: 20px;
    color: ${color2};
    margin-bottom: 15px;
`

export const FormCard = styled(Card)`
    gap: 25px;
    margin-bottom: 30px;
    padding: 16px;
    border-radius: 5px;

    ${({ type }) => {
        if (type === 'data') {
            return `
            @media (min-width: ${breakpoints.tablet}) {
                display: grid;
                gap: 25px 15px;
                grid-template-columns: 1fr 1fr;
            }
            `
        }
    }}
`

export const FormField = styled.div`
    display: flex;
    flex-direction: column;
`

export const FormLabel = styled.label`
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 8px;
`

export const FormInput = styled(Input)`
    color: ${color2};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .15);

    &:disabled {
        background-color: rgba(223, 228, 234, .4);
        
    }
`

export const BookingDetailCard = styled(FormCard)`
    padding: 0;
    & > h2 {
        padding: 20px 10px 0;

    }
    @media (min-width: ${breakpoints.tablet}) {
        display: grid;
        gap: 0px 5px;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: .1fr 1fr;
        & > div:first-of-type {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }
        padding: 30px;
    }
    @media (min-width: ${breakpoints.laptop}) {
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: .1fr 1fr 1fr;
        margin-top: 40px;
    }
`
export const DetailsContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    & > * {
        padding: 0 20px;
    }
    & > p {
        display: flex;
        gap: 10px;
        align-items: center;
    }
`

export const ConfirmBookingButton = styled(FilledButton)`
    padding: 8px 10px;
    width: 90%;
    align-self: center;
    margin-bottom: 8px;
`

export const Img = styled.img`
    padding: 0;
    max-width: 100%;
    grid-column: 1;
    @media (min-width: ${breakpoints.tablet}) {
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
    }
    @media (min-width: ${breakpoints.laptop}) {
        border-radius: 0;
    }

`

export const DetailDate = styled.div`

    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    gap: 5px;
    & > h3 {
        display: flex;
        justify-content: space-between;
    }

`

export const SelectHour = styled.div`
    color: ${color2};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .15);
    width: 100%;
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    background-color: ${({wrong}) => wrong ? 'rgba(255,225,225,1)' : 'none'};
    border: ${({wrong}) => wrong ? '1px solid red' : 'none'};
    & > p {

        width: 100%;
    }
    @media (min-width: ${breakpoints.tablet}) {
        width: 50%;
    }

`

export const HourContainer = styled(SelectContainer)`
    top: 110%;
    width: inherit;

    @media (min-width: ${breakpoints.tablet}) {
        top: 100%;
    }
`

export const WrongText = styled.p`

    text-align: right;
    font-size: 12px;
    color: red;
    font-weight: bold;

    @media (min-width: ${breakpoints.tablet}) {
        width: ${({width}) => width};
    }

`