import styled from "styled-components";


export const AlertContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    background-color: rgba(255, 0, 0, .15);
    padding: 15px;
    border-radius: 8px;


    & > span {
        background-color: #B00020;   
        color: white;
        text-align: center;
        font-weight: bolder;
        font-size: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding: 10px; */
        min-width: 42px;
        min-height: 42px;
        border-radius: 50%;
    }
    & > p {
        color: #B00020;
        font-weight: bold;
    }

`