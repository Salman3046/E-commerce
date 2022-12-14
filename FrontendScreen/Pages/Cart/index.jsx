import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { getCartData } from '../../../Services/Actions/cartAction';
import { loadSiteSettings } from '../../../Services/Actions/siteSettingAction';
import Typography from '../../../components/Core/Typography/Typography';
import Box from '../../../components/Core/Box/Box';
import OrderSummary from './OrderSummary';
import Items from './Items';

const Cart = () => {
    const userDataFromLocal = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_AUTH))

    const [cartCalc, setCartCalc] = useState({ subTotal: 0, delivery: 0, tax: 0, total: 0 });
    // get the data from cart
    const { cart } = useSelector(state => state.cartData)
    // get site settings
    const { siteSettings } = useSelector(state => state.siteSettingData)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        if (!userDataFromLocal?.token) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        dispatch(loadSiteSettings())
        dispatch(getCartData())
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const subTotal = cart.reduce((accumulator, product) => accumulator + product.finalQuantity * product.finalPrice, 0);
        const delivery = cart.filter(cart => cart.is_flat_rate === 1).length <= 0 ? 0 : cart.filter(cart => cart.is_flat_rate === 1).reduce((accumulator, product) => accumulator + product.shipping_cost, 0);
        const tax = cart.reduce((acc, pro) => pro?.tax && pro?.is_variation === 0 ? JSON.parse(pro.tax).type === 'Percentage' ? acc + pro.discount_price * +JSON.parse(pro.tax).amount / 100 * pro.finalQuantity : acc + +JSON.parse(pro.tax).amount * pro.finalQuantity : JSON.parse(pro.tax).type === 'Percentage' ? acc + +JSON.parse(pro.variation_description).attribute_desc.find(it => it.variation === pro.attributeName).discount_price * JSON.parse(pro.tax).amount / 100 * pro.finalQuantity : acc + +JSON.parse(pro.tax).amount * pro.finalQuantity, 0);
        const total = subTotal + delivery + tax;
        console.log(cart)
        setCartCalc({
            subTotal: subTotal,
            delivery: delivery,
            tax: tax,
            total: total
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart])

    return (
        <>
            <Box.Section className="py-5 sm:py-7 bg-blue-100">
                <Box className="container max-w-screen-xl mx-auto px-4">
                    <Typography component={'h2'} className="text-3xl font-semibold mb-2">Shopping cart</Typography>

                </Box>
            </Box.Section>
            <Box.Section className="py-10">
                <Box className="container max-w-screen-xl mx-auto px-4">
                    <Box className="flex flex-col md:flex-row gap-4">

                        {/* cart */}
                        <Items items={cart} dispatch={dispatch} siteSettings={siteSettings} />

                        {/* Order Summery */}
                        <OrderSummary currency={siteSettings?.rows?.currency} cart={cartCalc} />

                    </Box>

                </Box>
            </Box.Section>

          
        </>
    )
}

export default Cart
