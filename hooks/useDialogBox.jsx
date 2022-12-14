import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const useDialogBox = () => {

    const [pop, setPop] = useState({pop:false,content:"test"});

    const handleClose = () => {
        setPop({pop:false});
    };

    const DialogBox = ({children}) => {
        return <Dialog
            open={pop.pop}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
         <DialogTitle id="alert-dialog-title">
         {`Are You Sure, you want to ${pop.content} ?`}
        </DialogTitle>
            <DialogActions>
               {children}
            </DialogActions>
        </Dialog>
    }

    return [setPop,DialogBox]

}

export default useDialogBox
