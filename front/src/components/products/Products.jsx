import React from 'react'
import { Title, Section, Heading4 } from '../common/commonStyles'

import { ProductContainer, Products404 } from './Products.style'
import SkeletonProduct from './SkeletonProduct'
import ProductCard from '../productCard'
const Products = ({ title, products, handleAdminDelete, handleAdminUpdate }) => {
  return (
    <Section>
        <Title>{title ? title : "Recomendaciones"}</Title>
        <ProductContainer>

            { 
                products ? 
                products.length > 0 ? products.map(product => <ProductCard key={product.id} handleAdminDelete={handleAdminDelete} handleAdminUpdate={handleAdminUpdate} productData={product} />)
                :
                <Products404>No se han encontrado resultados...</Products404>
                :
                <>
                    <SkeletonProduct/>
                    <SkeletonProduct/>
                </>
            }
        </ProductContainer>
    </Section>
  )
}

export default Products