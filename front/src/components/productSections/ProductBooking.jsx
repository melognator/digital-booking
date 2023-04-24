import React, { useState } from 'react'
import { FilledButton, Heading3, Section } from '../common/commonStyles'
import { BookingContainer, BookingForm, ProductHeading, StyledCalendar } from './Product.styles'
import Calendar from '../common/Calendar'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductBooking = ({reservations}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedRange, setSelectedRange] = useState([]);

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

    const handleSubmmit = e => {
        e.preventDefault();
        navigate(`${location.pathname}/booking`, {state: { selectedRange }});
    }

    const calendarProps = {
        selectedRange, handleSelected, reservations
    }

    return (
        <Section color='transparent2-1'>
            <ProductHeading color='color2'>Fechas disponibles</ProductHeading>
            <BookingForm onSubmit={handleSubmmit}>
                <StyledCalendar {...calendarProps} />
                <BookingContainer>
                    <Heading3 margin='20px 0' color='color2'>Agregá tus fechas de viaje para obtener precios exactos</Heading3>
                    <FilledButton>Iniciar reserva</FilledButton>
                </BookingContainer>
            </BookingForm>
        </Section>
    )
}

export default ProductBooking