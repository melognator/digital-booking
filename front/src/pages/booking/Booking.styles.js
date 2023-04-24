import styled from "styled-components";
import breakpoints from "../../components/common/breakpoints";
import { color2, Section, transparent2_1, Card, Input, color4, FilledButton } from "../../components/common/commonStyles";

export const BookingFormContainer = styled.form`
    background-color: ${transparent2_1};
    color: ${color2};
    display: flex;
    flex-direction: column;
    padding: 15px 15px 0 15px;
    @media (min-width: ${breakpoints.laptop}) {
        display: grid;
        gap: 25px;
        grid-template-columns: 3fr 1fr;
    }
`