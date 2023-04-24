import styled, { css } from "styled-components";
import { Heading4, primaryColor, Section, Title, transparent2_1, color3, transparent2_5, Separator, transparent2_3 } from "../common/commonStyles";
import { Link } from "react-router-dom";
import breakpoints from "../common/breakpoints";
import Calendar from "../common/Calendar";
import { GoogleMap } from "@react-google-maps/api";

export const ProductTitleSection = styled(Section)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @media (min-width: ${breakpoints.tablet}) {
        box-shadow: none;
    }
`

export const CategoryTitle = styled(Heading4)`
    color: white;
    text-transform: uppercase;
    margin: 10px 0 0 0;
`

export const ProductHeading = styled(Title)`
    margin: 0 0 10px 0;
`

export const ProductTitleBack = styled(Link)`
    border: 0;
    background: none;
    height: 32px;
    cursor: pointer;
    & > svg {
        height: 100%;
    }
`


export const BookingForm = styled.form`
    @media (min-width: ${breakpoints.desktop}) {
        display: flex;
        flex-direction: row;
        align-items: center;
        /* justify-content: center; */
        gap: 24px;
    }
`

export const BookingContainer = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-width: ${breakpoints.desktop}) {
        width: 50%;
        background: white;
        border-radius: 8px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 15px;

        & > h3 {
            margin-top: 0;
        }
    }
`

export const StyledCalendar = styled(Calendar)`
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





export const ProductLocationImage = styled.img`
    border-radius: 10px;
    width: 100%;
    object-fit: cover;
    min-height: 424px;
    max-height: 512px;
`



export const PolicyContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    & > div {
        width: 80%;
    }

    @media (min-width: ${breakpoints.tablet}) {
        grid-gap: 15px;
        grid-template-columns: 1fr 1fr;
        & > div {
            width: 100%;
        }
    }
    @media (min-width: ${breakpoints.desktop}) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

export const ImageSection = styled(Section)`
    background: white;
    position: relative;
    padding: 0;
    @media (min-width: ${breakpoints.laptop}) {
        padding: 15px 40px;
    }
    /* width: 100%; */

`
export const ImageContainer = styled.div`
    position: relative;
    & > img {
        display: none;
    }
    & > img:first-of-type {
        display: block;
    }
    @media (min-width: ${breakpoints.laptop}) {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 10px;
        align-items: center;

        & > img {
            display: inline-block;
            height: 100%;
        }
        & > img:first-of-type {
            grid-area: 1 / 1 / 3 / 1;
        }
    }

`
export const Img = styled.img`

    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
    max-width: 100%;
    
    @media (min-width: ${breakpoints.laptop}) {
        border-radius: 10px;
        opacity: ${({shown}) => shown ? '.5' : '1'};
    }

`

export const ImgCounter = styled.button`

    background-color: transparent;
    border: none;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px;
    color: white;
    font-weight: bold;
    letter-spacing: 5px;

    @media (min-width: ${breakpoints.laptop}) {
        /* right: 50px; */
        text-decoration: underline;
        letter-spacing: 0;
        font-weight: 500;
        cursor: pointer;
    }
    /* font-family: 'Courier New', Courier, monospace; */

`

export const ImgIcons = styled.div`

    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
    font-size: 24px;
    display: flex;
    gap: 5px;
    z-index: 5;

    @media (min-width: ${breakpoints.tablet}) {
        position: static;
        padding: 10px 32px;
    }
    @media (min-width: ${breakpoints.laptop}) {
        padding: 0px 0px 15px 0px;
    }

