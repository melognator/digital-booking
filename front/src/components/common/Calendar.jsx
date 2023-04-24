import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import breakpoints from './breakpoints';
import { FilledButton } from './commonStyles';
import { CalendarContainer, CalendarDisplay, CalendarGrid, CalendarHeader, CalendarWeekDays, Day } from './commonStyles';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function Calendar({selectedRange, handleSelected, setIsComponentVisible, className, wrapper, reservations}) {

    const [width, setWidth] = useState(window.innerWidth);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handlePrevMonth = () => {
        const monthNow = new Date().getMonth()
        const yearNow = new Date().getFullYear()
        if ( month > monthNow || year > yearNow) {
            setMonth(month => month - 1);
        }
        if (month === 0) {
            setYear(year => year - 1);
            setMonth(11);
        }
    };

    const handleNextMonth = () => {
        setMonth(month => month + 1);
        if (month === 11) {
            setYear(year => year + 1);
            setMonth(0);
        }
    };


    const renderWeekdays = () => {
        const weekdays = ["D", "L", "M", "M", "J", "V", "S"];
        return (
            <>
                {weekdays.map((day, i) => (
                    <CalendarWeekDays key={day + i}>{day}</CalendarWeekDays>
                ))}
            </>
        );
    };

    const checkBooked = (date) => {

        for (let i = 0; i < reservations?.length; i++) {
            const startDate =  new Date (reservations[i].startReservation + "T00:00:00");
            const endDate =  new Date (reservations[i].endReservation + "T00:00:00");

            
            if (date < startDate || date > endDate) {
                continue;

            }else if (date >= startDate && date <= endDate ) {
                
                    return true;
            }
            
        }
        return false;
    }

    const renderDays = (m) => {
        const numDays = daysInMonth(m, year);
        const firstDay = firstDayOfMonth(m, year);
        let days = [];

        for (let i = 1; i <= firstDay; i++) {
            days.push(<Day key={`empty${i}`} empty={true}></Day>);
        }

        for (let i = 1; i <= numDays; i++) {
            const date = new Date(year, m, i);

            const disabled = date < new Date() || (reservations && checkBooked(date));

            const selected = selectedRange.length === 2 && date.getTime() >= selectedRange[0]?.getTime() && date <= selectedRange[1]?.getTime();
            const startORend = date.getTime() == selectedRange[0]?.getTime() || date.getTime() == selectedRange[1]?.getTime();
            days.push(<Day key={i} disabled={disabled} startORend={startORend} selectedRange={selected} onClick={disabled ? () => {} :() => handleSelected(date)}>{i}</Day>);
        }

        return (
            <>
                {days.map(day => day)}
            </>
        );
    };

    const resize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", resize)
    }, [])

    return (
        <CalendarContainer className={className}>  
            {
                width < breakpoints.tablet.slice(0, -2) ? (
                    <div>
                        <CalendarHeader>
                            <FontAwesomeIcon icon={'fa-solid fa-chevron-left'} onClick={handlePrevMonth}/>
                            <p>{capitalizeFirstLetter(`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`)}</p>
                            <FontAwesomeIcon icon={'fa-solid fa-chevron-right'} onClick={handleNextMonth}/>
                        </CalendarHeader>
                        <CalendarDisplay>
                            {renderWeekdays()}
                            {renderDays(month)}
                        </CalendarDisplay>
                    </div>
                    )
                    : 
                    (
                    <CalendarGrid wrapper={wrapper}>
                        {
                            (wrapper || width < breakpoints.laptop.slice(0, -2)) || <FontAwesomeIcon icon={'fa-solid fa-chevron-left'} onClick={handlePrevMonth}/>
                        }
                        <div>
                            <CalendarHeader>
                                {
                                    (wrapper || width < breakpoints.laptop.slice(0, -2)) && <FontAwesomeIcon icon={'fa-solid fa-chevron-left'} onClick={handlePrevMonth}/>
                                }
                                <p>{capitalizeFirstLetter(`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`)}</p>
                            </CalendarHeader>
                            <CalendarDisplay>
                                {renderWeekdays()}
                                {renderDays(month)}
                            </CalendarDisplay>
                        </div>
                        <hr />
                        <div>
                            <CalendarHeader>
                                <p>{capitalizeFirstLetter(`${new Date(year, month + 1).toLocaleString('default', { month: 'long' })} ${year}`)}</p>
                                {
                                    (wrapper || width < breakpoints.laptop.slice(0, -2)) && <FontAwesomeIcon icon={'fa-solid fa-chevron-right'} onClick={handleNextMonth}/>
                                }
                            </CalendarHeader>
                            <CalendarDisplay>
                                {renderWeekdays()}
                                {renderDays(month + 1)}
                            </CalendarDisplay>
                        </div>
                        {
                            (wrapper || width < breakpoints.laptop.slice(0, -2)) || <FontAwesomeIcon icon={'fa-solid fa-chevron-right'} onClick={handleNextMonth}/>
                        }
                    </CalendarGrid>
                    )
                
            }
            <FilledButton onClick={() => setIsComponentVisible(false)}>
                Aplicar
            </FilledButton>
        </CalendarContainer>
    );
}

export default Calendar;