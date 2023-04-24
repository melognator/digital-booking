import React, { useEffect, useState } from 'react'
import { Card, FilledButton, Form, Heading1, Heading2, Heading3, Input, InputContainer, Section, Separator, Text1, Text2, primaryColor, transparent2_1, transparent2_5 } from '../../components/common/commonStyles';
import { AddIcon, AdminForm, AdminProductImages, AdminSelect, Feature, FeatureSection, FormContainer, FormSection, ImageSection, ImageSectionInput, PagesNav, PolicySection, SectionContainer } from './AdminStyles';
import { SelectInput } from '../../components/search/SearchStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminInput from './AdminInput';
import axios from 'axios';
import { apiURL } from '../../utils/proxy';
import AdminProductImage from './AdminProductImage';

const Admin = ({handleCreate, handleUpdate, categories, cities, features}) => {

    const pages = [
        {
            title: 'Crear producto',
        },
        {
            title: 'Actualizar producto',
        },
    ];

    const [update, setUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    
    const [imageInput, setImageInput] = useState('')
    const [product, setProduct] = useState({});
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [addedImages, setAddedImages] = useState([]); 
    const [addedPolicy, setAddedPolicy] = useState([]);

    const changePage = (i) => {
        setCurrentPage(i);
        window.scroll(0,0);
    }


    const onChange = (value, key) => {
        if (value) {
            setProduct(prev => {
                return {...prev, [key]:value}
            })
        }
    }

    const handleSelectedFeatures = (feature) => {
        if (!(selectedFeatures.some(ft => ft.id === feature.id))) {
            setSelectedFeatures(prev => prev.length > 0 ? [...prev, feature] : [feature]);
        }else {
            const i = selectedFeatures.findIndex(ft => ft.id === feature.id);
            selectedFeatures.splice(i, 1);
            setUpdate(prev => !prev);
        }
        
    }

    const handleAddedImages = () => {
        const value = imageInput
        const img = {
            title: product.title ? product.title : 'product image',
            url: value
        }

        // if (!(addedImages.some(image => image.url === img.url))) {
        //     setAddedImages(prev => prev.length > 0 ? [...prev, img] : [img]);
        // }
        if(value) {
            setAddedImages(prev => prev.length > 0 ? [...prev, img] : [img]);
        }
    }

    function imageExists(image_url){

        var http = new XMLHttpRequest();
        if(!image_url.includes('http')) {
            return false
        }
        http.open('HEAD', image_url, false);
        http.send();
        
        return http.status != 404;
    
    }

    const handleDeleteImage = (imageIndex) => {
        setAddedImages(prev => prev.filter((_, index) => index !== imageIndex))
    }

    const handleImageChange = (image) => {
        setImageInput(image)
    }

    const handlePolicy = (value) => {
        const newPolicy = {
            ...value
        }
        setAddedPolicy(prev => {
            let exists = false;
            const array = prev.map(policy => { 
                if (policy.title === newPolicy.title) {
                    exists = true;
                    return newPolicy;
                }
                return policy;
            })

            if (!exists) {
                array.push(newPolicy);
            }

            return array;
        })
    }

    useEffect(() => {
        onChange(selectedFeatures, 'features');
    }, [selectedFeatures]);

    useEffect(() => {
        // if (addedImages.length >= 5) {
            // }
        onChange(addedImages, 'images');
    }, [addedImages]);

    useEffect(() => {
        onChange(addedPolicy, 'policy');
    }, [addedPolicy]);

    return (
        <Section color={transparent2_1}>
            <Heading1>{pages[currentPage].title}</Heading1>
            <FormContainer>
                <AdminForm onSubmit={currentPage === 0 ? handleCreate(product) : handleUpdate(product)}>
                    <FormSection>
                        {
                            currentPage === 1 &&
                            <AdminInput label={'Id'} onChange={onChange} name={'id'}/>
                        }
                        <AdminInput label={'Nombre del auto:'} onChange={onChange} name={'title'}/>
                        <AdminInput label={'Categoría'} type={'select'} selectOptions={categories} name={'category'} onChange={onChange}/>
                        <AdminInput label={'Dirección'} onChange={onChange} name={'street'}/>
                        <AdminInput label={'Ciudad'} type={'select'} selectOptions={cities} name={'city'} onChange={onChange}/> 
                        <AdminInput label={'Descripción'} type={'textarea'} onChange={onChange} name={'description'}/>
                    </FormSection>
                    <Separator color={transparent2_5}/>
                    <SectionContainer>
                        <FeatureSection>
                            <Heading2>Agregar atributos</Heading2>
                            <div>
                                {features.map((feature) => (
                                    
                                <div key={feature.id} onClick={() => handleSelectedFeatures(feature)}>
                                    <Text2>{feature.acronym}</Text2>
                                    <Feature checked={selectedFeatures.filter(ft => ft.id === feature.id).length > 0} icon={feature.icon} title={feature.title}/>
                                </div>
                                )
                                )}
                            </div>
                        </FeatureSection>
                        <Separator color={transparent2_5}/>
                        <ImageSection>
                            <Heading2>Agregar imagenes</Heading2>
                            <ImageSectionInput>
                                <AdminInput label={'URL'} onChange={handleImageChange}/>
                                <AddIcon type='button' onClick={(e) => handleAddedImages()}>
                                    <FontAwesomeIcon icon={'fa-solid fa-plus'} />
                                </AddIcon>
                            </ImageSectionInput>
                            <AdminProductImages>
                                {
                                    addedImages.map((image, index) => (
                                        <AdminProductImage key={index} handleDeleteImage={handleDeleteImage} imageIndex={index} image={image} />
                                    )) 
                                }    
                            </AdminProductImages>
                        </ImageSection>
                    </SectionContainer>
                    <Separator color={transparent2_5}/>
                    <PolicySection>
                        <Heading2>Políticas del auto</Heading2>
                        <div>
                            <AdminInput label={'Normas:'} handlePolicy={handlePolicy} type={'textarea'} rule={'Las reglas se separan por linea'}  name={'policy'}/>
                            <AdminInput label={'Salud y seguridad:'}  handlePolicy={handlePolicy} rule={'Las reglas se separan por linea'} type={'textarea'} onChange={onChange} name={'policy'}/>
                            <AdminInput label={'Políticas de cancelación:'}  handlePolicy={handlePolicy} rule={'Las reglas se separan por linea'} type={'textarea'} onChange={onChange} name={'policy'}/>
                        </div>

                    </PolicySection>
                    <FilledButton>{currentPage === 0 ? 'Crear producto' : 'Guardar cambios'}</FilledButton>
                </AdminForm>
            </FormContainer>
            <PagesNav>
                {
                    pages.map((page, i) => <p onClick={() => changePage(i)} key={page.title}>{i}</p> ) 
                }
            </PagesNav>
        </Section>
    )
}

export default Admin