import React, { useEffect, useState } from 'react'
import Products from '../../components/products/Products'

const Favourties = ({title, products}) => {

    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        setLoaded(true)
    }, [products])

    return (
        <Products title={title} products={products}/>
    )
}

export default Favourties