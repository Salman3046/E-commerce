import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// MUI Import
import NotFound from '../../Sections/NotFound';
import usePagination from '../../../hooks/usePagination';
import { loadHelps } from '../../../Services/Actions/helpAction';
import Typography from '../../../components/Core/Typography/Typography';
import Box from '../../../components/Core/Box/Box';
import Table from '../../../components/Core/Table/Table';
import Search from '../../../components/Search/Search';

const Help = () => {
  const userDataFromLocal = JSON.parse(localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH))
  const { helps } = useSelector(state => state.helpData)
  const [searchKey, setSearchKey] = useState('');

  // custom hook of pagination
  const [pagesVisited, usersPerPage, PaginationComp] = usePagination(helps);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHelps(userDataFromLocal.token))
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>

      <Box.Section className="container p-6 mx-auto">
        <Box className="flex justify-between items-center mb-2">
          <Typography component={'h1'} className="mb-4 text-xl md:text-2xl font-semibold text-black">
            View Helps
          </Typography>
        </Box>

        {/* Search Box */}
        <Search value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
        {/* End Search */}

        {/* <!-- scrolling horiz. table --> */}
        <Box className="overflow-x-auto shadow-sm">
          {helps?.rows?.length !== 0 ? (
            <>
              <Table className="w-full whitespace-no-wrap">
                <Table.Header>
                  <Table.Row className="text-xs font-semibold tracking-wide text-left uppercase bg-gray-200">
                    <Table.Heading className="px-3 py-3" width="200">Name</Table.Heading>
                    <Table.Heading className="px-3 py-3">Contact Info</Table.Heading>
                    <Table.Heading className="px-3 py-3">Subject</Table.Heading>
                    <Table.Heading className="px-3 py-3">Message</Table.Heading>
                    <Table.Heading className="px-3 py-3">Created at</Table.Heading>
                  </Table.Row>
                </Table.Header>
                <Table.Body className="bg-white divide-y">
                  {
                    helps?.rows && helps?.rows
                      ?.filter(val => val.email.toLowerCase().includes(searchKey.toLowerCase()) || val.first_name.toLowerCase().includes(searchKey.toLowerCase()) || val.last_name.toLowerCase().includes(searchKey.toLowerCase()))
                      ?.slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((curr) => {
                        return <Table.Row className="text-gray-700 dark:text-gray-700" key={curr?.id}>
                          <Table.Data className="px-3 py-3">
                            <Box className="flex items-center leading-tight">
                              <Box>
                                <Typography component={'p'} className="font-semibold">{`${curr?.first_name} ${curr?.last_name}`}</Typography>
                              </Box>
                            </Box>
                          </Table.Data>
                          <Table.Data className="px-3 py-3">
                            <Box className="flex items-center leading-tight">
                              <Box>
                                <Typography component={'p'} className="font-semibold">{curr?.mobile}</Typography>
                                <Typography component={'p'} className="font-semibold">{curr?.email}</Typography>
                              </Box>
                            </Box>
                          </Table.Data>
                          <Table.Data className="px-3 py-3">
                            <Box className="flex items-center leading-tight">
                              <Box>
                                <Typography component={'p'} className="font-semibold">{curr?.subject}</Typography>
                              </Box>
                            </Box>
                          </Table.Data>
                          <Table.Data className="px-3 py-3">
                            <Box className="flex items-center leading-tight">
                              <Box>
                                <Typography component={'p'} className="font-semibold">{curr?.message}</Typography>
                              </Box>
                            </Box>
                          </Table.Data>
                          <Table.Data className="px-3 py-3">
                            <Box className="flex items-center leading-tight">
                              <Box>
                                <Typography component={'p'} className="font-semibold">{new Date(curr.created_at).toDateString()}</Typography>
                              </Box>
                            </Box>
                          </Table.Data>
                        </Table.Row>
                      })
                  }

                </Table.Body>
              </Table>
              <Box className="flex justify-end mt-4">
                {helps?.rows?.length > 10 && <PaginationComp />}
              </Box>
            </>
          ) : (
            <NotFound heading="Helps" title="No Helps Found" path="/dashboard/helps" />
          )
          }


        </Box>
        {/* <!-- scrolling horiz. table --> */}

      </Box.Section>

    </>
  )
}

export default Help
