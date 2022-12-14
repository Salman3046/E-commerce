import React from 'react'
import Box from '../../../components/Core/Box/Box'
import CtaButton from '../../../components/Core/Cta/CtaButton'
import Image from '../../../components/Core/Image/Image'
import Typography from '../../../components/Core/Typography/Typography'

const Aside = ({user,setPop,adminData}) => {
    return (
        <>
            <Box.Aside className="md:w-1/3 lg:w-1/4 bg-transparent profile_aside">
                <Box.Article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <figure className="flex flex-col items-start sm:items-center">
                        <Image
                            className="w-16 rounded-full mr-4"
                            source={`${import.meta.env.VITE_IP_URL}/${adminData.profile_image}`}
                            alt="" />
                        <figcaption className="mt-3">
                            <Typography
                                className="font-semibold text-lg text-center"
                                component={'h5'}>
                                {`${user.first_name} ${user.last_name}`}
                            </Typography>
                            <p>
                                {user.email}
                            </p>
                        </figcaption>
                    </figure>

                    <hr className="my-4" />
                    <Typography className="font-semibold text-md " component={'h5'}>
                        Contact information
                    </Typography>
                    <Typography className="font-semibold text-sm mt-3" component={'h5'}>
                        Email Address
                    </Typography>
                    <Typography className="text-sm">
                        {user.email}
                    </Typography>
                    <Typography className="font-semibold text-sm mt-3" component={'h5'}>
                        Phone Number
                    </Typography>
                    <Typography className="text-sm" component={'h5'}>
                        {user.phone_number}
                    </Typography>
                    <hr className="my-4" />
                    <Box className="flex justify-center">
                        <CtaButton
                            variant={'primary'}
                            onClick={() => setPop(true)}>
                            Change Password
                        </CtaButton>
                    </Box>
                </Box.Article>
            </Box.Aside>
        </>
    )
}

export default Aside
