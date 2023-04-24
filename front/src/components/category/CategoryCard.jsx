import React from 'react'
import { Heading2, Heading4 } from '../common/commonStyles'
import { CategoryCardContainer, CategoryDescription, CategoryImage } from './categoriesStyles'

const CategoryCard = ({img, title, description, alt, onClick}) => {
    return (
    <CategoryCardContainer onClick={() => onClick(title)}>
        <CategoryImage src={img} alt={alt} />
        <CategoryDescription>
            <Heading2>{title}</Heading2>
            <Heading4 color='transparent2-5'>{description}</Heading4>
        </CategoryDescription>
    </CategoryCardContainer>
    )
}

export default CategoryCard