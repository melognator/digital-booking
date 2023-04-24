import React, { useEffect, useReducer, useState } from 'react'
import { color3, FilledButton, Heading2, Heading3, primaryColor, Text1 } from '../common/commonStyles'
import { CardCategory, DoubleCard, HeartButton, ImageContainer, ProductButtons, ProductDescription, ProductDescriptionBottom, ProductDescriptionText, ProductHeader, ProductImage, RightHeader, ScoreContainer } from './ProductStyles'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RatingStars from './RatingStars'
import { normalizeDescription, normalizeRating } from '../../utils/normalizations'
import ProductCardFeatures from './ProductCardFeatures'
import { useSelector } from 'react-redux'
import { TrashButton } from '../../pages/productSearch/ProductSearch.styles'
import axios from 'axios'
import { apiURL } from '../../utils/proxy'

export const ratingText = (score) => {
    if (score == 0) {
        return "Sin calificar"
    }else if (score < 1.5) {
        return "Malo"
    } else if (score < 2.5) {
        return "Regular"
    } else if (score < 3.5) {
        return "Bueno"
    } else if(score < 4.5) {
        return "Muy bueno"
    } else {
        return "Espectacular"
    }
}


const ProductCard = ({ productData, handleAdminDelete, handleAdminUpdate }) => {


    const reducer = (state, action) => {

        const likedProducts = localStorage.getItem('likedProducts') ? JSON.parse(localStorage.getItem('likedProducts')) : [];

        switch (action.type) {
            case "load":
                return {
                    ...state,
                    liked: likedProducts.includes(state.id)
                }
            case "like":
                if (likedProducts.includes(state.id)){
                    const newArray = likedProducts.map(x => x)
                    const indexToEliminate = newArray.findIndex(id => id === state.id);
                    newArray.splice(indexToEliminate, 1);
                    localStorage.setItem('likedProducts', JSON.stringify(newArray));
                    return {
                        ...state,
                        liked: false
                    }
                }else {
                    localStorage.setItem('likedProducts', JSON.stringify([...likedProducts, state.id]));
                    return {
                        ...state,
                        liked: true
                    }
                }
        }
    }

    const [product, dispatch] = useReducer(reducer, productData);

    const auth = useSelector(state => state.auth)

    const navigate = useNavigate();

    const placeholderUrl = 'https://www.google.com.uy/maps/place/Car+One/@-34.8175116,-55.9838102,17z/data=!4m6!3m5!1s0x959f89bfe70e3fbd:0xc9676c9842bc07a9!8m2!3d-34.817494!4d-55.9815893!16s%2Fg%2F11hcjw1bh6';

    const openWindow = (url, title, w, h) => {

        const left = (window.innerWidth/2)-(w/2);
        const top = (window.innerHeight/2)-(h/2);
        window.open(url, 
        title, 
        `width=${w},height=${h}, top=${top}, left=${left}`); 
        
        return false;
    }

    useEffect(() => {
        dispatch({type: 'load'});
    }, [localStorage])
    
    return (
        <DoubleCard>
            <ImageContainer>
                <ProductImage onClick={() => navigate('/product/' + product.id)} src={ product.images[0]?.url } alt={ product.images[0]?.title } />
                <HeartButton like={ product.liked } onClick={() => {dispatch({type: "like"})}}><FontAwesomeIcon fontSize={'32px'} icon="fa-solid fa-heart" /></HeartButton>
            </ImageContainer>
            <ProductDescription>
                <div>
                    <ProductHeader>
                        <div>
                            <CardCategory margin={'0 0 5px 0'} color='#909090'>{ product.category } <RatingStars rating={normalizeRating(product.globalRating)}/></CardCategory>
                            <Heading2>{ product.title }</Heading2>
                        </div>
                        <RightHeader>
                            <ScoreContainer>{ normalizeRating(product.globalRating * 2)}</ScoreContainer>
                            <Heading3 color={color3}>{ratingText(product.globalRating)}</Heading3>
                        </RightHeader>
                    </ProductHeader>
                    <Text1><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {`${product.city.cityName}, ${product.city.country}`} - <Link onClick={() => openWindow(placeholderUrl, product.title, 800, 600)} style={{textDecoration: 'none', color: primaryColor}} >MOSTRAR EN EL MAPA</Link> </Text1>
                </div>
                <ProductCardFeatures features={product.features} />
                <ProductDescriptionBottom>
                    <ProductDescriptionText>{ normalizeDescription(product.description, 100) }</ProductDescriptionText>
                    <ProductButtons>
                        <FilledButton onClick={() => navigate('/product/' + product.id)}>Ver más</FilledButton>
                        {auth.user?.role === "ROLE_ADMIN" && <>
                            <TrashButton color='royalblue'>
                                <FontAwesomeIcon onClick={() => handleAdminUpdate(productData)} fontSize={'20px'} color={'white'} icon="fa-solid fa-pen-to-square" />
                            </TrashButton>
                            <TrashButton onClick={() => handleAdminDelete(product.id, auth.token)} color='crimson'>
                                <FontAwesomeIcon fontSize={'20px'} color={'white'} icon="fa-solid fa-trash-can" />
                            </TrashButton>
                        </>}
                    </ProductButtons>
                </ProductDescriptionBottom>
            </ProductDescription>
        </DoubleCard>
    )
}

export default ProductCard