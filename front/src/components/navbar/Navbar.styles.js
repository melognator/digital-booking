import styled, { css } from 'styled-components';
import breakpoints from '../common/breakpoints';
import { Heading4, Strong, Text1, buttonSharedStyle, color2, color3, primaryColor, Button2, transparent2_1, transparent2_5 } from '../common/commonStyles';
import { Link } from 'react-router-dom';
import { SelectContainer, SelectOption } from '../search/SearchStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavbarContainer = styled.header`
    background-color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 1px 10px rgba(0, 0, 0, 0.2);
    @media (min-width: ${breakpoints.tablet}) {
        box-shadow: none;
    }
`

export const LinksContainer = styled.div`
    display: none;
    gap: 16px;

    @media (min-width: ${breakpoints.tablet}) {
        display: flex;
    }
`

export const UserContainer = styled.div`

    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;

    @media (min-width: ${breakpoints.tablet}) {
        position: relative;
        bottom: 0;
        right: 0;
        flex-direction: row-reverse;
        align-items: center;

    }
    /* & > :last-child {
        position: relative;
        & > svg {
            display: none;
            position: absolute;
            top: -10px;
            right: 5px;
            &:active {
                animation: 1s press;
            }
            @keyframes press {
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
            @media (min-width: ${breakpoints.tablet}) {
                display: inline-block;
            }
        }
    } */

`

export const UserPicture = styled.div`
    font-size: 16px;
    background-color: white;
    /* padding: 10px; */
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: ${color3};
    font-weight: bold;
    & > img {
        aspect-ratio: 1/1;
        width: 50px;
        border-radius: 50%;
    }
    @media (min-width: ${breakpoints.tablet}) {
        cursor: pointer;
        height: 48px;
        width: 48px;
        font-size: 18px;
        background-color: ${primaryColor};
        color: white;
        :hover {
            filter: brightness(95%);
        }
        :active {
            filter: brightness(90%);
        }
    }
`

export const HeadingUser = styled(Heading4)`
    color: white;
    text-align: right;
    @media (min-width: ${breakpoints.tablet}) {
        color: ${color2};
        text-align: right;
    }
`

export const UserName = styled(Strong)`
    color: ${color2};
    @media (min-width: ${breakpoints.tablet}) {
        color: ${primaryColor}
    }
`

export const LogoText = styled(Text1)`
    display: none;
    font-weight: 300;
    font-size: 18px;

    @media (min-width: ${breakpoints.laptop}) {
        display: inline-block;
    }
`

export const LogoLink = styled(Link)`
    display: flex;
    align-items: flex-end;
    gap: 12px;
    text-decoration: none;
    
`


// export const LoggedMenuContainer = styled(SelectContainer)`
//     width: 112.5%;
//     top: 60px;
//     overflow: hidden;
//     max-height: none;
// `

export const UserPictureContainer = styled.div`
    position: relative;
`

export const LoggedMenuContainer = styled.div`
    user-select: none;
    position: absolute;
    background-color: white;
    box-shadow: 0 0px 4px rgba(0,0,0,.25);
    border-radius: 5px;

    overflow: hidden;
    z-index: 5;

    top: 0;
    left: -15px;
    transform: translateX(-100%);
    width: 200px;
    /* bottom: -40px; */
    /* transform: translateY(100%); */

    & > hr:last-of-type {
        display: none;
    }

    & > hr {
        background-color: ${transparent2_1};
        /* margin: 0 auto;
        width: 80%; */
    }

    & button {
        padding: 15px 15px;
        background-color: white;
        border-radius: 0;
        width: 100%;
        text-align: left;
    }

    display: flex;
    flex-direction: column;

    opacity: 0;
    pointer-events: none;

    transition: opacity 100ms;

    ${({visible}) => visible && css`
        opacity: 1;
        pointer-events: all;
    `}
`

export const LoggedMenuOption = styled(Button2)`

    padding: 15px 0;
    display: flex;
    align-items: center;

`

export const LoggedIcon = styled(FontAwesomeIcon)`

    display: none;
    margin-right: 10px;

    @media (min-width: ${breakpoints.tablet}) {
        display: inline-block;
    }
`