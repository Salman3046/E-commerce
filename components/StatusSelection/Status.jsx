import React from 'react'
import { Select } from '../Core/Form/FormGroup'

const Status = ({ name, value, onChange, ...rest }) => {
    return (
        <>
            <Select
                name={name}
                value={value}
                onChange={onChange}
                {...rest}>
                <Select.Item value="">Select</Select.Item>
                <Select.Item value="1">Active</Select.Item>
                <Select.Item value="0">Inactive</Select.Item>
            </Select>
        </>
    )
}

export default Status
