import React from 'react'
import { FilledButton } from './commonStyles'

const SubmitButton = ({text}) => {
    return (
        <FilledButton type='submit'>{text}</FilledButton>
    )
}

export default SubmitButton