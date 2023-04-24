import React from 'react'
import ProductTitle from '../../components/productSections/ProductTitle'
import ProductInfo from '../../components/productSections/ProductInfo'
import ProductImages from '../../components/productSections/ProductImages'
import ProductDescription from '../../components/productSections/ProductDescription'
import ProductFeatures from '../../components/productSections/ProductFeatures'
import ProductBooking from '../../components/productSections/ProductBooking'
import ProductLocation from '../../components/productSections/ProductLocation'
import ProductPolicy from '../../components/productSections/ProductPolicy'
import ProductReviews from '../../components/productSections/ProductReviews'

const Product = ({ product, handleAdminUpdate }) => {

    return (
        <>
            <ProductTitle title={product.title} category={product.category} />
            <ProductInfo city={product.city} rating={product.globalRating} />
            <ProductImages handleAdminUpdate={handleAdminUpdate} images={product.images} productId={product.id} />
            <ProductDescription descriptionTitle={product.descriptionTitle} description={product.description} />
            <ProductFeatures features={product.features} />
            <ProductBooking reservations={product.reservations} />
            <ProductLocation location={product.location} mapImage={product.mapImage} />
            <ProductPolicy policy={product.policy} />
            <ProductReviews reviews={product.reviews} />
        </>
    )
}

export default Product