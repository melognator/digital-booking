import React from 'react'
import RatingStars from '../productCard/RatingStars'
import { BookingDetailCard, ConfirmBookingButton, DetailDate, DetailsContainer, FormTitle, Img, WrongText } from './BookingSectionStyles'
import { color3, color4, Heading2, Heading3, Heading4, primaryColor, Separator, Text1, transparent2_5 } from '../common/commonStyles'
import { normalizeRating } from '../../utils/normalizations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Details = ({product, dates, errors}) => {
    return (
        <BookingDetailCard>
            <FormTitle>Detalle de la reserva</FormTitle>
            <Img src={product.images[0]?.url} alt={product.images[0]?.title} />
            <DetailsContainer>
                <div>
                    <Heading3 color={transparent2_5}> {product.category}</Heading3>
                    <Heading2> {product.title} </Heading2>
                    <RatingStars rating={normalizeRating(product.globalRating)} />
                </div>
                <Text1>
                    <FontAwesomeIcon fontSize={'20px'} color={primaryColor} icon="fa-solid fa-location-dot" /> 
                    {`${product.city.country}, ${product.city.region}, ${product.city.cityName}`}
                </Text1>
                <div>

                    <Separator color={transparent2_5}/>
                </div>
                <DetailDate>
                    <Heading3 color={color3}>Retiro <span>{dates[0]?.toLocaleDateString() === undefined ? '__ /__ /__' : dates[0]?.toLocaleDateString('en-GB')}</span></Heading3>
                    <Separator color={errors.pickUp ? 'red' : transparent2_5}/>
                    {
                        errors.pickUp && (
                            <WrongText>{errors.pickUp.message}</WrongText>
                        )
                    }
                </DetailDate>
                <DetailDate>
                    <Heading3 color={color3}>Devolucion <span>{dates[1]?.toLocaleDateString() === undefined ? '__ / __ / __' : dates[1]?.toLocaleDateString('en-GB')}</span></Heading3>
                    <Separator color={errors.return ? 'red' : transparent2_5}/>
                    {
                        errors.return && (
                            <WrongText>{errors.return.message}</WrongText>
                        )
                    }
                </DetailDate>
                <ConfirmBookingButton>Confirmar reserva</ConfirmBookingButton>
            </DetailsContainer>
        </BookingDetailCard>
    )
}

export default Details