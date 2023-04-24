import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Section } from '../common/commonStyles'
import { ImageContainer, ImageContainerGallery, ImageSection, Img, ImgCounter, ImgGallery, ImgIcons, ProductSmallButton } from './Product.styles'
import breakpoints from '../common/breakpoints';
import useComponentVisible from '../../utils/ClickOutsideHook';
import ImageIcons from './ImageIcons';
import { useSelector } from 'react-redux';

const ProductImages = ({ images, productId, handleAdminUpdate }) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [imgs, setImgs] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [startPosition, setStartPosition] = useState(null);
    const [right, setRight] = useState(0);

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);


    useEffect(() => {
        setImgs(images);
    }, [images])

    useEffect(() => {
        isComponentVisible ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
    }, [isComponentVisible])


    const resize = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", resize)
    }, [])

    const handleDrag = e => {
        if (e.pageX !== 0) {
            if (e.pageX > startPosition) {
                setRight(-2);
            } else if (e.pageX < startPosition) {
                setRight(2);
            }
            e.target.parentNode.parentNode.scrollLeft += right;
        }
    }

    const handleClick = (i) => {
        setIsComponentVisible(true);
        setCurrentImage(i);
    }

    return (
        <>
            <ImageSection>
                <ImageIcons productId={productId} handleAdminUpdate={handleAdminUpdate} />
                <ImageContainer>
                    {
                        imgs.map((img, i) => i < 5 && <Img onClick={() => handleClick(i)} key={i} src={img.url} alt='product image' />)
                    }
                    <ImgCounter onClick={() => setIsComponentVisible(true)}>
                        {
                            width < breakpoints.laptop.slice(0, -2) ? `1/${imgs.length}` : 'Ver más'
                        }
                    </ImgCounter>
                </ImageContainer>
            </ImageSection>
            {
                isComponentVisible &&
                (width < breakpoints.laptop.slice(0, -2) ?
                    (
                        <ImgGallery>
                            <div ref={ref}>
                                <FontAwesomeIcon onClick={() => setCurrentImage(prev => prev === 0 ? imgs.length - 1 : prev - 1)} icon={'fa-solid fa-chevron-left'} />
                                <Img src={imgs[currentImage].url} />
                                <FontAwesomeIcon onClick={() => setCurrentImage(prev => prev === imgs.length - 1 ? 0 : prev + 1)} icon={'fa-solid fa-chevron-right'} />
                                <ImgCounter>
                                    {currentImage + 1}/{imgs.length}
                                </ImgCounter>
                            </div>
                        </ImgGallery>
                    ) :
                    (
                        // hacer de vuelta
                        <ImgGallery>
                            <div ref={ref}>
                                <div>
                                    <FontAwesomeIcon onClick={() => setCurrentImage(prev => prev === 0 ? imgs.length - 1 : prev - 1)} icon={'fa-solid fa-chevron-left'} />
                                    <Img src={imgs[currentImage].url} />
                                    <FontAwesomeIcon onClick={() => setCurrentImage(prev => prev === imgs.length - 1 ? 0 : prev + 1)} icon={'fa-solid fa-chevron-right'} />
                                </div>
                                <p>
                                    {currentImage + 1}/{imgs.length}
                                </p>
                                <ImageContainerGallery onDragStart={(e) => setStartPosition(e.pageX)} onDrag={handleDrag} >
                                    <div >
                                        {
                                            imgs.map((img, i) => <Img onClick={() => handleClick(i)} shown={i === currentImage} key={i} src={img.url} alt='product image' />)
                                        }
                                    </div>
                                </ImageContainerGallery>
                            </div>
                        </ImgGallery>
                    ))
                // style={{right: `${right}px`}}
            }
        </>
    )
}

export default ProductImages