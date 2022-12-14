import React from 'react'


const List = ({ children, className, variant, id, ...rest }) => {

    switch (variant) {
        case 'ol':
            return (
                <ol className={className} id={id} {...rest} >
                    {children}
                </ol>
            )
        default:
            return (
                <ul className={className} id={id} {...rest}>
                    {children}
                </ul>
            )
    }
}

List.Item = ({ children, className, ...rest }) => {
    return (
        <li className={className} {...rest}>{children}</li>
    )
}

export default List
