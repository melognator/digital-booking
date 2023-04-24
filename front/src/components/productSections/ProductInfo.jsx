import React from 'react'
import { Heading3, Heading4, Section, color2 } from '../common/commonStyles'
import { ProductInfoContainer, ProductInfoSection } from './Product.styles'
import { ratingText } from '../productCard'
import { ScoreContainer } from '../productCard/ProductStyles'
import RatingStars from '../productCard/RatingStars'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { normalizeRating } from '../../utils/normalizations'

const ProductInfo = ({ city, rating }) => {
  return (
    <ProductInfoSection>
        <ProductInfoContainer>
            <FontAwesomeIcon fontSize='20px' color={color2} icon="fa-solid fa-location-dot" />
            <Heading4>{`${city.country}, ${city.region}, ${city.cityName}` }</Heading4>
        </ProductInfoContainer>
        <ProductInfoContainer>
            <div>
                <RatingStars rating={ normalizeRating(rating) }/>
                <Heading3 color={'color3'}>{ ratingText(rating) }</Heading3>
            </div>
            <ScoreContainer>{ normalizeRating(rating * 2)}</ScoreContainer>
        </ProductInfoContainer>
    </ProductInfoSection>
  )
}

export default ProductInfo