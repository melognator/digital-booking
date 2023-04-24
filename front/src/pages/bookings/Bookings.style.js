import styled, { css, keyframes } from 'styled-components'
import breakpoints from '../../components/common/breakpoints'
import { color4, Section, Separator, transparent2_3 } from '../../components/common/commonStyles'

export const BookingSection = styled(Section)`
    & > * {
        max-width: ${breakpoints.desktop};
        margin-right: auto;
        margin-left: auto;
    }
`

export const BookingList = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column-reverse;
`

export const BookingCard = styled.article`
    display: grid;
    background-color: ${color4};
    gap: 1px;
    overflow: clip;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,.25);
    grid-template-columns: 1fr;
    /* @media (min-width: ${breakpoints.desktop}) {
        flex-direction: row;
        grid-template-columns: 3fr 1fr;
    } */
`

export const BookingCardMain = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: ${breakpoints.tablet}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${breakpoints.laptop}) {
        display: flex;
        flex-direction: row;
    }

    height: 100%;

    & > img {
        width: 100%;
        @media (min-width: ${breakpoints.tablet}) {
            flex-direction: row;
            height: 235px;
            /* aspect-ratio: 16 / 10; */
            /* width: auto; */
            /* width: 50%; */
            object-fit: cover;
        }
        @media (min-width: ${breakpoints.laptop}) {
            flex-direction: row;
            height: 250px;
            width: auto;
            aspect-ratio: 16 / 10;
            /* max-width: auto; */
        }
    }
`

export const BookingCardInformation = styled.div`
    width: 100%;
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > div:first-of-type {
        margin: 0;
    }
`

export const BookingCardReview = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    padding: 20px;

    & > textarea, & > button {
        display: ${({show}) => show ? 'block' : 'none'};
        /* @media (min-width: ${breakpoints.desktop}) {
            display: block;
        } */
    }
`

export const BookingReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    ${({selected}) => !selected && css`
        flex-direction: column;
        gap: 5px;
    `}

    & > p {
        font-size: 16px;
    }
`

const spread = (finalX, finalY) => keyframes`
    0% {
        transform: translate(0,0);
        opacity: 1;
    }
    100% {
        transform: translate(${finalX}px, ${finalY}px);
        opacity: 0;
    }
`

export const Confetti = styled.span`
    position: fixed;
    top: ${({top}) => `${top-10}px`};
    left: ${({left}) => `${left-10}px`};
    animation:  ${({finalX, finalY}) => spread(finalX, finalY) } ${({time}) => `${time}ms`} ease-out;
`

export const BookingSeparator = styled(Separator)`
    background-color: ${transparent2_3};
`