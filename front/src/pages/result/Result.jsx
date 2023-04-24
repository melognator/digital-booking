import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading2, Heading3, primaryColor } from '../../components/common/commonStyles'
import { Card, Container, ResultButton } from './ResultStyles'

const Result = ({ svg, title, desc }) => {

    const navigate = useNavigate();

    return (
        <Container>
            <Card>
                {svg}
                <div>
                    <Heading2 color={primaryColor}>{title}</Heading2>
                    <Heading3>{desc}</Heading3>
                </div>
                <ResultButton onClick={() => navigate('/')}>Volver al inicio</ResultButton>
            </Card>
        </Container>
    )
}

export default Result