import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import useComponentVisible from '../../utils/ClickOutsideHook';
import { apiURL } from '../../utils/proxy';
import { Heading4, primaryColor, Separator } from '../common/commonStyles';
import { InputTextContainer, Select, SelectContainer, SelectInput, SelectOption } from './SearchStyles';

const SelectCategory = ({ selectedCategory, handleSelected }) => {

    const [categories, setCategories] = useState()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    useEffect(() => {
        axios.get(apiURL + '/category')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }, [])
    

    useEffect(() => {
        setIsComponentVisible(() => false);
    }, [selectedCategory])


    return (
        <Select ref={ref}>
            <SelectInput onClick={() => setIsComponentVisible(prev => !prev)}>
                <InputTextContainer>
                    <FontAwesomeIcon opacity={selectedCategory ? '1' : '.7'} color={primaryColor} fontSize={'20px'} icon="fa-solid fa-car-on" />
                    <p>{selectedCategory ? `${selectedCategory}` : 'Quiero un auto...'}</p>
                </InputTextContainer>
                <FontAwesomeIcon icon={isComponentVisible ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'} />
            </SelectInput>
            {
                isComponentVisible &&
                <SelectContainer>
                    {
                        categories.map(category =>
                            <Fragment key={category.id}>
                                <SelectOption onClick={() => handleSelected(category.title)}>
                                        <FontAwesomeIcon color={primaryColor} fontSize={'20px'} icon='fa-solid fa-car-on' />
                                        <Heading4 color='black'>{category.title}</Heading4>
                                </SelectOption>
                                <Separator color={primaryColor} />
                            </Fragment>
                        )
                    }
                </SelectContainer>
            }
        </Select>
    )
}

export default SelectCategory