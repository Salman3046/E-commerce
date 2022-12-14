// eslint-disable-next-line
import React, { useState } from 'react'

// Use for snakebar
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const useSnackbar = () => {
    // Snackbar Code
    const [snackbar, setSnackbar] = useState({ open: false, sev: 'success', content: 'Test !' });

    const SnackbarComp = ({ children }) => {
        const Alert = React.forwardRef(function Alert(props, ref) {
            return <MuiAlert elevation={6} target={ref} variant="filled" {...props} />;
        });

        // Cancel Snackbar
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackbar({ open: false })
        };
        return <Stack spacing={2} id="stack">
            {children}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbar.open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.sev} sx={{ width: '100%' }}>
                    {snackbar.content}
                </Alert>
            </Snackbar>
        </Stack>
    }

    return [setSnackbar,SnackbarComp];
}

export default useSnackbar
