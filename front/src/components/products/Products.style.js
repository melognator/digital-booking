import styled from "styled-components";
import breakpoints from "../common/breakpoints";
import { Text1, color2 } from "../common/commonStyles";


export const ProductContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 15px;
    /* margin: 25px 0; */
    
    min-height: 90px;
    @media (min-width: ${breakpoints.laptop}) {
        grid-template-columns: 1fr 1fr;
    }
`

export const Products404 = styled(Text1)`
    color: white;
    font-size: 16px;

    @media (min-width: ${breakpoints.tablet}) {
        color: ${color2};
    }
`