import { useState } from 'react'

const useCart = () => {
    const localProducts = localStorage.getItem('digikart-products');
    const [cartItems, setCartItems] = useState(localProducts ? JSON.parse(localProducts) : []);
    const [finalQuantity, setFinalQuantity] = useState(1);

    // add item 
    const addItem = (product, finalPrice, attributeName) => {
        if (attributeName) {
            const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice && item.attributeName === attributeName);
            if (index > -1) {
                let cartItm = cartItems;
                cartItm[index].finalQuantity += 1;
                setCartItems(cartItm);
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                inCart(product.id, attributeName)
                finalQuantityByUniqueItem(product.id, attributeName)
            } else {
                setCartItems([
                    ...cartItems,
                    { ...product, finalQuantity: 1, finalPrice: finalPrice, attributeName: attributeName ? attributeName : null },
                ]);
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                inCart(product.id, attributeName)
                finalQuantityByUniqueItem(product.id, attributeName)
            }
        }
        else {
            const index = cartItems.findIndex((item) => item.id === product.id && item.finalPrice === finalPrice);
            if (index > -1) {
                let cartItm = cartItems;
                cartItm[index].finalQuantity += 1;
                setCartItems(cartItm);
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                inCart(product.id, attributeName)
                finalQuantityByUniqueItem(product.id, attributeName)
            } else {
                setCartItems([
                    ...cartItems,
                    { ...product, finalQuantity: 1, finalPrice: finalPrice },
                ]);
                localStorage.setItem('digikart-products', JSON.stringify(cartItems))
                inCart(product.id, attributeName)
                finalQuantityByUniqueItem(product.id, attributeName)
            }
        }
    };

    // check the items is already added or not
    const inCart = (productId, attributeName) => {
        if (attributeName) {
            let items = cartItems.find(itm => itm.id === productId && itm.attributeName === attributeName);
            if (items) {
                return true
            }
            else {
                return false
            }
        }
        else {
            let items = cartItems.find(itm => itm.id === productId);
            if (items) {
                return true
            }
            else {
                return false
            }
        }

    }

    // check the items quantity
    const finalQuantityByUniqueItem = (productId, attributeName) => {
        if (attributeName) {
            let items = cartItems.find(itm => itm.id === productId && itm.attributeName === attributeName);
            if (items) {
                setFinalQuantity(items.finalQuantity)
            }

        }
        else {
            let items = cartItems.find(itm => itm.id === productId);
            console.log(items)
            if (items) {
                setFinalQuantity(items.finalQuantity)
            }
        }

    }


    return { addItem: addItem, finalQuantity: finalQuantity, finalQuantityByUniqueItem: finalQuantityByUniqueItem, inCart: inCart,items:cartItems };
}

export default useCart
