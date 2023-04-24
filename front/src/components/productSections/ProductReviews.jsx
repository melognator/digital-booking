import React, { useState } from 'react'
import { Section, Separator, transparent2_1 } from '../common/commonStyles'
import { ProductHeading, ReviewList, ReviewListColumn } from './Product.styles'
import ReviewCard from './ReviewCard'

const ProductReviews = ({reviews}) => {

    const reviewsExample = [
        {
            author_name: "lele wonita",
            rating: 5,
            content: "Muy buen vehículo, excelente servicio."
        },
        {
            author_name: "El Pepe",
            rating: 4,
            content: "Bastante bueno, la verdad que los asientos están impecables, la comodidad del vehículo increíble. Lo único malo es que cuando lo fui a buscar me demoraron en atender."
        },
        {
            author_name: "Jorge Cobolto",
            rating: 5,
            content: ""
        },
        {
            author_name: "Andrea de Los Santos",
            rating: 3,
            content: "Pasable"
        },
        {
            author_name: "Micael Gonzales",
            rating: 5,
            content: "me gustó mucho, se lo recomendaría a cualquier amigo que ande necesitando un buen auto para recorrer la ciudad"
        },
        {
            author_name: "un hater",
            rating: 1,
            content: ""
        },
        {
            author_name: "Digital House",
            rating: 5,
            content: "Excelente gurices sigan así"
        },
    ]

    const dividedReviews = () => {
        const divisions = [[], [], [], []]

        reviews?.forEach((review, index) => {
            const divisionIndex = index % 4;
            divisions[divisionIndex].push(review)
        })

        return divisions;
    }

    return (
        <Section color={transparent2_1}>
            <ProductHeading color='color2'>Valoraciones</ProductHeading>
            <Separator color='primary' />
            <ReviewList>
                {dividedReviews().map((division, index) => <ReviewListColumn key={index}>
                    {division.map(review => <ReviewCard key={review.author_name} {...review} />)}
                </ReviewListColumn>)}
            </ReviewList>
        </Section>
    )
}

export default ProductReviews