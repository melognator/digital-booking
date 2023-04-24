import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import useComponentVisible from '../../utils/ClickOutsideHook';
import { apiURL } from '../../utils/proxy';
import { Heading4, primaryColor, Separator } from '../common/commonStyles';
import { InputTextContainer, Select, SelectContainer, SelectInput, SelectOption } from './SearchStyles';

const SelectFeatures = ({ selectedFeatures, handleSelected }) => {

    const [features, setFeatures] = useState([])
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    useEffect(() => {
        axios.get(apiURL + '/feature')
            .then(res => setFeatures(res.data))
            .catch(err => console.log(err))
    }, [])
    

    // useEffect(() => {
    //     setIsComponentVisible(() => false);
    // }, [selectedFeatures])

    return (
        <Select ref={ref}>
            <SelectInput onClick={() => setIsComponentVisible(prev => !prev)}>
                <InputTextContainer>
                    <FontAwesomeIcon opacity={selectedFeatures.length > 0 ? '1' : '.7'} color={primaryColor} fontSize={'20px'} icon="fa-solid fa-box-open" />
                    <p>{selectedFeatures.length > 0 ? `${selectedFeatures.length} características` : 'Quiero que tenga...'}</p>
                </InputTextContainer>
                <FontAwesomeIcon icon={isComponentVisible ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'} />
            </SelectInput>
            {
                isComponentVisible &&
                <SelectContainer>
                    {
                        features.map(feature =>
                            <Fragment key={feature.id}>
                                <SelectOption highlight={selectedFeatures.includes(feature.id)} onClick={() => handleSelected(feature.id)}>
                                        <FontAwesomeIcon color={primaryColor} fontSize={'20px'} icon={feature.icon} />
                                        <Heading4 color='black'>{feature.title}</Heading4>
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

export default SelectFeatures