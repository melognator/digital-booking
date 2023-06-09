import styled, { css } from "styled-components";

import breakpoints from "../common/breakpoints"; 
import { Button2, Card, Text1, Text2, color2, color3, color4, primaryColor, Heading3 } from "../common/commonStyles";


export const DoubleCard = styled(Card)`
    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row;
    }
    @media (min-width: ${breakpoints.laptop}) {
        flex-direction: column;
    }
    @media (min-width: ${breakpoints.desktop}) {
        flex-direction: row;
    }
    
`

export const CardCategory = styled(Heading3)`
    text-transform: uppercase;
`

export const ProductDescription = styled.div`
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 15px;
    width:100%;
    height: 50%;
    /* & :first-child {
        margin-bottom: 5px;
    } */
`


export const ImageContainer = styled.div`
    position: relative;
    display: flex;
    @media (min-width: ${breakpoints.tablet}) {
        /* width: 400px; */
        width: 100%;
    }
    @media (min-width: ${breakpoints.laptop}) {
        /* width: 400px; */
        width: 100%;
        height: 50%;
    }
    @media (min-width: ${breakpoints.desktop}) {
        /* width: 400px; */
        width: 100%;
        height: auto;
    }
`

export const ProductImage = styled.img`
    border-radius: 10px;
    cursor: pointer;
    object-fit: cover;
    width: 100%;
    aspect-ratio: 16/10;

    @media (min-width: ${breakpoints.tablet}) {
        border-radius: 10px;
        max-width: 100%;
    }

`

// export const Heart = styled.button`

//     position: absolute;
//     top: 15px;
//     right: 15px;
//     width: 20px;
//     aspect-ratio: 1/1;
//     rotate: 45deg;
//     border: none;
//     cursor: pointer;
//     background-color: ${({like}) => like ? 'red' : 'white'};
//     &::before {
//         content: '';
//         position: absolute;
//         background-color: ${({like}) => like ? 'red' : 'white'};
//         top: -10px;
//         left: 0;
//         width: 20px;
//         aspect-ratio: 1/1;
//         border-radius:50%;
//     }
//     &::after {
//         content: '';
//         position: absolute;
//         background-color: ${({like}) => like ? 'red' : 'white'};
//         top: 0px;
//         left: -10px;
//         width: 20px;
//         aspect-ratio: 1/1;
//         border-radius:50%;
//     }
    
//     &:active {

//         animation: 1s change ease;
//     }
//     /* @media (min-width: ${breakpoints.tablet}) {
//         right: 52%;
//     } */
//     @keyframes change {
//         0%{
//             transform: scale(0.9);
//         }
//         50%{
//             transform: scale(1.1);
//         }
//         100%{
//             transform: scale(1);
//         }
//     }
// `

export const HeartButton = styled(Button2)`
    padding: 0;
    color: ${({ like }) => like ? `${ primaryColor }` : 'white'};
    position: absolute; 
    top: 15px;
    right: 15px;

    &:active {
        animation: .25s click;
    }

    @keyframes click {
        0%{
            transform: scale(0.9);
        }
        50%{
            transform: scale(1.1);
        }
        100%{
            transform: scale(1);
        }
    }
`


export const ProductHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 15px;
`


export const RightHeader = styled.div`
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    gap: 5px;
    & > p {
        font-size: 16px;
    }
`

export const ScoreContainer = styled(Text1)`
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-align: center;
    padding: 5px 10px;
    background-color: ${color2};
    margin-bottom: 5px;
`

export const Star = styled.i`
    user-select: none; 
    font-size: ${({fontSize}) => fontSize ? fontSize : '20px'};
    font-style: normal;
    line-height: 1;
    ${({ percentage }) => css`
    background: linear-gradient(90deg, 
        ${primaryColor} 0%, 
        ${primaryColor} ${percentage * 100}%, 
        ${color2} ${(percentage) * 100}%, 
        ${color2} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `
}
    

`

export const SkeletonCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: -1;

    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row;
    }
    & > :first-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        aspect-ratio: 16/10;
        background-image: linear-gradient(
            90deg,
            ${color4} 0px,
            #efefef 30px,
            ${color4}  60px
        );
        width: 100%;

        animation: 2s infinite move ease-in-out;


        @keyframes move {
            from {
                background-position: 0px 0px;
            }
            to {
                background-position: 91.5vw 0px; 
            }
        }

        @media (min-width: ${breakpoints.tablet}) {
            border-radius: 10px;
            aspect-ratio: 1/.5;
            object-fit: cover;

            @keyframes move {
                from {
                    background-position: 0px 0px;
                }
                to {
                    background-position: 44vw 0px; 
                }
            }
        }
        
        @media (min-width: ${breakpoints.desktop}) {
                @keyframes move {
                from {
                    background-position: 0px 0px;
                }
                to {
                    background-position: 22.5vw 0px; 
                }
            }
        }
    }
    & > div:last-of-type {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        width: 100%;
        height: 100%;

        & > div {
            width: 100%;
            height: 30%;
            background-image: linear-gradient(
                90deg,
                ${color4} 0px,
                #efefef 30px,
                ${color4}  60px
            );
            animation: 2s infinite move ease-in-out;
    
        }

        & > p {
            width: 100%;
            height: 15%;
            background-image: linear-gradient(
                90deg,
                ${color4} 0px,
                #efefef 30px,
                ${color4}  60px
            );
            animation: 2s infinite move ease-in-out;
        }

        & > p:last-of-type {
            height: 50%;
        }
    }
`

export const ProductDescriptionText = styled(Text1)`
    margin-bottom: 15px;
`

export const ProductDescriptionBottom = styled.div`
    display:flex;
    flex-direction: column;
`


export const FeaturesContainer = styled.div`
    display: flex;
    gap: 12px;
`

export const FeatureItem = styled(Heading3)`
    
`

export const ProductButtons = styled.div`
    display: flex;
    gap: 10px;
    & > button:first-child {
        flex-grow: 1;
    }
`