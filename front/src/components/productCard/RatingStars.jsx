import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Star } from './ProductStyles';

const RatingStars = ({ rating, className, fontSize, onMouseEnter, onMouseLeave, onClick }) => {

    const stars = [];

    for(let i = 1; i <= 5; i++) {
        let percentage = 0;
        if (rating >= i) {
            percentage = 1;
        } else if (rating > (i - 1)) {
            percentage = rating % 1;
        }
        stars.push({percentage, i})
    }


    return (
        <span className={className}>
            {stars.map(star =><Star key={star.i} fontSize={fontSize} onMouseEnter={onMouseEnter ? () => onMouseEnter(star.i) : () => ""} onMouseLeave={ onMouseLeave ? () => onMouseLeave(star.i) : () => ""} onClick={onClick ? () => onClick(star.i) : () => ""} percentage={star.percentage} >★</Star>)}
            {/* {stars.map(star =><Star key={star.i} percentage={star.percentage} ><FontAwesomeIcon icon="fa-solid fa-star" /></Star>)} */}
        </span>
    )
}

export default RatingStars