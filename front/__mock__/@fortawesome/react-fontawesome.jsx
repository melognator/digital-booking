import React from 'react'

export function FontAwesomeIcon({ className, children, ...props }) {
    return <i className={`fa ${className}`} {...props}>{children}</i>
}