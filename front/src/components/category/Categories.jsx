import React from 'react'
import { CategoriesContainer, } from './categoriesStyles'
import { Section, Title, color2 } from '../common/commonStyles'
import CategoryCard from './CategoryCard'
import SkeletonCategory from './SkeletonCategory'

const Categories = ({ categories, onClick }) => {
    return (
        <Section color='white'> 
            <Title color={color2}>Buscá por marca</Title>
            <CategoriesContainer>
                {
                    categories ? categories.map(category => <CategoryCard onClick={onClick} key={ category.id } img={ category.img } title={ category.title } description={` ${category.productsAmount} autos `} />)
                    :
                    <>
                        <SkeletonCategory />
                        <SkeletonCategory />
                    </>
                }

                {/* <SkeletonCategory/>
        <SkeletonCategory/> */}
            </CategoriesContainer>
        </Section>
    )
}

export default Categories