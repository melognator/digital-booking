import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { AdminProductImageContainer } from './AdminStyles'

const AdminProductImage = ({image, handleDeleteImage, imageIndex}) => {
    const [hovering, setHovering] = useState(false)

  return (
    <AdminProductImageContainer onClick={() => handleDeleteImage(imageIndex)} hovering={hovering} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        <img src={image.url} />
        <FontAwesomeIcon fontSize={'32px'} icon='fa-solid fa-trash-can' />
    </AdminProductImageContainer>
  )
}

export default AdminProductImage