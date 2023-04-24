import React from 'react'
import { useState } from 'react'
import { FilledButton, Heading2, Text1, Textarea } from '../../components/common/commonStyles'
import RatingStars from '../../components/productCard/RatingStars'
import { BookingCardReview, BookingReviewHeader } from './Bookings.style'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { apiURL } from '../../utils/proxy'

const BookingReview = ({review, setBookings}) => {

    const [selected, setSelected] = useState(review?.rating ? true : false)
    const [saved, setSaved] = useState(true)

    const auth = useSelector(state => state.auth)

    const handleHover = (index) => {
        if (!selected) {
            setCurrentStars(index)
        }
    }


    // function randomPointOnCircle(pixels) {
    //     const angle = Math.random() * Math.PI * 2; // generate random angle between 0 and 2pi
    //     const x = Math.cos(angle) * pixels; // calculate x coordinate on circle
    //     const y = Math.sin(angle) * pixels; // calculate y coordinate on circle
    //     return { x, y }; // return object with x and y coordinates
    // }

    // const [confetti, setConfetti] = useState([])

    // const [mousePos, setMousePos] = useState({});

    // useEffect(() => {
    //     const handleMouseMove = (event) => {
    //         setMousePos({ x: event.clientX, y: event.clientY });
    //     };

    //     window.addEventListener('mousemove', handleMouseMove);

    //     return () => {
    //         window.removeEventListener(
    //             'mousemove',
    //             handleMouseMove
    //         );
    //     };
    // }, []);

    // const createConfeti = (index, x, y, time) => {
    //     const emoji = ['💀', '🤨', '😐', '😋', '']
    //     const confetti = []
    //     for (let i = 0; i < 10; i++) {
    //         const randomPoint = randomPointOnCircle(100)
    //         confetti.push(<Confetti key={i} time={time} top={y} left={x} finalX={randomPoint.x} finalY={randomPoint.y}>{emoji[index]}</Confetti>)
    //     }
    //     return confetti
    // }

    // useEffect(() => {
    //     let timer = undefined
    //     if(confetti.length > 0) {
    //         timer = setTimeout(() => setConfetti([]), 1000);
    //     }
    // }, [confetti])


    const setCurrentStars = (rating) => {
        setBookings(prev => prev.map(booking => {
            if(review.product_id == booking.product.id) {
                booking.review.rating = rating
            }
            return booking
        }))
    }

    const handleClick = (index) => {
        setCurrentStars(index)
        setSelected(true)
        setSaved(false)
        // setConfetti(prev => [...prev, ...createConfeti(index-1, mousePos.x, mousePos.y, 1000)])
    }

    const handleSave = (e) => {
        e.preventDefault()
        setSaved(true)

        if(auth.token){
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                }
            };
            const data = {
                product_id: review.product_id,
                rating: review.rating,
                commentary: review.commentary
            }
            axios.post(`${apiURL}/review`, data, config)
            .then(res => {
            })
            .catch(err => console.log(err))
        }
    }

    const handleTextChange = (e) => {
        setBookings(prev => prev.map(booking => {
            if(review.product_id == booking.product.id) {
                booking.review.commentary = e.target.value
            }
            return booking
        }))
    }

    return (
        <BookingCardReview onSubmit={handleSave} show={!saved}>
            <BookingReviewHeader selected={selected}>
                {selected ? 
                <>
                    <Heading2>Valoración</Heading2>
                </> 
                :
                <>
                    <Heading2>¿Que te pareció el producto?</Heading2>
                    <Text1>Cuéntanos tu experiencia</Text1>
                </>
                }
                <RatingStars fontSize={'28px'} onMouseEnter={handleHover} onMouseLeave={() => handleHover(0)} rating={review.rating ? review.rating : 0} onClick={handleClick} />
            </BookingReviewHeader>
            <Textarea placeholder='Escribe aquí que te pareció tu experiencia...' onChange={handleTextChange} value={review.commentary ? review.commentary : ""} />
            <FilledButton>Confirmar</FilledButton>
        </BookingCardReview>
    )
}

export default BookingReview