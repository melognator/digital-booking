import styled from "styled-components";
import { Card, Form, Textarea, primaryColor, transparent2_1, transparent2_3 } from "../../components/common/commonStyles";
import { SelectContainer, SelectInput } from "../../components/search/SearchStyles";
import breakpoints from "../../components/common/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PagesNav = styled.div`

    display: flex;
    justify-content: center;
    gap: 20px;
    & > p {
        box-shadow: 0 0 5px rgba(0,0,0,.5);
        color: ${primaryColor};
        width: 30px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        cursor: pointer;

        &:hover,
        &:active {

        }
    }
`

export const FormContainer = styled(Card)`
    margin: 10px auto;
`
export const AdminForm = styled(Form)`
    padding: 25px;
    width: auto;
    margin: 0;
    min-height: inherit;

`

export const AdminSelect = styled(SelectInput)`
    margin-top: 10px;
    box-shadow: 0 1px 5px rgba(0,0,0,.25);

`

export const FormSection = styled.section`
    padding: 10px 0;
    display: grid;
    gap: 15px;
    @media (min-width: ${breakpoints.laptop}) {
        grid-template-columns: 1fr 1fr;
        
    }
`

export const FeatureSection = styled.section`
    padding: 10px 0;
    & > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 15px;
        padding: 15px 0;
        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        & * {
            min-width: auto;
        }
        & > svg {
            top: -25px;
            left: 10px;
        }
        @media (min-width: ${breakpoints.laptop}) {
            & > div {
            }
            & > svg {
                top: 15px;
                left: 0;
            }
        }
    }
    
`

export const PolicySection = styled.section`

    padding: 10px 0;
    & > div {
        padding: 15px 0;
        display: grid;
        gap: 15px;
    
        @media (min-width: ${breakpoints.laptop}) {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 25px;
        }
    }

`

export const TextArea = styled(Textarea)`

    width: 100%;
    margin-top: 10px;

`
export const ImageSection = styled.section`
    padding: 10px 0;
`

export const ImageSectionInput = styled.div`
    padding: 15px 0;
    display: flex;
    align-items: end;
    gap: 15px;
    & > div {
        flex-grow: 1;
    }
`

export const AddIcon = styled.button`
    cursor: pointer;
    position: relative;
    aspect-ratio: 1/1;
    color: white;
    outline: 0;
    border: 0;
    background-color: ${primaryColor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 5px;
    border-radius: 5px;
    font-size: 30px;
    &:hover {
        filter: brightness(90%);
    }
     &:active {
        filter: brightness(80%);
    }
`

export const AdminSelectContainer = styled(SelectContainer)`

    top: 75px;

`

export const SectionContainer = styled.div`

    display: grid;

    @media (min-width: ${breakpoints.laptop}) {
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        & > hr {
            display: none
        }
    }

`

export const Feature = styled(FontAwesomeIcon)`
    cursor: pointer;
    appearance: none;
    color: ${primaryColor};
    width: 25px;
    font-size: 24px;
    padding: 5px;
    border-radius: 4px;
    border:  ${({ checked }) => checked ? `2px solid ${primaryColor}` : `2px solid ${transparent2_3}`};

`

export const AdminProductImages = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px;
`

export const AdminProductImageContainer = styled.div`
    position: relative;
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0,0,0,.25);
    &:hover {
        & > img {
            filter: brightness(50%)
        }
    }
    &:active {
        & > img {
            filter: brightness(35%)
        }
    }
    & > img {
        border-radius: inherit;
        width: 100%;
        object-fit: cover;
        aspect-ratio: 16 / 10;
    }
    & > svg {
        display: ${({ hovering }) => hovering ? "flex" : "none"};
        color: white;
        position: absolute;
        align-self: center;
        left:0;
        right:0;
        margin-left:auto;
        margin-right:auto;
    }
`