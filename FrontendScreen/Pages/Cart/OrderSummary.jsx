import React from 'react'
import { Link } from 'react-router-dom'
import Box from '../../../components/Core/Box/Box'
import CtaButton from '../../../components/Core/Cta/CtaButton'
import Typography from '../../../components/Core/Typography/Typography'

const OrderSummary = ({currency,cart}) => {
    return (
        <>
            <Box.Aside className="md:w-1/4">
                <Box className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
                    <Typography component={'h4'} className="text-gray-800 text-lg mb-4 font-medium uppercase">ORDER SUMMARY</Typography>
                    <Box className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
                        <Box className="flex justify-between font-medium">
                            <Typography component={'p'}>Subtotal</Typography>
                            <Typography component={'p'}>{`${currency} ${cart.subTotal}`}</Typography>
                        </Box>
                        <Box className="flex justify-between">
                            <Typography component={'p'}>Delivery</Typography>
                            <Typography component={'p'}>{`${currency} ${cart.delivery <= 0 ? 'Free' : cart.delivery}`}</Typography>
                        </Box>
                        <Box className="flex justify-between">
                            <Typography component={'p'}>Tax</Typography>
                            <Typography component={'p'}>{`${currency} ${cart.tax <= 0 ? 'Free' : cart.tax}`}</Typography>
                        </Box>
                    </Box>

                    <Box className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
                        <Typography component={'h4'}>Total</Typography>
                        <Typography component={'h4'}>{`${currency} ${cart.total}`}</Typography>
                    </Box>

                    <CtaButton to="/checkout" variant={'primary'} className='w-full py-3 text-lg mb-2'> Checkout </CtaButton>

                    <CtaButton to="/shop" className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-blue-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"> Back to shop </CtaButton>
                </Box>

            </Box.Aside>
        </>
    )
}

export default OrderSummary
