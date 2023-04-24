import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Heading3, primaryColor } from '../common/commonStyles'
import { FeatureItem, FeaturesContainer } from './ProductStyles'

const ProductCardFeatures = ({ features }) => {
    return (
        <FeaturesContainer>
            {features.map(feature => (
                <FeatureItem title={feature.title} key={feature.id}><FontAwesomeIcon color={primaryColor} icon={feature.icon} /> {feature.acronym}</FeatureItem>
            ))}
        </FeaturesContainer>
    )
}

export default ProductCardFeatures