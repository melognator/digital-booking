import styled from "styled-components";
import { color4, Heading2, transparent2_5 } from "../common/commonStyles";
import breakpoints from "../common/breakpoints"
import { FilledButton, Input } from '../common/commonStyles';

export const SearchContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #191B1D;
    @media (min-width: ${breakpoints.tablet}) {
        padding-bottom: 25px;
    }
`

export const InputSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #191B1D;
    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row;
        justify-content: center;
        margin: 0 75px;
    }
    @media (min-width: ${breakpoints.desktop}) {
        margin: 0 150px;
    }
      
`
export const SearchHeading = styled(Heading2)`
    text-align: center;
    margin: 20px 0px;
    font-size: 30px;
`

export const SelectDaysContainer = styled.div`

    position: relative;
    @media (min-width: ${breakpoints.tablet}) {
        flex: 2 1 0;
    }
`

export const SelectDate = styled.div`

    display: flex;
    gap: 10px;
    background-color: white;
    padding: 9px 10px;
    border-radius: 5px;
    font-size: 16px;
    min-width: 215px;
    p {
        white-space: nowrap;
        display:flex;
        overflow: auto;
    }

`

export const SearchButton = styled(FilledButton)`
    @media (min-width: ${breakpoints.tablet}) {
        flex: 1 1 0;
    }
`


export const SearchDate = styled(Input)`
    @media (min-width: ${breakpoints.tablet}) {
        flex: 2 1 0;
    }
`

export const SelectInput = styled.div`
    /* display: grid;
    grid-template-columns: 20px 1fr 20px;
    grid-template-rows: 1fr; */
    display: flex;
    justify-content: space-between;
    text-align: left;
    align-items: center;
    /* gap: 10px; */
    background-color: white;
    padding: 9px 10px;
    border-radius: 5px;
    font-size: 16px;

    min-width: 215px;
    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
    }
`

export const InputTextContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const FeatureSelect = styled.div`
    position: relative;

    & > div > button {
        margin-right: 4px;
        appearance: none;
        border: none;
        background-color: transparent;
    }

`


export const Select = styled.div`
    position: relative;

    & > div > button {
        margin-right: 4px;
        appearance: none;
        border: none;
        background-color: transparent;
    }
    @media (min-width: ${breakpoints.tablet}) {
        flex: 2 1 0;
    }

`
export const SelectContainer = styled.div`
    user-select: none;
    position: absolute;
    overflow-y: scroll;
    max-height: 250px;
    background-color: white;
    width: 100%;
    left: 0;
    top: 45px;
    z-index: 1;
    padding: 5px 15px;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 4px 4px rgba(0,0,0,.25);
    transform-origin: top;
    animation: .25s appear ease-out;
    & > hr:last-of-type {
        display: none;
    }
    &::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0,0,0,.15);
    }
    &::-webkit-scrollbar-thumb {
        width: 6px;
        background-color: rgba(240, 87 ,45, .7);
        border-radius: 10px;
    }
`

export const SelectOption = styled.div`

    display: flex;
    align-items: center;
    gap: 21px;
    padding: 12px 0;
    & > div > p {
        color: ${transparent2_5};
        font-weight: bold;
    }
    &:hover {
        background: linear-gradient(
            90deg, 
            white 0%, 
            rgba(240,87,45, .08) 5%, 
            rgba(240,87,45, .12) 50%, 
            rgba(240,87,45, .08) 95%, 
            white 100%
        );
    }

    ${({highlight}) => 
        highlight && `
        background: linear-gradient(
            90deg, 
            white 0%, 
            rgba(240,87,45, .12) 5%, 
            rgba(240,87,45, .22) 50%, 
            rgba(240,87,45, .12) 95%, 
            white 100%
        );
    )`}
`