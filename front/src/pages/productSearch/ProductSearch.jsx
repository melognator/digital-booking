import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FilledButton, Input } from '../../components/common/commonStyles'
import ProductsContainer from '../../components/products/Products.container'
import { ProductTitleBack } from '../../components/productSections/Product.styles'
import { SearchButton } from '../../components/search/SearchStyles'
import SelectCategory from '../../components/search/SelectCategory'
import SelectCity from '../../components/search/SelectCity'
import SelectDays from '../../components/search/SelectDays'
import SelectFeatures from '../../components/search/SelectFeatures'
import { SearchInputContainer, SearchSection, TrashButton } from './ProductSearch.styles'

const ProductSearch = ({selectedLocation,
    selectedRange,
    selectedFeatures,
    selectedCategory,
    handleSelectedLocation,
    handleSelectedRange,
    handleSelectedFeatures,
    handleSelectedCategory,
    handleSearch,
    handleTrash,
    title,}) => {
  return (
    <>
        <SearchSection color={"color3"}>
            <SearchInputContainer>
                <div>
                    <SelectCity selectedLocation={selectedLocation} handleSelected={handleSelectedLocation}/>
                    <SelectDays selectedRange={selectedRange} handleSelected={handleSelectedRange} />
                    <SelectFeatures selectedFeatures={selectedFeatures} handleSelected={handleSelectedFeatures} />
                    <SelectCategory selectedCategory={selectedCategory} handleSelected={handleSelectedCategory} />
                </div>
                <span>
                    <TrashButton onClick={handleTrash} color='crimson'>
                        <FontAwesomeIcon fontSize={'20px'} color={'white'} icon="fa-solid fa-trash-can" />
                    </TrashButton>
                    <SearchButton onClick={handleSearch}>Buscar</SearchButton>
                </span>
            </SearchInputContainer>
            <ProductTitleBack to="/"><FontAwesomeIcon color='white' icon="fa-solid fa-chevron-left" /></ProductTitleBack>
        </SearchSection>
        <ProductsContainer title={title} />
    </>
  )
}

export default ProductSearch