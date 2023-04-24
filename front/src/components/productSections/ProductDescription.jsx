import React from 'react'
import { Section, Separator, Text1, Text2, Title } from '../common/commonStyles'
import { ProductHeading } from './Product.styles'

const ProductDescription = ({descriptionTitle, description}) => {
  return (
    <Section color='white'>
        <ProductHeading color='color2'>{descriptionTitle}</ProductHeading>
        {/* <Separator color='primary' /> */}
        <Text1>{description}</Text1>
    </Section>
  )
}

export default ProductDescription