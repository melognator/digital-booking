import React, { Fragment, useState } from 'react'
import { Input, InputContainer, Separator, Text2, primaryColor, transparent2_1, transparent2_3, transparent2_5 } from '../../components/common/commonStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AdminSelect, AdminSelectContainer, TextArea } from './AdminStyles'
import useComponentVisible from '../../utils/ClickOutsideHook'
import { SelectContainer, SelectOption } from '../../components/search/SearchStyles'

const AdminInput = ({type, label, onChange, name, selectOptions, rule, handlePolicy}) => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    const [selected, setSelected] = useState(null);
    
    return (
        <InputContainer ref={ref}>
            {
                type === 'select' ?
                (
                    <>
                        <label>
                            {label}
                        </label>
                        <AdminSelect onClick={() => setIsComponentVisible(true)}> 
                            <div>
                                <p>{selected}</p>
                            </div>
                            <FontAwesomeIcon color={primaryColor} fontSize={'20px'} icon={isComponentVisible ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'}/>
                        </AdminSelect>
                        {
                            isComponentVisible && (
                                <AdminSelectContainer>
                                    {selectOptions.map((opt, i) => (
                                        <Fragment key={i}>
                                            <SelectOption onClick={() => {
                                                onChange(opt, name);
                                                setSelected(name === 'city' ? Object.values(opt).splice(1, 3).join(', ') : opt);
                                                setIsComponentVisible(false);
                                            }}>
                                                {name === 'city' ? Object.values(opt).splice(1, 3).join(', ') : opt} 
                                            </SelectOption>
                                            <Separator color={primaryColor}/>
                                        </Fragment>
                                    ))}
                                </AdminSelectContainer>
                            )
                        }
                    </>
                )
                    :
                type === 'textarea' ?
                (
                    <>
                        <label>
                            {label}
                        </label>
                        {
                            rule && (
                                <Text2 color={'rgba(0,0,0,.6)'} >{rule}</Text2>
                            )
                        }
                        <TextArea placeholder='Escriba aquí' onChange={(e) => name === 'policy' ? handlePolicy({title: label, rules: e.target.value.trim().split(`\n`)}) : onChange(e.target.value, name)}>
                        </TextArea>
                    </>
                )
                :
                (
                    <>
                        <label>
                            {label}
                        </label>
                        {
                            rule && (
                                <Text2 color={'rgba(0,0,0,.6)'} >{rule}</Text2>
                            )
                        }
                        <Input onChange={(e) => onChange && onChange(e.target.value.trim(), name)}/>
                    </>
                )
            }
        </InputContainer>
    )
}

export default AdminInput