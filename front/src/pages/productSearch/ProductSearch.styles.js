import styled from 'styled-components'
import breakpoints from '../../components/common/breakpoints'
import { color3, FilledButton, Section } from '../../components/common/commonStyles'


export const SearchSection = styled(Section)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    color: ${color3};
`

export const SearchInputContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: 10px;

    & > div {
        display: grid;
        grid-template-columns: 1fr;
        width: 100%;
        gap: 10px;
        
        @media (min-width: ${breakpoints.tablet}) {
            grid-template-columns: 1fr 1fr;
        }

        @media (min-width: ${breakpoints.bigLaptop}) {
            display: flex;
            flex-direction: row;
        }
    }

    & > span {
        display: flex;
        gap: 10px;
        & > button:nth-child(2) {
            flex: 1 1 0;
        }
    }

    @media (min-width: ${breakpoints.bigLaptop}) {
        display: flex;
        flex-direction: row;
    }
`

export const TrashButton = styled(FilledButton)`
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
`