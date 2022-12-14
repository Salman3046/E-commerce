import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom'
import Box from '../../components/Core/Box/Box';
import CtaButton from '../../components/Core/Cta/CtaButton';
import { FormGroup } from '../../components/Core/Form/FormGroup';
import Image from '../../components/Core/Image/Image';
import List from '../../components/Core/List/List';
import { loadSiteSettings } from '../../Services/Actions/siteSettingAction';
import AdminAvatar from './AdminAvatar';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const { siteSettings } = useSelector(state => state.siteSettingData)
  const dispatch = useDispatch();

  const hamburgerRef=useRef(null);

  useEffect(() => {
    dispatch(loadSiteSettings())
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Box className="flex min-h-screen">

        <Box.Aside id="sidebar" className="fixed -left-full top-0 bottom-0 md:static z-40 w-60 overflow-y-auto bg-white-900 flex-shrink-0" ref={hamburgerRef}>

          <Box.Header className="flex items-center justify-between h-14 px-4 py-2 border-b border-white-700">
            <CtaButton className="inline-block" to="/dashboard/welcome">
              <Image className="mx-auto h-12 w-auto" source={`${import.meta.env.VITE_IP_URL}/${siteSettings?.rows?.logo}`} alt={siteSettings?.rows?.site_title} />
            </CtaButton>
            <CtaButton className="md:hidden float-right appearance-none border border-transparent bg-transparent text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </CtaButton>
          </Box.Header>

          <Sidebar />

          <hr className="border-white-600" />
        </Box.Aside >

        <Box.Main className="w-full sm:h-fit" id="outlet">
          <Box.Header className="h-14 z-10 py-3 bg-white shadow-sm border-b border-gray-200">
            <Box className="container h-full flex items-center justify-between px-6 mx-auto">

              {/* <!-- Mobile hamburger --> */}
              <CtaButton className="p-1 mr-5  md:hidden focus:outline-none focus:shadow-outline-purple" onClick={()=>hamburgerRef.current.classList.add('admin-side-bar')}>
                <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 24 24" fill="currentColor">
                  <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
              </CtaButton>

              {/* <!-- Search input --> */}
              <FormGroup>
                <Box className="relative">
                  {/* <input className="appearance-none border border-transparent bg-transparent rounded-md py-1 px-2 focus:outline-none focus:border-gray-400 w-full" type="text" placeholder="Search for " aria-label="Search" /> */}
                </Box>
              </FormGroup>
              <List className="flex items-center flex-shrink-0 space-x-2">
                <List.Item>
                  <CtaButton className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-blue-200" aria-label="Button name">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h8v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"></path></svg>
                  </CtaButton>
                </List.Item>
                <List.Item>
                  <CtaButton className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-blue-200" aria-label="Button name">
                    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zM7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42z"></path></svg>
                  </CtaButton>
                </List.Item>
                <List.Item>
                  <AdminAvatar />
                </List.Item>
              </List>
            </Box>
          </Box.Header>
          <Box.Section className="container p-6 mx-auto">
            <Outlet />
          </Box.Section>
        </Box.Main>
      </Box>
    </>
  )
}

export default Dashboard
