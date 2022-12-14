import React, { useState } from 'react'
import Box from '../../../components/Core/Box/Box';
import CtaButton from '../../../components/Core/Cta/CtaButton';
import Typography from '../../../components/Core/Typography/Typography';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from 'react-redux';
import { addToCart, checkAlreadyAdded, checkUniqueItemQuantity, deleteFromCart, removeFromCart } from '../../../Services/Actions/cartAction';
import { Link } from 'react-router-dom';
import Image from '../../../components/Core/Image/Image';
import useDialogBox from '../../../hooks/useDialogBox';

const Items = ({ items, dispatch, siteSettings }) => {
    // this state managed product id globally
    const [globalItem, setGlobalItem] = useState({ id: '', attName: '' });

    const userDataFromLocal = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER_AUTH))

    // get the numbers quantity
    const { finalQuantity } = useSelector(state => state.cartData)

    // custom hook of dialog box
    const [setPop, DialogBox] = useDialogBox();


    // add the items
    const addCartHandler = (product) => {
        dispatch(addToCart(product, product?.is_variation === 0 ? product?.discount_price : JSON.parse(product?.variation_description).attribute_desc.find(data => data.variation === product.attributeName).discount_price, product?.is_variation === 1 && JSON.parse(product?.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation))
        dispatch(checkAlreadyAdded(product.id, product.is_variation === 1 ? JSON.parse(product.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation : null))
        dispatch(checkUniqueItemQuantity(product.id, product.is_variation === 1 ? JSON.parse(product.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation : null))
    };
    // remove the item
    const removeCartHandler = (product) => {
        dispatch(removeFromCart(product, product?.is_variation === 0 ? product?.discount_price : JSON.parse(product?.variation_description).attribute_desc.find(data => data.variation === product.attributeName).discount_price, product?.is_variation === 1 && JSON.parse(product?.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation))
        dispatch(checkAlreadyAdded(product.id, product.is_variation === 1 ? JSON.parse(product.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation : null))
        dispatch(checkUniqueItemQuantity(product.id, product.is_variation === 1 ? JSON.parse(product.variation_description).attribute_desc.find(data => data.variation === product.attributeName).variation : null))
    };


    // this function is used to remove item from cart
    const cartHandler = (global) => {
        dispatch(deleteFromCart(global.id, global.attName))
        setPop({ pop: false })
    }



    return (
        <>
            <Box.Main className="md:w-3/4">
                <Box className="xl:col-span-9 lg:col-span-8">
                    <Box className="bg-gray-200 py-2 pl-12 pr-20 xl:pr-28 mb-4 hidden md:flex">
                        <Typography component={'p'} className="text-gray-600 text-center">Product</Typography>
                        <Typography component={'p'} className="text-gray-600 text-center ml-auto mr-16 xl:mr-24">Quantity</Typography>
                        <Typography component={'p'} className="text-gray-600 text-center">Total</Typography>
                    </Box>

                    <Box className="space-y-4 h-80 overflow-y-scroll">
                        {
                            items && items.map((item, i) => {
                                return <Box className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap" key={i}>
                                    <Box className="w-32 flex-shrink-0">
                                        <CtaButton to={`/product-detail/${item?.name.replace(/ /g, "-")}/${item?.id}`}>
                                            <Image source={`${import.meta.env.VITE_IP_URL}/${JSON.parse(item.images)[0]}`} className="w-full" alt={item.name} />
                                        </CtaButton>
                                    </Box>
                                    <Box className="md:w-1/3 w-full">
                                        <CtaButton to={`/product-detail/${item?.name.replace(/ /g, "-")}/${item?.id}`}>
                                            <Typography component={'h2'} className="text-gray-800 mb-3 xl:text-xl text-lg font-medium uppercase">
                                                {item.name}
                                            </Typography>
                                        </CtaButton>
                                        <Typography component={'p'} className="text-primary font-semibold">{`${siteSettings?.rows?.currency} ${item.finalPrice} x ${item.finalQuantity}`}</Typography>
                                        {item.is_variation === 1 && (
                                            <Typography component={'p'} className="text-gray-500">{JSON.parse(item.variation_description).attribute}: {item.attributeName}</Typography>
                                        )}

                                    </Box>
                                    <Box className="flex text-gray-600 divide-x divide-gray-300">
                                        {
                                            item?.is_variation === 0 ? (
                                                item?.quantity ? (
                                                    <Box className="flex flex-wrap gap-2">
                                                        {
                                                            userDataFromLocal?.token && (
                                                                <ButtonGroup>
                                                                    <Button
                                                                        aria-label="reduce"
                                                                        className='plus-minus-input'
                                                                        onClick={() => removeCartHandler(item)}
                                                                    >
                                                                        <RemoveIcon fontSize="small" />
                                                                    </Button>
                                                                    <Button
                                                                        aria-label=""
                                                                        className='plus-minus-input'
                                                                    >
                                                                        <Typography component={'p'} className="font-semibold text-blue-800 text-lg">{item.finalQuantity}</Typography>
                                                                    </Button>
                                                                    {
                                                                        item?.is_variation === 0 ? (item?.quantity !== finalQuantity || item?.quantity > finalQuantity) && <Button
                                                                            aria-label="increase"
                                                                            className='plus-minus-input'
                                                                            onClick={() => addCartHandler(item)}
                                                                        >
                                                                            <AddIcon fontSize="small" />
                                                                        </Button> : (+JSON.parse(item?.variation_description).attribute_desc.find(data => data.variation === item.attributeName).quantity !== finalQuantity || +JSON.parse(item?.variation_description).attribute_desc.find(data => data.variation === item.attributeName).quantity > finalQuantity) && <Button
                                                                            aria-label="increase"
                                                                            className='plus-minus-input'
                                                                            onClick={() => addCartHandler(item)}
                                                                        >
                                                                            <AddIcon fontSize="small" />
                                                                        </Button>
                                                                    }

                                                                </ButtonGroup>
                                                            )
                                                        }

                                                    </Box>
                                                ) : (
                                                    <Typography className="text-red-500 font-medium mb-3 inline-block text-lg">Out of stock</Typography>
                                                )
                                            ) : (
                                                +JSON.parse(item?.variation_description).attribute_desc.find(data => data.variation === item.attributeName).quantity ? (
                                                    <Box className="flex flex-wrap gap-2">
                                                        {
                                                            userDataFromLocal?.token && (

                                                                <ButtonGroup>
                                                                    <Button
                                                                        aria-label="reduce"
                                                                        className='plus-minus-input'
                                                                        onClick={() => removeCartHandler(item)}
                                                                    >
                                                                        <RemoveIcon fontSize="small" />
                                                                    </Button>
                                                                    <Button
                                                                        aria-label=""
                                                                        className='plus-minus-input'
                                                                    >
                                                                        <Typography component={'p'} className="font-semibold text-blue-800 text-lg">{item.finalQuantity}</Typography>
                                                                    </Button>
                                                                    {
                                                                        item?.is_variation === 0 ? (item?.quantity !== finalQuantity || item?.quantity > finalQuantity) && <Button
                                                                            aria-label="increase"
                                                                            className='plus-minus-input'
                                                                            onClick={() => addCartHandler(item)}
                                                                        >
                                                                            <AddIcon fontSize="small" />
                                                                        </Button> : (+JSON.parse(item?.variation_description).attribute_desc.find(data => data.variation === item.attributeName).quantity !== finalQuantity || +JSON.parse(item?.variation_description).attribute_desc.find(data => data.variation === item.attributeName).quantity > finalQuantity) && <Button
                                                                            aria-label="increase"
                                                                            className='plus-minus-input'
                                                                            onClick={() => addCartHandler(item)}
                                                                        >
                                                                            <AddIcon fontSize="small" />
                                                                        </Button>
                                                                    }

                                                                </ButtonGroup>
                                                            )
                                                        }

                                                    </Box>
                                                ) : (
                                                    <Typography className="text-red-500 font-medium mb-3 inline-block text-lg">Out of stock</Typography>
                                                )
                                            )
                                        }
                                    </Box>

                                    <Box className="ml-auto md:ml-0">
                                        <Typography component={'p'} className="text-primary text-lg font-semibold">{`${siteSettings?.rows?.currency} ${item.finalPrice * item.finalQuantity}`}</Typography>
                                    </Box>
                                    <CtaButton className="text-red-600 hover:text-primary cursor-pointer " onClick={() => { setPop({ pop: true, content: 'remove item' }); setGlobalItem({ id: item, attName: item.attributeName }) }}>
                                        <i className="fas fa-trash"></i>
                                    </CtaButton>
                                </Box>
                            })
                        }
                    </Box>
                </Box>
            </Box.Main>

            {/* Custom Dialog Box */}
            <DialogBox>
                <Button onClick={() => { setPop({ pop: false }); setGlobalItem({ id: '', attName: '' }) }}>No</Button>
                <Button onClick={() => cartHandler(globalItem)}>Yes</Button>
            </DialogBox>
        </>
    )
}

export default Items
