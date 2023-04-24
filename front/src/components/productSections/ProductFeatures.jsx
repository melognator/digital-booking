import React from 'react'
import { Section, Separator, Text1, primaryColor } from '../common/commonStyles'
import { Feature, FeatureContainer, ProductHeading } from './Product.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductFeatures = ({ features }) => {
  return (
    <Section color='white'>
        <ProductHeading color='color2'>¿Qué ofrece este vehículo?</ProductHeading>
        <Separator color='primary' />
        <FeatureContainer>
            {features.map(feature => (
                <Feature key={feature.id}>
                    <FontAwesomeIcon fontSize='24px' color={primaryColor} icon={ feature.icon }/>
                    <Text1>{ feature.title }</Text1>
                </Feature>
            ))}
        </FeatureContainer>
    </Section>
  )
}

export default ProductFeatures