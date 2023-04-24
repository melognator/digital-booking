import styled from "styled-components";
import { FilledButton } from "../../components/common/commonStyles";

export const Container = styled.div`

    width: 100%;
    height: 80svh;
    display: flex;
    justify-content: center;
    align-items: center;

`
export const Card = styled.div`

    width: 90%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 4px rgba(0,0,0, .25);
    border: solid 1px rgba(0,0,0, .10);
    max-width: 600px;
    & > div {
        & > *{
            margin: 10px 0%;
            text-align: center;
        }
    }
`

export const ResultButton = styled(FilledButton)`

    width: 60%;

`