import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heading2, Heading3, primaryColor, Section, Text1, Title } from '../../components/common/commonStyles'
import { CardCategory, ProductHeader, RightHeader } from '../../components/productCard/ProductStyles'
import RatingStars from '../../components/productCard/RatingStars'
import BookingRatingStars from './BookingRatingStars'
import BookingReview from './BookingReview'
import { BookingCard, BookingCardInformation, BookingCardMain, BookingCardReview, BookingList, BookingReviewHeader, BookingSeparator } from './Bookings.style'
import { BookingSection } from './Bookings.style'

const Bookings = ({ title, bookings, setBookings }) => {

    const calculateState = (startDate, endDate) => {
        const hoy = new Date()
        const inicio = new Date(startDate + "T00:00")
        const fin = new Date(endDate + "T23:59")
        if (hoy < inicio) {
            return {
                color: 'gold',
                text: 'Reservado'
            }
        } else if (hoy > fin) {
            return {
                color: primaryColor,
                text: 'Completado'
            }
        } else {
            return {
                color: 'limegreen',
                text: 'Activo'
            }
        }
    }

    return (
        <BookingSection>
            <Title>{title}</Title>
            <BookingList>
                {bookings.map((booking, index) => <BookingCard key={index}>
                    <BookingCardMain>
                        <img src={booking.product.image[0].url} alt={booking.product.image[0].title} />
                        <BookingCardInformation>
                            <ProductHeader>
                                <div>
                                    <CardCategory margin={'0 0 5px 0'} color='#909090'>{booking.product.category}</CardCategory>
                                    <Heading2>{booking.product.title}</Heading2>
                                </div>
                                <RightHeader>
                                    <FontAwesomeIcon color={calculateState(booking.startReservation, booking.endReservation).color} fontSize={'12px'} icon="fa-solid fa-circle" />
                                    <Text1>{calculateState(booking.startReservation, booking.endReservation).text}</Text1>
                                </RightHeader>
                            </ProductHeader>
                            <Text1><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {`${booking.product.city.cityName}, ${booking.product.city.country}`} - <Link onClick={() => openWindow("", booking.product.title, 800, 600)} style={{ textDecoration: 'none', color: primaryColor }} >MOSTRAR EN EL MAPA</Link> </Text1>
                            <BookingSeparator />
                            <Text1>Hora de recogida: <strong>{booking.hourStartReservation}</strong></Text1>
                            <Text1>Fecha de inicio: <strong>{booking.startReservation}</strong></Text1>
                            <Text1>Fecha fin: <strong>{booking.endReservation}</strong></Text1>
                        </BookingCardInformation>
                    </BookingCardMain>
                    <BookingReview productId={booking.product.id} setBookings={setBookings} review={booking.review}/>
                </BookingCard>)}
            </BookingList>
        </BookingSection>
    )
}

export default Bookings