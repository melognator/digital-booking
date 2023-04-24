import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useQuery from '../../utils/useQuery'
import ProductSearch from './ProductSearch'

const ProductSearchContainer = () => {

    const navigate = useNavigate()

    const emptyTitle = ""
    const emptyLocation = {
        cityName: "",
        country: "",
        region: ""
    }
    const emptyRange = []
    const emptyFeatures = []
    const emptyCategory = ""

    const query = useQuery();

    const [title, setTitle] = useState(emptyTitle)
    const [selectedLocation, setSelectedLocation] = useState(query.get('city') ? {...emptyLocation, cityName: query.get('city')} : emptyLocation)
    const [selectedRange, setSelectedRange] = useState(query.get('startDate') && query.get('finishDate') ? [new Date(query.get('startDate') + 'T00:00'), new Date(query.get('finishDate') + 'T00:00')] : emptyRange)
    const [selectedFeatures, setSelectedFeatures] = useState(query.get('featureIds') ? 
    query.get('featureIds').split(',').flatMap(id => isNaN(id) ? [] : parseInt(id))
    : emptyFeatures)
    const [selectedCategory, setSelectedCategory] = useState(query.get('category') ? query.get('category') : emptyCategory)

    useEffect(() => {
        updateTitle()
    }, [])

    const updateTitle = () => {
        if (selectedLocation.cityName || selectedRange.length > 0 || selectedFeatures.length > 0 || selectedCategory) {
            if (selectedLocation.cityName) {
                if (selectedRange.length > 0) {
                    setTitle(`Vehículos disponibles en ${selectedLocation.cityName}`)
                } else {
                    setTitle(`Vehículos en ${selectedLocation.cityName}`)
                }
            } else {
                if(selectedCategory) {
                    let categoryTitle = selectedCategory.toLocaleLowerCase()
                    if (categoryTitle == 'deportivo' || categoryTitle == 'económico') {
                        categoryTitle += 's'
                    }
                    setTitle(`Vehículos ${categoryTitle} disponibles`)
                } else {
                    setTitle(`Vehículos disponibles`)
                }
            }
        } else {
            setTitle(emptyTitle)
        }
    }
    
    const handleSearch = () => {
        const featuresParams = selectedFeatures.length > 0 ? `featureIds=${selectedFeatures.join(',')}` : ""
        const cityParams = selectedLocation.cityName ? `city=${selectedLocation.cityName}` : ""
        const categoryParams = selectedCategory ? `category=${selectedCategory}` : ""
        const startDateParams = selectedRange[0] ? `startDate=${selectedRange[0].toLocaleDateString('fr-CA')}` : ""
        const finishDateParams = selectedRange[1] ? `finishDate=${selectedRange[1].toLocaleDateString('fr-CA')}` : ""
        const params = []
        featuresParams != "" && params.push(featuresParams)
        cityParams != "" && params.push(cityParams)
        categoryParams != "" && params.push(categoryParams)
        startDateParams != "" && params.push(startDateParams)
        finishDateParams != "" && params.push(finishDateParams)

        const endpoint = `/product?${params.join("&")}`

        if (params.length > 0) {
            navigate(endpoint)
        } else {
            navigate('/product')
        }
        updateTitle()
    }

    const handleTrash = () => {
        setSelectedLocation(emptyLocation)
        setSelectedRange(emptyRange)
        setSelectedFeatures(emptyFeatures)
        setSelectedCategory(emptyCategory)
    }

    const handleSelectedLocation = (cityName, countryName) => {
        setSelectedLocation(() => ({ cityName, countryName }));
    }

    const handleSelectedRange = (day) => {
        if (selectedRange.length === 0) {
            setSelectedRange([day]);
        } else if (selectedRange.length === 1) {
            const [start] = selectedRange;
            const end = day;
            setSelectedRange([start, end].sort((a,b)=> a.getTime() - b.getTime()));
        } else {
            setSelectedRange([day]);
        }
    };

    const handleSelectedFeatures = (featureId) => {
        setSelectedFeatures(prev => {
            const index = prev.indexOf(featureId);
            if (index !== -1) {
                const modified = [...prev]
                modified.splice(index, 1);
                return modified
            } else {
                return [...prev, featureId];
            }
        });
    }

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category)
    }
    
    const ProductSearchProps = {
        title,
        selectedLocation,
        selectedRange,
        selectedFeatures,
        selectedCategory,
        handleSelectedLocation,
        handleSelectedRange,
        handleSelectedFeatures,
        handleSelectedCategory,
        handleSearch,
        handleTrash,
    }


    return <ProductSearch {...ProductSearchProps} />
}

export default ProductSearchContainer