import React, { useState } from 'react'
import Details from '../../components/bookingSections/Details'
import UserArrive from '../../components/bookingSections/UserArrive'
import UserData from '../../components/bookingSections/UserData'
import UserDates from '../../components/bookingSections/UserDates'
import { FilledButton, Text1 } from '../../components/common/commonStyles'
import ProductPolicy from '../../components/productSections/ProductPolicy'
import { BookingFormContainer } from './Booking.styles'

const Booking = ({ product, user, handleSubmit, selectedRange, setSelectedRange, hourSelected, setHourSelected, errors }) => {

    const handleSelected = (day) => {
        if (selectedRange.length === 0) {
            setSelectedRange([day]);
        } else if (selectedRange.length === 1) {
            const [start] = selectedRange;
            const end = day;
            setSelectedRange([start, end].sort((a,b)=> a.getTime() - b.getTime()));
        } else {
            setSelectedRange([day]);
        }
    };

    const calendarProps = {
        selectedRange, handleSelected
    }

    const arriveProps = {
        hourSelected, setHourSelected, errors
    }

    return (<>
        <BookingFormContainer onSubmit={handleSubmit}>
            <div>
                <UserData user={user}/>
                <UserDates {...calendarProps} reservations={product.reservations}/>
                <UserArrive {...arriveProps} />
            </div>
            <Details product={product} dates={selectedRange} errors={errors} />
        </BookingFormContainer>
        <ProductPolicy policy={product.policy} />
    </>)
}

export default Booking