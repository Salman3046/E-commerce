import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';

const usePagination = (data) => {
    // PAGINATION
    const [pageNumber, setPageNumber] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage - usersPerPage;

    const changePage = (event, value) => {
        setPageNumber(value)
    }
    useEffect(() => {
        data?.rows?setPageCount(Math.ceil(data?.rows?.length / usersPerPage)):setPageCount(0)
    }, [data?.rows])

    const PaginationComp = () => {
        return <Pagination count={pageCount} page={pageNumber} onChange={changePage} variant="outlined" shape="rounded" color='primary' className='mb-3'/>
    }

    return [pagesVisited, usersPerPage, PaginationComp]
}

export default usePagination
