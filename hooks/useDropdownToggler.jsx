// eslint-disable-next-line
import React, { useState } from 'react'

const useDropdownToggler = () => {

    const [style,setStyle]=useState('');

    const ddToggler=(value)=>{
        setStyle(value);
    }

    return [style,ddToggler];
};

export default useDropdownToggler
