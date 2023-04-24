import React from 'react'
import { Heading2, Section, Separator, Text1, Title } from '../common/commonStyles'
import { PolicyContainer } from './Product.styles'

const ProductPolicy = ({ policy }) => {
    return (
        <Section color='white'>
            <Title color='color2'>Que tenés que saber</Title>
            <Separator color='primary' />
            <PolicyContainer>
                {policy.length > 0 ? policy.map(item => (<div key={item.id}>
                    <Heading2 color='color3' margin='32px 0'>{item.title}</Heading2>
                    {item.rules.map(rule => (
                        <Text1 key={rule} margin='16px 0'>{rule}</Text1>
                    ))}
                </div>))
                :
                <Text1 style={{marginTop: '10px'}}>No se han encontrado políticas...</Text1>
                }
            </PolicyContainer>
        </Section>
    )
}

export default ProductPolicy