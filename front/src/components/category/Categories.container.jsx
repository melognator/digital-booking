import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import axios from 'axios';
import { apiURL } from '../../utils/proxy';
import { useNavigate } from 'react-router-dom';

const CategoriesContainer = () => {

    const [categories, setCategories] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(apiURL + '/category')
        .then(res => setCategories(res.data))
        .catch(err => {
            axios.get('categories.json')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
        })
    },[])

    function searchCategory (title) {
        navigate(`/product?category=${title}`)
    }

    return <Categories onClick={searchCategory} categories={categories} />
}

export default CategoriesContainer