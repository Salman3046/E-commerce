const inputRestrictions = ({ evt, length, string=true }) => {
    if (!string) {
        let ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) evt.preventDefault();
        if (evt.target.value.length >= length) evt.preventDefault();
    }
    else {
        if (evt.target.value.length >= length) evt.preventDefault();
    }
}

export default inputRestrictions
