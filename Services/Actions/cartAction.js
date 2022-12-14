import * as types from '../Constants/index';
import axios from 'axios'
const getCart = (cart) => ({
    type: types.GET_FROM_CART,
    payload: cart,
});

const alreadyAddCheck = (alreadyAdded) => ({
    type: types.CHECK_ALREADY_ADD,
    payload: alreadyAdded,
});

const getUniqueItem = (finalQuantity) => ({
    type: types.UNIQUE_ITEM_QUANTITY,
    payload: finalQuantity,
});



// get cart data
export const getCartData = () => {
    const localProducts = localStorage.getItem('digikart-products');
    let cartItems = (localProducts ? JSON.parse(localProducts) : []);
    let tempArr = [];
    return function (dispatch) {
        if (cartItems.length!==0) {
            cartItems.forEach((cart, i) => {
                axios.get(`${import.meta.env.VITE_IP_URL}/api/products/${cart.id}`)
                    .then((res) => {
                        let temp = cart;
                        temp.tax = res.data.data.rows.tax;
                        temp.shipping_cost = res.data.data.rows.shipping_cost;
                        temp.name = res.data.data.rows.name;
                        temp.images = res.data.data.rows.images;
                        temp.is_variation = res.data.data.rows.is_variation;
                        temp.is_free_shipping = res.data.data.rows.is_free_shipping;
                        temp.is_flat_rate = res.data.data.rows.is_flat_rate;
                        temp.is_return = res.data.data.rows.is_return;
                        if (cart.is_variation === 0) {
                            temp.finalPrice = res.data.data.rows.discount_price;
                            if (res.data.data.rows.quantity <= 0) {
                                dispatch(deleteFromCart(cart, cart.attributeName));
                            }
                            else {
                                if (cart.finalQuantity > res.data.data.rows.quantity) {
                                    temp.finalQuantity = res.data.data.rows.quantity;
                                    tempArr.push(temp)
                                }
                                else {
                                    tempArr.push(temp)
                                }
                            }
                        }
                        else {
                            temp = cart;
                            let varJson = JSON.parse(res.data.data.rows.variation_description);
                            temp.variation_description = res.data.data.rows.variation_description;
                            temp.tax = res.data.data.rows.tax;
                            temp.shipping_cost = res.data.data.rows.shipping_cost;
                            temp.name = res.data.data.rows.name;
                            temp.images = res.data.data.rows.images;
                            let dataFinder = varJson.attribute_desc.find(js => js.variation === cart.attributeName);
                            temp.finalPrice = dataFinder.discount_price;
                            if (dataFinder.quantity <= 0) {
                                dispatch(deleteFromCart(cart, cart.attributeName));
                            }
                            else{
                                if (cart.finalQuantity > dataFinder.quantity) {
                                    temp.finalQuantity = dataFinder.quantity;
                                    tempArr.push(temp)
                                }
                                else {
                                    tempArr.push(temp)
                                }
                            }

                        }
                        if (i === cartItems.length - 1) {
                            dispatch(getCart(tempArr))
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
        }
        else {
            dispatch(getCart(tempArr))
        }

    };


};

// add to cart
export const addToCart = (product, finalPrice, attributeName) => {
    const localProducts = localStorage.getItem('digikart-products');
    let cartItems = (localProducts ? JSON.parse(localProducts) : []);
    return function (dispatch) {
        if (attributeName) {
            const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice && item.attributeName === attributeName);
            if (index > -1) {
                let cartItm = cartItems;
                cartItm[index].finalQuantity += 1;
                cartItems = cartItm;
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                dispatch(checkAlreadyAdded(product.id, attributeName))
                dispatch(checkUniqueItemQuantity(product.id, attributeName))
                dispatch(getCartData())

            } else {
                cartItems = [
                    ...cartItems,
                    { ...product, finalQuantity: 1, finalPrice: finalPrice, attributeName: attributeName ? attributeName : null },
                ];
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                console.log("Cart Items", cartItems)
                dispatch(checkAlreadyAdded(product.id, attributeName))
                dispatch(checkUniqueItemQuantity(product.id, attributeName))
                dispatch(getCartData())

            }
        }
        else {
            const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice);
            if (index > -1) {
                let cartItm = cartItems;
                cartItm[index].finalQuantity += 1;
                cartItems = cartItm;
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                dispatch(getCartData())
                dispatch(checkAlreadyAdded(product.id, attributeName))
                dispatch(checkUniqueItemQuantity(product.id, attributeName))
            } else {
                cartItems = ([
                    ...cartItems,
                    { ...product, finalQuantity: 1, finalPrice: finalPrice },
                ]);
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                dispatch(checkAlreadyAdded(product.id, attributeName))
                dispatch(checkUniqueItemQuantity(product.id, attributeName))
                dispatch(getCartData())
            }
        }
    };
};

// check item is already added or not
export const checkAlreadyAdded = (productId, attributeName) => {
    const localProducts = localStorage.getItem('digikart-products');
    const cartItems = localProducts ? JSON.parse(localProducts) : [];
    return function (dispatch) {
        if (attributeName) {
            let items = cartItems.find(itm => itm.id === productId && itm.attributeName === attributeName);
            if (items) {
                dispatch(alreadyAddCheck(true))
            }
            else {
                dispatch(alreadyAddCheck(false))
            }
            dispatch(getCartData())
        }
        else {
            let items = cartItems.find(itm => itm.id === productId);
            if (items) {
                dispatch(alreadyAddCheck(true))
            }
            else {
                dispatch(alreadyAddCheck(false))
            }
        }
    };
};

// check unique item's quantity
export const checkUniqueItemQuantity = (productId, attributeName) => {
    const localProducts = localStorage.getItem('digikart-products');
    const cartItems = (localProducts ? JSON.parse(localProducts) : []);
    return function (dispatch) {
        if (attributeName) {
            let items = cartItems.find(itm => itm.id === productId && itm.attributeName === attributeName);
            if (items) {
                dispatch(getUniqueItem(items.finalQuantity))
            }
        }
        else {
            let items = cartItems.find(itm => itm.id === productId);
            if (items) {
                dispatch(getUniqueItem(items.finalQuantity))
            }
        }
    };
};

// delete items from cart
export const deleteFromCart = (product, attributeName) => {
    const localProducts = localStorage.getItem('digikart-products');
    let cartItems = (localProducts ? JSON.parse(localProducts) : []);
    return function (dispatch) {
        if (attributeName) {
            const newItems = cartItems.filter(cart => cart.id !== product.id || cart.attributeName !== attributeName)
            localStorage.setItem('digikart-products', JSON.stringify(newItems))
            dispatch(getCartData())
            dispatch(checkAlreadyAdded(product.id, attributeName))
            dispatch(checkUniqueItemQuantity(product.id, attributeName))
        }
        else {
            const newItems = cartItems.filter(cart => cart.id !== product.id)
            localStorage.setItem('digikart-products', JSON.stringify(newItems))
            console.log('Hello There')
            dispatch(getCartData())
            dispatch(checkAlreadyAdded(product.id, attributeName))
            dispatch(checkUniqueItemQuantity(product.id, attributeName))
        }
    };
};


// remove the quantity of products
export const removeFromCart = (product, finalPrice, attributeName) => {
    const localProducts = localStorage.getItem('digikart-products');
    let cartItems = (localProducts ? JSON.parse(localProducts) : []);
    return function (dispatch) {
        if (attributeName) {
            const exists = cartItems.find((item) => item.id === product.id && item.attributeName === attributeName);
            if (exists.finalQuantity === 1) {
                dispatch(deleteFromCart(product, attributeName));
            } else {
                if (attributeName) {
                    const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice && item.attributeName === attributeName);
                    if (index > -1) {
                        let cartItm = cartItems;
                        cartItm[index].finalQuantity -= 1;
                        cartItems = cartItm;
                        localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                        dispatch(checkAlreadyAdded(product.id, attributeName))
                        dispatch(checkUniqueItemQuantity(product.id, attributeName))
                        dispatch(getCartData())
                    }
                }
                else {
                    const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice);
                    if (index > -1) {
                        let cartItm = cartItems;
                        cartItm[index].finalQuantity -= 1;
                        cartItems = cartItm;
                        localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                        dispatch(checkAlreadyAdded(product.id, attributeName))
                        dispatch(checkUniqueItemQuantity(product.id, attributeName))
                        dispatch(getCartData())
                    }

                }
            }
        }
        else {
            const exists = cartItems.find((item) => item.id === product.id);
            if (exists.finalQuantity === 1) {
                dispatch(deleteFromCart(product, attributeName));
            } else {
                if (attributeName) {
                    const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice && item.attributeName === attributeName);
                    if (index > -1) {
                        let cartItm = cartItems;
                        cartItm[index].finalQuantity -= 1;
                        cartItems = cartItm;
                        localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                        dispatch(checkAlreadyAdded(product.id, attributeName))
                        dispatch(checkUniqueItemQuantity(product.id, attributeName))
                        dispatch(getCartData())
                    }
                }
                else {
                    const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice);
                    if (index > -1) {
                        let cartItm = cartItems;
                        cartItm[index].finalQuantity -= 1;
                        cartItems = cartItm;
                        localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                        dispatch(checkAlreadyAdded(product.id, attributeName))
                        dispatch(checkUniqueItemQuantity(product.id, attributeName))
                        dispatch(getCartData())
                    }

                }
            }
        }
    }
}

// delete all items from cart
export const emptyCart = () => {
    return function (dispatch) {
        localStorage.setItem('digikart-products', JSON.stringify([]))
        dispatch(getCartData())
    };
};