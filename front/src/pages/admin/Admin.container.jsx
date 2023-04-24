import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import axios from 'axios'
import { apiURL } from '../../utils/proxy'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminContainer = () => {

    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [features, setFeatures] = useState([]);

    const handleCreate = (product) => {
        return (e) => {
            e.preventDefault()
            const config = {
                headers:{
                    Authorization: `Bearer ${auth.token}`,
                }
            }
            axios.post(`${apiURL}/product`, product, config)
            .then(res => navigate(`/admin/success`, {state:{message: "El producto ha sido creado exitósamente"}}))
            .catch(err => navigate(`/admin/error`, {state:{message: "No se ha podido crear el producto"}}))
        }
    }

    const handleUpdate = (product) => {
        return (e) => {
            e.preventDefault()
            const config = {
                headers:{
                    Authorization: `Bearer ${auth.token}`,
                }
            }
            axios.put(`${apiURL}/product`, product, config)
            .then(res => navigate(`/admin/success`, {state:{message: "El producto ha sido actualizado exitósamente"}}))
            .catch(err => navigate(`/admin/error`, {state:{message: "No se ha podido modificar el producto"}}))
        }
    }

    useEffect(() => {

        axios.get(apiURL + '/category')
        .then(res => setCategories(res.data.map(cat => cat.title)))
        .catch(err => console.log(err));

        axios.get(apiURL + '/city')
        .then(res => setCities(res.data))
        .catch(err => console.log(err));

        axios.get(apiURL + '/feature')
        .then(res => setFeatures(res.data))
        .catch(err => console.log(err));
    }, [])

    const props = {
        handleCreate, handleUpdate, categories, cities, features
    }

    return <Admin {...props}/>
}

export default AdminContainer