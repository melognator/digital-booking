import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { primaryColor } from "../common/commonStyles";
import Calendar from "../common/Calendar";
import { SelectDate, SelectDaysContainer } from "./SearchStyles";
import useComponentVisible from "../../utils/ClickOutsideHook";

const SelectDays = ({ selectedRange, handleSelected }) => {

    
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    const calendarProps = {
        selectedRange, handleSelected, setIsComponentVisible
    }
    
    return (
        <SelectDaysContainer ref={ref}>
            <SelectDate onClick={() => setIsComponentVisible(prev => !prev)}>
                <FontAwesomeIcon fontSize={'20px'} color={primaryColor} icon={'fa-solid fa-calendar-day'}/>
                <p>{`${selectedRange[0]?.toLocaleDateString() === undefined ? 'Retiro' : selectedRange[0]?.toLocaleDateString('en-GB')} - ${selectedRange[1]?.toLocaleDateString() === undefined ? 'Devolucion' : selectedRange[1]?.toLocaleDateString('en-GB')}`}</p>
            </SelectDate>
            {
                isComponentVisible && <Calendar {...calendarProps} wrapper={true} />
            }
        </SelectDaysContainer>
    )
}

export default SelectDays
