import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { pageContainerStyle, pageContainerStyle2 } from '../../common/values/BKStyles';
import { pageHeader, fontSize, activeButton, fontFamily } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { inputContainer, textInput, placeHolderColor } from '../../common/values/BKStyles';
import {
  GET_CART_API,
  IMAGE_BASE_PATH,
  POST_DELETE_CART_API,
  APPLY_COUPON,
  UPDATE_CART_QUANTITY,
} from '../../config/ApiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { GetApiFetch, PostApiFetch } from '../../config/CommonFunction';
import DeviceInfo from 'react-native-device-info';
import { showMessage, hideMessage } from 'react-native-flash-message';
import CartIcon from '../../assets/images/CartIcon';
import { useIsFocused } from '@react-navigation/native';
import { cartDetails } from '../../redux/reducers/CartReducer';
import { couponData } from '../../redux/reducers/CouponDetailsReducer';
import CustomStatusBar from '../../common/components/statusbar';

import Swipeable from 'react-native-gesture-handler/Swipeable';

function Cart({ navigation, route }) {
  const routeParams = route.params != undefined ? route.params : "";
  //    console.log("params ", routeParams);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.value);
  const cartData = useSelector(state => state.CartReducer.value);
  const couponDetails = useSelector(state => state.CouponDetailsReducer.value);
  const shopNowData = useSelector(state => state.ShopNowReducer.value);
  //   console.log('shopNowData',shopNowData)
  const [productCartData, setProductCartData] = useState([]);
  //   console.log('productCartData', productCartData)
  const [giftArea, setGiftArea] = useState([]);
  const [androidId, setAndroidId] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  // console.log('couponDetails', couponDetails)

  const [coupon, setCoupon] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [loyalttyPoint, setLoyalttyPoint] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loyaltyPointDetails, setLoyaltyPointDetails] = useState(null);
  const [usedLoyaltyPoint, setUsedLoyaltyPoint] = useState(0);
  const [changeInCart, setChangeInCart] = useState(true);

  const isFocused = useIsFocused();

  const _getCartData = androidId => {
    setIsLoading(true);
    // let params = '?customers_id=14&session_id=&shopNow=';
    let params = '';
    if (userData != null) {
      // console.log('userData.id - ', userData.id)
      if (routeParams != "" && routeParams.shopNow != undefined) {
        params = '?customers_id=' + userData.id + '&session_id=&shopNow=1';
      } else {
        params = '?customers_id=' + userData.id + '&session_id=&shopNow';
      }
    } else {
      params = '?customers_id=&session_id=' + androidId + '&shopNow';
    }

    GetApiFetch(GET_CART_API, params)
      .then(([status, response]) => {
        // console.log('response - ', response);
        if (status == 200) {
          if (response.status == true) {
            setProductCartData(response.cart);
            setGiftArea(response.giftArray);
            // console.log('cart - ', response.cart)
            if (response.cart.length > 0) {
              dispatch(cartDetails(response.cart));
              _calculateAmounts(response.cart, response.shipping_detail, couponDetails, 0)
            } else {
              dispatch(cartDetails());
            }
            _calculateAmounts(
              response.cart,
              response.shipping_detail,
              couponDetails,
              0,
            );
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const _deleteCart = customers_basket_id => {
    setIsLoading(true);
    // console.log('_deleteCart =>', customers_basket_id)
    const formData = new FormData();
    formData.append('id', customers_basket_id);
    PostApiFetch(POST_DELETE_CART_API, formData)
      .then(([status, response]) => {
        // console.log('response =>', response)
        if (status == 200) {
          if (response.status == true) {
            if (response.cart.length > 0) {
              dispatch(cartDetails(response.cart));
              // dispatch({ type: 'setCouponDetails', payload: null });
              dispatch(couponData());
              setChangeInCart(!changeInCart);
            } else {
              dispatch(cartDetails());
              // dispatch({ type: 'setCouponDetails', payload: null });
              dispatch(couponData());
              setChangeInCart(!changeInCart);
            }
            showMessage({
              message: 'cart item deleted successfully',
              type: 'info',
              backgroundColor: '#EC1F25',
            });
            // console.log("cart item deleted successfully")
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        // setIsLoading(false)
      });
  };
  const _updateCartQuantity = (
    customers_basket_id,
    products_id,
    attributes_id,
    customers_basket_quantity,
  ) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('customers_basket_id', customers_basket_id);
    formData.append('products_id', products_id);
    formData.append('cart_quantity', customers_basket_quantity);
    formData.append('AttributeIds', attributes_id);
    formData.append('shopNow', shopNowData);
    // console.log('formData ', formData)
    PostApiFetch(UPDATE_CART_QUANTITY, formData)
      .then(([status, response]) => {
        // console.log(status, response);

        if (status == 200) {
          // console.log('UPDATE_CART_QUANTITY - ' + status, response)
          if (coupon != '') {
            _getCartData(androidId);
            _applyCoupon(coupon);
          } else {
            // _getCartData()
            _getCartData(androidId);
            dispatch(couponData());
            // dispatch({ type: 'setCouponDetails', payload: null });
          }
        } else {
          console.log('Cart Quantity not updated');
        }
      })
      .catch(error => console.log('error - ', error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  //   min_order: 1;
  //   max_order: 18;
  const _minusQuantity = (
    key,
    customers_basket_id,
    products_id,
    attributes_id,
  ) => {
    var customers_basket_quantity =
      parseInt(productCartData[key].customers_basket_quantity) - 1;
    if (customers_basket_quantity <= 0) {
      _deleteCart(customers_basket_id);
    } else {
      if (customers_basket_quantity >= productCartData[key].min_order) {
        _updateCartQuantity(
          customers_basket_id,
          products_id,
          attributes_id,
          customers_basket_quantity,
        );
      }
    }
  };
  const _plusQuantity = (
    key,
    customers_basket_id,
    products_id,
    attributes_id,
  ) => {
    var customers_basket_quantity =
      parseInt(productCartData[key].customers_basket_quantity) + 1;
    if (customers_basket_quantity <= productCartData[key].max_order) {
      _updateCartQuantity(
        customers_basket_id,
        products_id,
        attributes_id,
        customers_basket_quantity,
      );
      // _getCartData();
    }
  };

  const _calculateAmounts = async (
    cart,
    shipping_detail,
    couponDiscountPercent,
    usedLoyaltyPoint,
  ) => {
    var finalCuponDiscount = 0;
    var totalTax = 0;
    var userLoyaltyPoint = 0;
    var total_used_lp = 0;
    var beforeDiscTaxableAmountTotal = 0;
    var afterDiscTaxableAmountTotal = 0;
    var allProductTotal = 0;
    var coupon_discount_percent = 0;
    var loyalty_point_discount = 0;
    if (couponDiscountPercent != null) {
      coupon_discount_percent = couponDiscountPercent.coupon_discount_percent;
    }
    // console.log(couponDiscountPercent)
    if (userData != null) {
      userLoyaltyPoint = userData.userLoyaltyPoint;
    }

    cart.map((item, key) => {
      if (item.prodDiscountRate != '') {
        var tPrice = item.final_price * item.customers_basket_quantity;
        var disc =
          ((item.final_price * item.prodDiscountRate) / 100) *
          item.customers_basket_quantity;
        var sellingPrice = tPrice - disc;
      } else {
        var tPrice = item.final_price * item.customers_basket_quantity;
        var disc = 0;
        var sellingPrice = tPrice - disc;
      }
      var initSellingPrice = sellingPrice;
      var beforeDiscTaxableAmount = sellingPrice;

      if (item.proTaxType != '' && item.taxRate != '') {
        if (item.proTaxType == 'Inclusive') {
          beforeDiscTaxableAmount = initSellingPrice / (1 + item.taxRate / 100);
        }
      }

      beforeDiscTaxableAmountTotal =
        beforeDiscTaxableAmountTotal + beforeDiscTaxableAmount;

      if (coupon_discount_percent > 0) {
        var cuponDiscount =
          beforeDiscTaxableAmount * (coupon_discount_percent / 100);
        setCouponDiscount(cuponDiscount);
      } else {
        var cuponDiscount = 0;
      }
      var afterDiscTaxableAmount = beforeDiscTaxableAmount - cuponDiscount;

      finalCuponDiscount = finalCuponDiscount + cuponDiscount;
      // console.log("finalCuponDiscount", finalCuponDiscount)
      afterDiscTaxableAmountTotal =
        afterDiscTaxableAmountTotal + afterDiscTaxableAmount;

      if (item.proTaxType != '' && item.taxRate != '') {
        var tax = afterDiscTaxableAmount * (item.taxRate / 100);
      } else {
        var tax = 0;
      }
      totalTax = totalTax + tax;

      var productTotal = afterDiscTaxableAmount + tax;
      allProductTotal = allProductTotal + productTotal;

      if (userData != null) {
        var show_LP = 0;
        var show_LP_value = 0;
        if (item.pro_loyalty_point > 0 && userLoyaltyPoint > 0) {
          var ttl_p_lp =
            item.pro_loyalty_point * item.customers_basket_quantity;
          if (userLoyaltyPoint > ttl_p_lp) {
            show_LP = ttl_p_lp;
          } else {
            show_LP = userLoyaltyPoint;
          }
        }
        userLoyaltyPoint = userLoyaltyPoint - show_LP;

        total_used_lp = total_used_lp + show_LP;
        if (loyaltyPointDetails != null) {
          show_LP_value = show_LP * loyaltyPointDetails.loyalty_point_discount;
        }
        beforeDiscTaxableAmount = beforeDiscTaxableAmount - show_LP_value;
      }
    });

    var finalPrice = allProductTotal + shipping_detail.rate;
    finalPrice = finalPrice - usedLoyaltyPoint;
    // if(isLogin){
    //   var lp_value = userData.userLoyaltyPoint * userData.loyaltyPointPrice;
    //   finalPrice = finalPrice + lp_value;
    // }

    setDeliveryCharges(shipping_detail.rate);
    setSubTotal(beforeDiscTaxableAmountTotal.toFixed(2));
    setCouponDiscount(finalCuponDiscount.toFixed(2));
    setTotalTax(totalTax.toFixed(2));
    setTotalPrice(Math.round(finalPrice));
  };

  const _applyCoupon = code => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('customers_id', userData.id);
    formData.append('shopNow', 0);
    formData.append('coupon_code', code);
    PostApiFetch(APPLY_COUPON, formData)
      .then(([status, response]) => {
        // console.log('_applyCoupon', response);
        if (status == 200) {
          if (response.status == true) {
            dispatch(couponData(response.couponDetails));
            // dispatch({ type: 'setCouponDetails', payload: response.couponDetails });
            setCoupon('');
            showMessage({
              message: response.message,
              type: 'info',
              backgroundColor: '#EC1F25',
            });
          } else {
            // console.log(response.status, response)
            showMessage({
              message: response.message,
              type: 'info',
              backgroundColor: '#EC1F25',
            });
          }
        } else {
          console.log('coupon not applyed');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const _goDetailsPage = item => {
    // var cartAttri = item.attributes
    // console.log('productDetails', cartAttri)
    // var arr = []
    // cartAttri.forEach((value) => {
    //     var obj = {}
    //     var obj2 = {}
    //     obj['value1'] = []
    //     obj['option'] = { product_option_slug: value.product_option_slug };
    //     obj2['value'] = value.attribute_value
    //     obj['value1'].push(obj2)
    //     arr.push(obj)
    // });
    navigation.navigate('ProductDetails', {
      preUrl: 'Cart',
      productsSlug: item.products_slug,
      productsAttributes: item.attributes,
    });

    // console.log(item.products_slug, item.attributes)
  };
  useEffect(() => {
    if (isFocused) {
      DeviceInfo.getAndroidId().then(androidId => {
        setAndroidId(androidId);
        _getCartData(androidId);
      });
    }
    // _getCartData();
  }, [navigation, couponDetails, changeInCart, isFocused]);

  if (isLoading) {
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomStatusBar />
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView style={[pageContainerStyle2, { height: hp('100%') }]}>
        <CustomStatusBar />
        <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Cart Page</Text>
          <View style={{ width: wp('10%') }}></View>
        </View>
        {cartData != null ? (
          <ScrollView
            style={{ marginBottom: hp('17%') }}
            showsVerticalScrollIndicator={false}>
            {cartData.map((item, key) => (


              <View key={key}>

                <View style={styles.cartDetailsSec}>
                  <View style={styles.cartImgSec}>
                    <TouchableOpacity
                      onPress={() => {
                        _goDetailsPage(item);
                      }}>
                      {/* <Image
                      source={{ uri: item.image_path }}
                      style={styles.itemImage}
                    /> */}

                      <View style={styles.itemOuter}>
                        <Image
                          source={{ uri: item.image_path }}
                          style={styles.itemImage}
                          borderRadius={wp('12.5%')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 2, paddingVertical: hp('1.5%'), paddingHorizontal: wp('2%') }}>
                    <View style={styles.cartDecSec}>
                      <TouchableOpacity
                        onPress={() => {
                          _goDetailsPage(item);
                        }}>
                        <Text style={styles.cartDecHeading}>
                          {item.products_name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cartDecAttriSec}>
                      <Text style={{ color: BKColor.textColor2 }}>
                        {/* {item.attributes[0].product_option_slug} :{' '} */}
                      </Text>
                      <Text style={styles.itemAttrValue}>{item.attributes[0].attribute_value}</Text>
                    </View>

                    <Text style={styles.cartPrice}>
                      Rs. {item.afterDiscountPrice * item.customers_basket_quantity}
                      {/* ₹ {item.afterDiscountPrice * item.customers_basket_quantity} */}
                    </Text>
                  </View>


                  <View style={styles.cartQtyOuter}>

                    <View style={styles.cartDecSec}>
                      <View style={styles.cartQtySec}>


                        <TouchableOpacity
                          onPress={() => {
                            if (item.customers_basket_quantity < item.max_order) {
                              _plusQuantity(
                                key,
                                item.customers_basket_id,
                                item.products_id,
                                item.attributesString,
                              );
                              // console.log("Product increased")
                            } else {
                              showMessage({
                                message: 'Product out of stock!!',
                                type: 'info',
                                backgroundColor: '#EC1F25',
                              });
                            }
                          }}>
                          <AntDesign name="plus" style={styles.cartPlus} />
                        </TouchableOpacity>


                        <Text style={styles.cartQty}>
                          {item.customers_basket_quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            _minusQuantity(
                              key,
                              item.customers_basket_id,
                              item.products_id,
                              item.attributesString,
                            );
                          }}>
                          <AntDesign name="minus" style={styles.cartMinus} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                </View>

                {/* <TouchableOpacity
                  onPress={() => _deleteCart(item.customers_basket_id)}>
                  <Feather name="trash" style={styles.cartDltIcon} />
                </TouchableOpacity> */}
              </View>
            ))}

            {giftArea.length > 0 && (
              <View style={{ paddingTop: hp('3%') }}>
                <Text style={styles.cartCouponHeading}>Gifts</Text>
                <View style={styles.cartGiftsSec}>
                  {giftArea.map((item2, key2) => (
                    <>
                      <View style={styles.giftsSec} key={key2}>
                        <View>
                          <Image
                            source={{ uri: IMAGE_BASE_PATH + item2.image_path }}
                            style={styles.itemImage}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: wp('60%'),
                          }}>
                          <Text style={styles.giftsItemText}>
                            {item2.gift_title}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: hp('1%'),
                            }}>
                            <Text style={styles.giftsItemPriceText}>
                              ₹ {item2.gift_price}
                            </Text>
                            <Text style={styles.giftsItemPriceText2}>₹ 0</Text>
                          </View>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              </View>
            )}

            <View style={{ paddingVertical: hp('3%') }}>
              <Text style={styles.cartCouponHeading}>Add coupon</Text>


              <View style={inputContainer}>
                <View
                  style={
                    textInput
                  }>
                  <TextInput
                    placeholder={'Entry Voucher Code'}
                    placeholderTextColor={placeHolderColor}
                    style={{
                      width: '92%',
                      fontFamily: fontFamily.regular,
                      fontSize: fontSize.h3,
                      color: BKColor.textColor1,
                    }}
                    onChangeText={value => setCoupon(value)}
                    value={coupon}
                  />
                  <View style={{ width: '8%', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (coupon != '' && userData != null) {
                          _applyCoupon(coupon);
                        }
                      }}>
                      <AntDesign
                        name="arrowright"
                        color={BKColor.textColor2}
                        size={fontSize.h2}
                      />

                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>

            <View style={{ backgroundColor: BKColor.bgColor, padding: wp('3%'), borderRadius: 10 }}>

              <View
                style={{
                  borderBottomWidth: 2,
                  borderStyle: 'solid',
                  borderBottomColor: BKColor.inputBorder,
                  paddingBottom: hp('1%'),
                }}>
                <View style={styles.cartItemSec}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItemHeading}>Subtotal</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItem}>Rs. {subTotal}</Text>
                    {/* <Text style={styles.totalItem}>₹ {subTotal}</Text> */}
                  </View>
                </View>
                <View style={styles.cartItemSec}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItemHeading}>Tax Amount</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItem}>Rs. {totalTax}</Text>
                    {/* <Text style={styles.totalItem}>₹ {totalTax}</Text> */}
                  </View>
                </View>
                {giftArea.length > 0 ? (
                  <View style={styles.cartItemSec}>
                    <Text style={styles.totalItemHeading}>Gift</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.totalItem}>
                        free gift with this order:{' '}
                      </Text>
                      <Text style={{ color: '#EC1F25', fontWeight: '700' }}>
                        Rs. 0
                      </Text>
                      {/* <Text style={{ color: '#EC1F25', fontWeight: '700' }}>
                      ₹ 0
                    </Text> */}
                    </View>
                  </View>
                ) : (
                  <></>
                )}

                <View style={styles.cartItemSec}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItemHeading}>Shipping</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItem}>
                      Flat Rate: Rs. {deliveryCharges}
                      {/* Flat Rate: ₹ {deliveryCharges} */}
                    </Text>
                  </View>
                </View>
                <View style={styles.cartItemSec}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.totalItemHeading}>Coupon applied</Text>
                  </View>
                  {couponDetails != null ? (
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => {
                          dispatch(couponData());
                          // dispatch({ type: 'setCouponDetails', payload: null });
                        }}>
                        <Entypo
                          name="circle-with-cross"
                          style={[
                            styles.totalItem,
                            { marginRight: wp('1%'), fontSize: wp('5%') },
                          ]}
                        />
                        <Text style={styles.totalItem}>
                          {couponDetails.coupon[0].code}: Rs. {couponDiscount}
                          {/* {couponDetails.coupon[0].code}: ₹ {couponDiscount} */}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.totalItem}>no coupon applied</Text>
                    </View>
                  )}
                </View>
                {/* <View style={styles.cartItemSec}>
                            <Text style={styles.totalItemHeading}>Total</Text>
                            <Text style={styles.totalItem}>Rs. 12.25</Text>
                        </View> */}
              </View>
              <View style={styles.cartTotalPrice}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.totalItemHeading}>Total Price</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.totalItem}>Rs. {totalPrice}</Text>
                  {/* <Text style={styles.totalItem}>₹ {totalPrice}</Text> */}
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={activeButton.button}
              onPress={() => navigation.navigate('Checkout')}>
              <Text style={activeButton.text}>Checkout</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: hp('15%'),
            }}>
            <CartIcon
              color={BKColor.textColor2}
              width={wp('30%')}
              height={wp('30%')}
            />
            <Text style={[styles.totalItemHeading, { fontWeight: '700' }]}>
              Your cart is empty
            </Text>
            <Text style={[styles.totalItemHeading, { textAlign: 'center' }]}>
              Looks like you haven't added anything to your cart yet
            </Text>
          </View>
        )}

      </SafeAreaView>
    );
  }
}
export default Cart;
