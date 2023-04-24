import React, { useState } from 'react'
import { FormCard, FormGroup, FormTitle } from './BookingSectionStyles'
import { BookingCalendar } from './BookingSectionStyles';

const UserDates = ({selectedRange, handleSelected, reservations}) => {

    

    const calendarProps = {
        selectedRange, handleSelected, reservations
    }

    return (
        <FormGroup>
            <FormTitle>Seleccioná tu fecha de reserva</FormTitle>
            {/* <FormCard>

            </FormCard> */}
            <BookingCalendar {...calendarProps} />
        </FormGroup>
    )
}

export default UserDates