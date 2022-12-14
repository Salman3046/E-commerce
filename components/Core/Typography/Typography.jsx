import React from 'react'

const Typography = ({ children, component, className, jsxFor, ...rest }) => {
    switch (component) {
        case 'h1':
            return (
                <h1 className={className} {...rest}>
                    {children}
                </h1>
            )
        case 'h2':
            return (
                <h2 className={className} {...rest}>
                    {children}
                </h2>
            )
        case 'h3':
            return (
                <h3 className={className} {...rest}>
                    {children}
                </h3>
            )
        case 'h4':
            return (
                <h4 className={className} {...rest}>
                    {children}
                </h4>
            )
        case 'h5':
            return (
                <h5 className={className} {...rest}>
                    {children}
                </h5>
            )
        case 'h6':
            return (
                <h6 className={className} {...rest}>
                    {children}
                </h6>
            )
        case 'p':
            return (
                <p className={className} {...rest}>
                    {children}
                </p>
            )
        case 'label':
            return (
                <label htmlFor={jsxFor} className={className} {...rest}>
                    {children}
                </label>
            )
        case 'bold':
            return (
                <b className={className} {...rest}>
                    {children}
                </b>
            )
        default:
            return (
                <span className={className} {...rest}>
                    {children}
                </span>
            )

    }
}

export default Typography
