import React from 'react'
import { useState } from 'react'
import RatingStars from '../../components/productCard/RatingStars'

const BookingRatingStars = ({ review }) => {

    const [selected, setSelected] = useState(false)
    const [currentStars, setCurrentStars] = useState(0)

    const handleHover = (index) => {
        if (!selected) {
            setCurrentStars(index)
        }
    }

    const handleClick = (index) => {
        setCurrentStars(index)
        setSelected(true)
    }

    return (
        <RatingStars fontSize={'24px'} onMouseEnter={handleHover} onMouseLeave={() => handleHover(0)} rating={currentStars}/>
    )
}

export default BookingRatingStars