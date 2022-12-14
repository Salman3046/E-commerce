import React from 'react'

const useImageUpload = () => {
    const getImageFile = (imageFile) => {
        return imageFile.file;
    }

    const deleteImageFile = () => {
        return "";
    }

    return [getImageFile,deleteImageFile]
}

export default useImageUpload
