import { combineReducers } from 'redux';
import productCategoryReducer from '../productCategoryReducer';
import productSubCategoryReducer from '../productSubCategoryReducer';
import productBrandReducer from '../productBrandReducer';
import productAttributeReducer from '../productAttributeReducer';
import productReducer from '../productReducer';
import userReducer from '../userReducer';
import couponReducer from '../couponReducer';
import paymentReducer from '../paymentReducer';
import siteSettingReducer from '../siteSettingReducer';
import customPagesReducer from '../customPagesReducer';
import sliderReducer from '../sliderReducer';
import helpReducer from '../helpReducer';
import faqReducer from '../faqReducer';
import userAddressReducer from '../userAddressReducer';
import cartReducer from '../cartReducer';
import wishlistReducer from '../wishlistReducer';
import orderReducer from '../orderReducer';
import reviewReducer from '../reviewReducer';
import searchProductReducer from '../searchProductReducer';
import cancellationReasonsReducer from '../cancellationReasonsReducer';
import returnReasonsReducer from '../returnReasonsReducer';
import returnRequestsReducer from '../returnRequestsReducer';
import orderStatusReducer from '../orderStatusReducer';
import statisticsReducer from '../statisticsReducer';

// user's reducer
import userProfileReducer from '../userProfileReducer';

const rootReducer = combineReducers({
    productCategoryData: productCategoryReducer,
    productSubCategoryData: productSubCategoryReducer,
    productBrandData: productBrandReducer,
    productAttributeData: productAttributeReducer,
    productData: productReducer,
    userData: userReducer,
    couponData: couponReducer,
    paymentData: paymentReducer,
    siteSettingData: siteSettingReducer,
    customPagesData: customPagesReducer,
    sliderData: sliderReducer,
    helpData: helpReducer,
    faqData: faqReducer,
    userProfileData: userProfileReducer,
    userAddressData: userAddressReducer,
    cartData: cartReducer,
    wishlistData: wishlistReducer,
    orderData: orderReducer,
    reviewData: reviewReducer,
    cancellationReasonsData: cancellationReasonsReducer,
    returnReasonsData: returnReasonsReducer,
    searchProductData: searchProductReducer,
    orderStatusData: orderStatusReducer,
    returnRequestsData: returnRequestsReducer,
    statisticsData: statisticsReducer,
   
});


export default rootReducer;