`

export const ImgGallery = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    z-index:10;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    & > svg {
        font-size: 30px;
        padding: 10px;
        color: white;
    }
    & > div {
        width: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
        border-radius: 10px 10px 0 0;
        & > svg {
            position: absolute;
            font-size: 30px;
            padding: 10px;
            color: ${primaryColor};
            &:last-of-type {
                right: 0;
            }
        }


    }
    @media (min-width: ${breakpoints.laptop}) {
        /* position: absolute; */
        /* display: flex; */
        user-select: none;
        & > div {
            display: flex;
            flex-direction: column;
            width: 50%;
            & > div:first-of-type {
                position: relative;
                display: flex;
                align-items: center;
                & > img {
                    border-radius: 10px 10px 0 0;
                }
                & > svg {
                    font-size: 30px;
                    color: ${primaryColor};
                    position: absolute;
                }
                & > svg:first-of-type {
                    left: 0;
                }
                & > svg:last-of-type {
                    right: 0;
                }
            }
            & > p {
                background-color: white;
                text-align: center;
                padding: 5px 0;
                font-weight: bold;
                letter-spacing: 5px;
            }
        }
    }
`

export const ImageContainerGallery = styled.div`
    background-color: white;
    padding: 10px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        height: 5px;
        background-color: ${color3};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${primaryColor};
        border-radius: 10px;
    }
    & > p {
        grid-area: 2 / 1 / 3 / 5;
        justify-self: center;
        font-weight: bolder;
    }
    & > div {
        display: flex;
        position: relative;
        gap: 10px;
        & > img {
            max-width: 23.5%;
        }
    }
`

export const FeatureContainer = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    @media (min-width: ${breakpoints.tablet}) {
        padding: 15px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 15px;
    }

    @media (min-width: ${breakpoints.desktop}) {
        padding: 25px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 25px;
    }
`

export const Feature = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    & > p {
        font-weight: bold;
    }
`


export const ProductInfoSection = styled(Section)`
    padding: 15px;
    background: ${transparent2_1};
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (min-width: ${breakpoints.tablet}) {
        padding: 15px 40px;
    }
`

export const ProductInfoContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
export const Map = styled.div`

    width: 100%;
    height: 400px;

    @media (min-width: ${breakpoints.desktop}) {
        height: 500px;
    }

`

export const ProductSmallButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    outline: 0;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    height: 40px;
    width: 40px;
    & > svg > path {
        fill: white;
    }

    @media (min-width: ${breakpoints.tablet}) {
        & > svg > path {
            fill: black;
        }
    }
    :hover {
        background-color: rgba(0,0,0,0.10);
    }

    :active {
        background-color: rgba(0,0,0,0.2);
    }

    ${({show}) => show &&
        css`
            background-color: rgba(0,0,0,0.25);
        `
    }
`

export const ShareContainer = styled.div`
    position: relative;
    z-index: 5;
`

export const ShareButtonsContainer = styled.div`
    position: absolute;
    right: -5px;
    top: 0;
    transform: translateX(100%);
    display: grid;
    gap: 15px;
    padding: 15px;
    color: white;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.5);
    opacity: 1;
    transition-duration: 200ms;

    ${({show}) => !show &&
        css`
            opacity: 0;
            pointer-events: none;
        `
    }
`

export const ShareButton = styled.button`
    border: 0;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${({color}) => color ? color : "black"};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    height: 42px;
    width: 42px;

    :hover {
        filter: brightness(90%);
    }
    
    :active {
        filter: brightness(80%);
    }

    ${({instagram}) => instagram && css`
        background: #f09433; 
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
        background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    `}
`

export const ReviewList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 20px 0;
    @media (min-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr 1fr;
    }
    @media (min-width: ${breakpoints.tablet}) {
        grid-template-columns: 1fr 1fr;
    }
    /* @media (min-width: ${breakpoints.laptop}) {
        grid-template-columns: 1fr 1fr 1fr;
    } */
    @media (min-width: ${breakpoints.desktop}) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

export const ReviewListColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const ReviewCardContainer = styled.article`
    background-color: white;
    border-radius: 2px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,.15);
`

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


export const ReviewBody = styled.div`
    
`

export const ReviewAuthor = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const ReviewScore = styled.div`

`

export const ReviewPicture = styled.div`
    font-size: 16px;
    background-color: white;
    height: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${primaryColor};
    color: white;
    font-weight: bold;

    & > img {
        aspect-ratio: 1/1;
        width: 42px;
        object-fit: cover;
        border-radius: inherit;
    }
`

export const ReviewSeparator = styled(Separator)`
    background-color: ${transparent2_3};
    margin: 15px 0;
`