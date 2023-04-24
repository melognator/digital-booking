import React, { useEffect, useState } from 'react'
import Products from './Products'
import axios from 'axios'
import { apiURL } from '../../utils/proxy';
import useQuery from '../../utils/useQuery';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductsContainer = ({ title }) => {

    const query = useQuery();
    const navigate = useNavigate()

    const [products, setProducts] = useState();

    // const endpoint = query.get("endpoint")
    const location = useLocation()
    // const endpoint = location.search.split('&endpoint=')[1]
    const endpoint = (location.search ? `/product/filter${location.search}` : '/product/random')

    const handleAdminDelete = (productId, token) => {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        
        axios.delete(`${apiURL}/product/${productId}`, config)
        .then(res => setProducts(prev => prev.flatMap(product => {
            if (product.id === productId) {
                return []
            } else {
                return product
            }
        })))
        .catch(err => console.log(err))
    }

    const handleAdminUpdate = (productData) => {
        navigate('/admin', {state:{productData: productData}})
    }

    useEffect(() => {
        setProducts(null);
        // axios.get('products.json')
        // axios.get(apiURL + '/product/random')
        axios.get(apiURL + endpoint)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
    },[endpoint])

    return <Products title={title} handleAdminUpdate={handleAdminUpdate} handleAdminDelete={handleAdminDelete} products={products} />
}

export default ProductsContainer