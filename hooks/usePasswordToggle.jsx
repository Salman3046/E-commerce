import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false)

    const Icon = visible ? <VisibilityOffIcon onClick={() => setVisible(visible => !visible)} /> : <VisibilityIcon onClick={() => setVisible(visible => !visible)} />

    const inputType = visible ? 'text' : 'password'

    return [inputType, Icon]
}

export default usePasswordToggle
