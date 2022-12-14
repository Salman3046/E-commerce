import React from 'react'
import Box from '../Core/Box/Box'
import Typography from '../Core/Typography/Typography'
import { InputField } from '../Core/Form/FormGroup'

const Search = ({ value, onChange, ...rest }) => {
    return (
        <Box className="w-full relative ">
            <Typography className="absolute left-4 top-2 text-lg text-gray-400">
                <i className="fa fa-search"></i>
            </Typography>
            <InputField
                type="text"
                className="pl-12 w-full border border-blue-600 py-2 px-3 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                placeholder="Search"
                value={value}
                onChange={onChange}
                {...rest}
            />
        </Box>
    )
}

export default Search
