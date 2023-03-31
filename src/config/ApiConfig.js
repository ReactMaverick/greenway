/** @format */
import {Platform} from 'react-native';
export const BASE_URL = 'http://demo203.amrithaa.com/vmasala/public/api/';
export const IMAGE_BASE_PATH = 'http://demo203.amrithaa.com/vmasala/public/';

export const GET_BLOG_LIST_API = 'getBlogs';
export const GET_BLOG_DETAILS_API = 'getBlogDetails';
export const GET_CONTACT_US_API = 'contactUs';
export const POST_CONTACT_US_MESSAGE_API = 'contactUsMessage';
export const GET_FAQ_API = 'faq';
export const GET_TERMS_AND_CONDITON_API = 'termAndCondition';
export const GET_PRIVACY_POLICY_API = 'privacyPolicy';
export const GET_PRODUCT_DETAILS_API = 'productDetail';
export const GET_WISHLIST_API = 'viewWishlist';
export const POST_ADD_WISHLIST_API = 'addWishlist';
export const POST_DELETE_WISHLIST_API = 'addWishlist';

export const GET_SLIDERS = BASE_URL + 'sliders';
export const GET_BANNERS = 'banners';
export const GET_GIFTS = 'gifts';
export const GET_SHIPPING_AREA = 'FooterBanner';

export const POST_SHOP_PAGE_API = 'shopPage';
export const GET_ALL_BRANDS_API = 'allBrands';
export const GET_ALL_CATEGORY_API = 'allCategory';

export const GET_ALL_BRANDS = BASE_URL + 'allBrands';

export const GET_CART_API = 'viewCart';
export const POST_ADD_CART_API = 'addToCart';
export const POST_DELETE_CART_API = 'deleteCartItem';
export const APPLY_COUPON = 'apply_coupon';
export const UPDATE_CART_QUANTITY = 'updateCartQuantity';

export const POST_SIGNUP_API = 'signUp';
export const POST_PROCESS_SIGNUP_API = 'processSignup';
export const POST_SIGNIN_API = 'signIn';
export const POST_FORGET_PASSWORD = 'forgetPassword';
export const POST_UPDATE_PASSWORD = 'updateNewPassword';

export const POST_MY_ORDER_API = 'myOrders';
export const POST_ORDER_DETAILS = 'orderDetails';
export const POST_ADD_ORDER = 'add_order';
export const GET_PAYMENT_METHODS = 'getPaymentMethods';
export const POST_GENERATE_ORDER_ID = 'generate_order_id';
export const GET_MY_ADDRESS_API = 'myAddress';
export const POST_ADD_MY_ADDRESS_API = 'addMyAddress';
export const POST_UPDATE_MY_ADDRESS_API = 'updateMyAddress';
export const POST_DELETE_MY_ADDRESS_API = 'deleteAddress';
export const POST_ACCOUNT_UPDATE_API = 'accountUpdate';
export const GET_NEW_ARRIVAL_PRODUCTS = 'newArrivedProduct';

export const GET_ABOUT_US_API = 'aboutUs';
export const POST_NEWSLETTER_API = 'addNewsletterMail';
export const POST_REVIEW_API = 'submitRaitings';
export const POST_CANCEL_ORDER = 'orderCancle';
export const GET_RETURNS_REASONS = 'returnReasons';
export const POST_RETURN_PRODUCT_API = 'returnProcuct';
export const GET_SEARCH_SUGGESSION = 'searchSuggession';

export const GET_STATE_API = 'allStates';
export const POST_DISTRICT_API = 'districtByStateId';
export const GET_PINCODE_API = 'pincodeBydistricts';

export const POST_SOCIAL_LOGIN = BASE_URL + 'socialLogin';


export const GOOGLE_LOGINKEY =
  Platform.OS == 'android'
    ? '123779294474-ljcuqd6p8ldpdmogug9gf2d19qdcl6ra.apps.googleusercontent.com'
    : '123779294474-ljcuqd6p8ldpdmogug9gf2d19qdcl6ra.apps.googleusercontent.com';

export const FBAppId = '8485511444824250';
