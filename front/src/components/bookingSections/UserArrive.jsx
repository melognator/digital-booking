import React, { useEffect, useRef, useState } from 'react'
import { FormCard, FormField, FormGroup, FormInput, FormLabel, FormTitle, HourContainer, SelectHour, WrongText } from './BookingSectionStyles'
import { Input, primaryColor, Text1 } from '../common/commonStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SelectOption } from '../search/SearchStyles'
import useComponentVisible from '../../utils/ClickOutsideHook'


const generateHours = () => {
    const hoursArray = [];
    for (let i = 9; i < 19; i++){
        if(i < 10) {
            hoursArray.push(`0${i}:00`)
            continue
        } 
        hoursArray.push(`${i}:00`)
    }
    return hoursArray;
}

const UserArrive = ({hourSelected, setHourSelected, errors}) => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    // const [update, setUpdate] = useState(0);

    // useEffect(() => {
    //     setUpdate(prev => prev + 1)
    // }, [errors])

    useEffect(() => {
        setIsComponentVisible(() => false);
    }, [hourSelected]);


    return (
        <FormGroup>
            <FormTitle>Tu horario de llegada</FormTitle>
            <FormCard>
                <div>
                    <Text1><strong>Tu auto va a estar listo para recoger entre las 10:00 AM y las 11:00 PM</strong></Text1>
                </div>
                <FormField>
                    <FormLabel>Indicá tu horario estimado de llegada</FormLabel>

                    <SelectHour ref={ref} onClick={() => setIsComponentVisible(prev => !prev)} wrong={errors.arrive ? true : false}>

                        <p>{hourSelected}</p>
                        <FontAwesomeIcon color={primaryColor} icon={isComponentVisible ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}/>
                        {
                            isComponentVisible && (
                                <HourContainer>
                                    {
                                        generateHours().map(hour => (

                                                <SelectOption key={hour} onClick={() => setHourSelected(hour)}>{hour}</SelectOption>
                                            )
                                        )
                                    }
                                </HourContainer>
                            )
                        }
                    </SelectHour>
                    {
                        errors.arrive && (
                            <WrongText width={'50%'}>{errors.arrive.message}</WrongText>
                        )
                    }
                </FormField>
            </FormCard>
        </FormGroup>
    )
}

export default UserArrive