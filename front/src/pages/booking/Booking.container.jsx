import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiURL } from '../../utils/proxy';
import Booking from './Booking'
import { useDispatch, useSelector } from 'react-redux';


const BookingContainer = () => {

    const location = useLocation()

    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

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

    const [selectedRange, setSelectedRange] = useState(location.state?.selectedRange ? location.state?.selectedRange : []);
    const [hourSelected, setHourSelected] = useState('Selecciona una hora de llegada');
    const [product, setProduct] = useState(initalState);
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        auth.isLoading || auth.isAuthenticated || navigate('/login', {state: {authError: 'Para realizar una reserva necesitas estar logueado', selectedRange: location.state?.selectedRange, pathname: location.pathname}})
        window.scrollTo(0, 0)
        axios.get(apiURL + `/product/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedRange[0] && selectedRange[1] && hourSelected.includes(':')){

            const bookingData = {
                startReservation: selectedRange[0]?.toLocaleDateString('fr-CA'),
                endReservation: selectedRange[1]?.toLocaleDateString('fr-CA'),
                product_id: Number(id),
                user_id: auth.user.id,
                hourStartReservation: hourSelected
            }
    
            const config = {
                headers:{
                    Authorization: `Bearer ${auth.token}`,
                }
            }
            
            axios.post(`${apiURL}/product/${id}/reservation`, bookingData, config)
            .then(res => navigate(`/product/${id}/booking/success`))
            .catch(err => navigate(`/product/${id}/booking/error`))
        }else {
            if (!selectedRange[0]) {
                errors['pickUp'] = {
                    message: 'Este campo es obligatorio'
                }
            }else {
                delete errors['pickUp'];
            }
            if (!selectedRange[1]) {
                errors['return'] = {
                    message: 'Este campo es obligatorio'
                }
            }else {
                delete errors['return'];
            }
            if (!hourSelected.includes(':')) {
                errors['arrive'] = {
                    message: 'Este campo es obligatorio'
                }
            }else {
                delete errors['arrive'];
            }
            setUpdate(prev => prev + 1)
        }
    }

    const props = {
        product, handleSubmit, selectedRange, setSelectedRange, hourSelected, setHourSelected, errors
    }

    return (
        <Booking {...props}  user={auth.user} />
    )
}

export default BookingContainer
