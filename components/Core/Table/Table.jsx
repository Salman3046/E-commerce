import React from 'react'

const Table = ({ children, className, id, ...rest }) => {
    return (
        <table className={className} id={id} {...rest}>
            {children}
        </table>
    )
}

Table.Header = ({ children, className, ...rest }) => {
    return (
        <thead className={className} {...rest}>{children}</thead>
    )
}

Table.Heading = ({ children, className, ...rest }) => {
    return (
        <th className={className} {...rest}>{children}</th>
    )
}

Table.Body = ({ children, className, ...rest }) => {
    return (
        <tbody className={className} {...rest}>{children}</tbody>
    )
}

Table.Row = ({ children, className, ...rest }) => {
    return (
        <tr className={className} {...rest}>{children}</tr>
    )
}

Table.Data = ({ children, className, ...rest }) => {
    return (
        <td className={className} {...rest}>{children}</td>
    )
}

export default Table
