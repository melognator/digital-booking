import React, { useEffect, useState } from 'react'
import Bookings from './Bookings'
import { apiURL } from '../../utils/proxy'
import { useSelector } from 'react-redux'
import axios from 'axios'

const MyBookinsContainer = () => {

    const exampleBookings = [
        {
            hourStartReservation: "10:00",
            startReservation: "2024-04-01",
            endReservation: "2024-04-04",
            product: {
                id: 1,
                category: "Deportivo",
                title: "Prius",
                city: {
                    cityName: "Montevideo",
                    region: "Montevideo",
                    country: "Uruguay",
                },
                location: {
                    coordinates: {
                        longitude: "",
                        latitude: "",
                    },
                    street: "Avellaneda 3312"
                },
                image: "https://pigrupo7marzo2023img.s3.us-east-2.amazonaws.com/products/Prius/1.webp",
            },
            review: {
                rating: 5,
                content: "Excelente servicio.",
            }
        },
        {
            hourStartReservation: "12:00",
            startReservation: "2022-04-01",
            endReservation: "2024-04-04",
            product: {
                id: 1,
                category: "Deportivo",
                title: "Prius",
                city: {
                    cityName: "Montevideo",
                    region: "Montevideo",
                    country: "Uruguay",
                },
                location: {
                    coordinates: {
                        longitude: "",
                        latitude: "",
                    },
                    street: "Avellaneda 3312"
                },
                image: "https://pigrupo7marzo2023img.s3.us-east-2.amazonaws.com/products/Prius/1.webp",
            },
            review: {
                rating: null,
                content: null,
            }
        },
        {
            hourStartReservation: "12:00",
            startReservation: "2022-04-01",
            endReservation: "2022-04-04",
            product: {
                id: 1,
                category: "Deportivo",
                title: "Prius",
                city: {
                    cityName: "Montevideo",
                    region: "Montevideo",
                    country: "Uruguay",
                },
                location: {
                    coordinates: {
                        longitude: "",
                        latitude: "",
                    },
                    street: "Avellaneda 3312"
                },
                image: "https://pigrupo7marzo2023img.s3.us-east-2.amazonaws.com/products/Prius/1.webp",
            },
            review: {
                rating: null,
                content: null,
            }
        }
    ]

    const [bookings, setBookings] = useState([])

    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if(auth.token){
            const config = {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                }
            };
            axios.get(`${apiURL}/user/bookings`, config)
            .then(res => setBookings(res.data.map(booking => {
                if(!booking.review) {
                    booking.review = {
                        product_id: booking.product.id,
                        rating: 0,
                        commentary: ""
                    }
                }
                return booking
            })))
            .catch(err => console.log(err))
        }
    },[auth.token])

    return <Bookings setBookings={setBookings} bookings={bookings} title="Mis reservas" />
}

export default MyBookinsContainer