import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCartData } from '../../../Services/Actions/cartAction'
import { loadPayments } from '../../../Services/Actions/paymentAction'
import { loadSiteSettings } from '../../../Services/Actions/siteSettingAction'
import { getSingleUserAddressByUserId } from '../../../Services/Actions/userAddressAction'
import useToaster from '../../../hooks/useToaster';

import { FormGroup } from '../../../components/Core/Form/FormGroup'
import Typography from '../../../components/Core/Typography/Typography'
import Box from '../../../components/Core/Box/Box'
import OrderSummery from './OrderSummery'
import UserAddresses from './UserAddresses'
import Payment from './Payment'

const Checkout = () => {

    // all checkout data will store in this state
    const [checkoutState, setCheckoutState] = useState({
        order_notes: '',
        txn_id: '',
        payment_id: '',
        products: '',
        total_price: '',
        address_id: '',
        shipping_charges: "",
        tax: "",
        coupon_id: "",
        coupon_discount: "",
        payment_status: 0,
        order_status: 1,
        payment_mode: '',
        tnc: 0,
    })

    // get the token from localStorage
    const userDataFromLocal = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_AUTH))
    const [selectedAddress, setSelectedAddress] = useState('')
    // get the data from cart
    const { cart } = useSelector(state => state.cartData)

    // get the user's address
    const { userAddressesById } = useSelector(state => state.userAddressData)
    // get the payment methods
    const { payments } = useSelector(state => state.paymentData)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // custom hook of toaster
    const toaster = useToaster();


    useEffect(() => {
        if (!userDataFromLocal?.token) {
            navigate('/login');
        }
        else {
            dispatch(loadSiteSettings())
            dispatch(getCartData())
            dispatch(getSingleUserAddressByUserId(userDataFromLocal?.token))
            dispatch(loadPayments())
            window.scrollTo(0, 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Box className='container max-w-screen-xl mx-auto px-4'>
                <Box className="container lg:grid grid-cols-12 gap-6 items-start justify-center pb-16 pt-4">
                    <Box className="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
                        <FormGroup action="">
                            <Typography component={'h3'} className="text-xl font-medium capitalize mb-4">
                                Billing Details
                            </Typography>
                            {/* User's Address */}
                            <UserAddresses
                                userAddresses={userAddressesById}
                                checkoutState={checkoutState}
                                setCheckoutState={setCheckoutState}
                                selectedAddress={selectedAddress}
                                setSelectedAddress={setSelectedAddress}
                            />

                            {/* Payments */}
                            <Payment
                                payments={payments}
                                checkoutState={checkoutState}
                                setCheckoutState={setCheckoutState}
                            />

                        </FormGroup>
                    </Box>
                    {/* Order Summery */}
                    <OrderSummery
                        checkoutState={checkoutState}
                        setCheckoutState={setCheckoutState}
                        toaster={toaster}
                        cart={cart}
                        address={selectedAddress}
                        payments={payments} />
                </Box>
            </Box>
            '
        </>
    )
}

export default Checkout
