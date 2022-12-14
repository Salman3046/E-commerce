import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleUser } from '../../../Services/Actions/userAction';
import useToaster from '../../../hooks/useToaster';

import Aside from './Aside';
import ChangePasswordDialog from './ChangePasswordDialog';
import Profile from './Profile';
import Box from '../../../components/Core/Box/Box';

const AdminProfile = () => {
    // get user data using redux
    const { user } = useSelector(state => state.userData);

    const userDataFromLocal = JSON.parse(localStorage.getItem(import.meta.env.VITE_ADMIN_AUTH))
    const [adminData, setAdminData] = useState({
        first_name: "",
        last_name: "",
        profile_image: "",
        email: "",
        phone_number: "",
        gender: "",
        roles: "",
    })

    const dispatch = useDispatch();

    // custom hook of toaster
    const toaster = useToaster();

    // custom dialog box
    const [pop, setPop] = useState(false);

    useEffect(() => {
        dispatch(getSingleUser(userDataFromLocal?.id, userDataFromLocal?.token))
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])
    useEffect(() => {
        user ? setAdminData(user) : setAdminData({
            first_name: "",
            last_name: "",
            profile_image: "",
            email: "",
            phone_number: "",
            gender: "",
            roles: "",
        })
    }, [user])

    return (
        <>
            <Box.Section className="py-10">
                <Box className="container max-w-screen-xl mx-auto px-4">
                    <Box className="flex flex-col md:flex-row -mx-4">
                        {/* User Aside */}
                        <Aside user={user} setPop={setPop} adminData={adminData} />
                        {/* <!-- col.// --> */}
                        <Profile user={user} toaster={toaster} />
                    </Box>
                </Box>
            </Box.Section>

            {/* Change Password dialog, code is here */}
            <ChangePasswordDialog toaster={toaster} user={user} pop={pop} setPop={setPop} />

            '
        </>
    )
}

export default AdminProfile
