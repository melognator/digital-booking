import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import useComponentVisible from '../../utils/ClickOutsideHook'
import { ImgIcons, ProductSmallButton, ShareButton, ShareButtonsContainer, ShareContainer } from './Product.styles'
import { useSelector } from 'react-redux'

const ImageIcons = ({ productId, handleAdminUpdate }) => {

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const auth = useSelector(state => state.auth)
    const [liked, setLiked] = useState(false)

    const handleAdminDelete = () => {
        const config = {
            headers:{
                Authorization: `Bearer ${auth.token}`,
            }
        }
        
        axios.delete(`${apiURL}/product/${productId}`, config)
        .then(res => redirect('/'))
        .catch(err => console.log(err))
    }

    const handleShare = () => {
        setIsComponentVisible(prev => !prev)
    }

    useEffect(() => {
        const likedProducts = localStorage.getItem('likedProducts') ? JSON.parse(localStorage.getItem('likedProducts')) : [];
        setLiked(likedProducts.includes(productId))
    }, [productId])

    const handleLiked = () => {
        const likedProducts = localStorage.getItem('likedProducts') ? JSON.parse(localStorage.getItem('likedProducts')) : [];
        if (likedProducts.includes(productId)) {
            const newArray = likedProducts.map(x => x)
            const indexToEliminate = newArray.findIndex(id => id === productId);
            newArray.splice(indexToEliminate, 1);
            localStorage.setItem('likedProducts', JSON.stringify(newArray));
            setLiked(false)
        } else {
            localStorage.setItem('likedProducts', JSON.stringify([...likedProducts, productId]));
            setLiked(true)
        }
    }

    return (
        <ImgIcons>
            <ShareContainer>
                <ProductSmallButton ref={ref} show={isComponentVisible} onClick={handleShare}>
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 14.8508C16.6133 14.8508 15.82 15.1673 15.2133 15.663L6.895 11.2858C6.95333 11.0432 7 10.8006 7 10.5475C7 10.2943 6.95333 10.0517 6.895 9.80914L15.12 5.47413C15.75 6.00151 16.5783 6.32848 17.5 6.32848C19.4367 6.32848 21 4.91512 21 3.16424C21 1.41336 19.4367 0 17.5 0C15.5633 0 14 1.41336 14 3.16424C14 3.41738 14.0467 3.65997 14.105 3.90256L5.88 8.23757C5.25 7.7102 4.42167 7.38322 3.5 7.38322C1.56333 7.38322 0 8.79658 0 10.5475C0 12.2983 1.56333 13.7117 3.5 13.7117C4.42167 13.7117 5.25 13.3847 5.88 12.8574L14.1867 17.2346C14.1283 17.4561 14.0933 17.6881 14.0933 17.9307C14.0933 19.6288 15.6217 21 17.5 21C19.3783 21 20.9067 19.6288 20.9067 17.9307C20.9067 16.2325 19.3783 14.8508 17.5 14.8508ZM17.5 2.10949C18.1417 2.10949 18.6667 2.58413 18.6667 3.16424C18.6667 3.74435 18.1417 4.21899 17.5 4.21899C16.8583 4.21899 16.3333 3.74435 16.3333 3.16424C16.3333 2.58413 16.8583 2.10949 17.5 2.10949ZM3.5 11.6022C2.85833 11.6022 2.33333 11.1276 2.33333 10.5475C2.33333 9.96735 2.85833 9.49272 3.5 9.49272C4.14167 9.49272 4.66667 9.96735 4.66667 10.5475C4.66667 11.1276 4.14167 11.6022 3.5 11.6022ZM17.5 18.9854C16.8583 18.9854 16.3333 18.5108 16.3333 17.9307C16.3333 17.3506 16.8583 16.8759 17.5 16.8759C18.1417 16.8759 18.6667 17.3506 18.6667 17.9307C18.6667 18.5108 18.1417 18.9854 17.5 18.9854Z" fill="white" />
                    </svg>
                </ProductSmallButton>
                <ShareButtonsContainer show={isComponentVisible}>
                    <ShareButton color='#3b5998'>
                        <FontAwesomeIcon color='white' icon="fa-brands fa-facebook-f" />
                    </ShareButton>
                    <ShareButton color='#25D366'>
                        <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
                    </ShareButton>
                    <ShareButton color='#00acee'>
                        <FontAwesomeIcon icon="fa-brands fa-twitter" />
                    </ShareButton>
                    <ShareButton color='#0077B5'>
                        <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
                    </ShareButton>
                    <ShareButton instagram={true} color='#f09433'>
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </ShareButton>
                    <ShareButton color='#FF5700'>
                        <FontAwesomeIcon icon="fa-brands fa-reddit-alien" />
                    </ShareButton>
                </ShareButtonsContainer>
            </ShareContainer>
            <ProductSmallButton onClick={handleLiked}>
                {liked ?
                    <svg width="21" height="21" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.4809 0.651306C13.6539 0.651306 11.9004 1.49 10.7559 2.80498C9.61136 1.49 7.85786 0.651306 6.03086 0.651306C2.79686 0.651306 0.255859 3.14667 0.255859 6.34613C0.255859 10.2497 3.82586 13.4491 9.23336 18.2845L10.7559 19.6513L12.2784 18.2845C17.6859 13.4491 21.2559 10.2497 21.2559 6.34613C21.2559 3.14667 18.7149 0.651306 15.4809 0.651306Z" fill="#191B1D" />
                    </svg>
                    :
                    <svg width="21" height="21" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.605 16.1008L10.5 16.2044L10.3845 16.1008C5.397 11.6381 2.1 8.68719 2.1 5.69482C2.1 3.62398 3.675 2.07084 5.775 2.07084C7.392 2.07084 8.967 3.10627 9.5235 4.51444H11.4765C12.033 3.10627 13.608 2.07084 15.225 2.07084C17.325 2.07084 18.9 3.62398 18.9 5.69482C18.9 8.68719 15.603 11.6381 10.605 16.1008ZM15.225 0C13.398 0 11.6445 0.838692 10.5 2.15368C9.3555 0.838692 7.602 0 5.775 0C2.541 0 0 2.49537 0 5.69482C0 9.59836 3.57 12.7978 8.9775 17.6332L10.5 19L12.0225 17.6332C17.43 12.7978 21 9.59836 21 5.69482C21 2.49537 18.459 0 15.225 0Z" fill="white" />
                    </svg>
                }
            </ProductSmallButton>
            {auth.user?.role === "ROLE_ADMIN" && <>
                <ProductSmallButton onClick={handleAdminUpdate}>
                    <FontAwesomeIcon fontSize={'20px'} color={'white'} icon="fa-solid fa-pen-to-square" />
                </ProductSmallButton>
                <ProductSmallButton onClick={() => handleAdminDelete()}>
                    <FontAwesomeIcon fontSize={'20px'} color={'white'} icon="fa-solid fa-trash-can" />
                </ProductSmallButton>
            </>}
        </ImgIcons>
    )
}

export default ImageIcons