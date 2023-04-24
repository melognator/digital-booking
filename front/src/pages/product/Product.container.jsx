import React, { useEffect, useState } from 'react'
import Product from './Product'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../../utils/proxy'

const ProductContainer = () => {
    const initalState = {
        "id": -1,
        "images": [],
        "title": "",
        "city": {
            "cityName": "",
            "region": "",
            "coutry": ""
        },
        "mapImage": "",
        "description": "",
        "descriptionTitle": "",
        "globalRating": -1,
        "liked": false,
        "taken": [], // formato: [fecha, fecha, fecha]
        "features": [], // formato: [{id, title, icon}]
        "policy": [] // formato: [{id, title, rules: []}]
    }

    const navigate = useNavigate()
    const [product, setProduct] = useState(initalState);
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(() => {
        axios.get(apiURL + `/product/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.log(err))
        // setProduct(ejemplo)
    }, [])

    const handleAdminUpdate = () => {
        navigate('/admin', {state:{productData: product}})
    }

    return <Product handleAdminUpdate={handleAdminUpdate} product={product} />
}

export default ProductContainer