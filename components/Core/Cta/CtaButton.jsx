import React from 'react'
import { Link } from 'react-router-dom';

const PRIMARY = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover-bg-secondary  ';
const SECONDARY = 'px-2 py-1 inline-block text-white bg-secondary shadow-sm border border-gray-200 rounded-md hover-bg-primary ';

const CtaButton = ({ children, className, variant, type,onClick, to, ...rest }) => {
    return (
        to ? (
            <Link className={variant === 'primary' ? PRIMARY + className : variant === 'secondary' ? SECONDARY + className : className} to={to} {...rest}>
                {children}
            </Link>
        ) : (
            <button className={variant === 'primary' ? PRIMARY + className : variant === 'secondary' ? SECONDARY + className : className} onClick={onClick} type={type} {...rest}>
                {children}
            </button >
        )
    )
}

export default CtaButton
