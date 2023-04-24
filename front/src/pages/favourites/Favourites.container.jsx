import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiURL } from '../../utils/proxy';
import Favourties from './Favourties'

const FavouritesContainer = () => {

    const [products, setProducts] = useState([]);
    const productsIds = JSON.parse(localStorage.getItem('likedProducts'))

    useEffect(() => {
        productsIds?.map((id) => {
            axios.get(`${apiURL}/product/${id}`)
            .then(res => setProducts(prev => prev.length > 0 ? [...prev, res.data] : [res.data]))
            .catch(err => console.log(err))
        })
    }, [])

    return <Favourties title={'Mis favoritos'} products={products}/>
}

export default FavouritesContainer