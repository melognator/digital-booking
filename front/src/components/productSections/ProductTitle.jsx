import React from 'react'
import { CategoryTitle, ProductHeading, ProductTitleBack, ProductTitleSection } from './Product.styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductTitle = ({title, category}) => {
  return (
    <ProductTitleSection color={"color3"}>
        <div>
            <CategoryTitle>{category}</CategoryTitle>
            <ProductHeading color="white">{title}</ProductHeading>
        </div>
        <ProductTitleBack to="/"><FontAwesomeIcon color='white' icon="fa-solid fa-chevron-left" /></ProductTitleBack>
    </ProductTitleSection>
  )
}

export default ProductTitle