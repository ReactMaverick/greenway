import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  pageContainerStyle,
  pageContainerStyle2,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BKColor} from '../../common/values/BKColor';
import {
  GET_MY_ADDRESS_API,
  GET_CART_API,
  POST_ADD_ORDER,
  GET_PAYMENT_METHODS,
  POST_GENERATE_ORDER_ID,
} from '../../config/ApiConfig';
import {useSelector, useDispatch} from 'react-redux';
import {GetApiFetch, PostApiFetch} from '../../config/CommonFunction';
import DeviceInfo from 'react-native-device-info';
import RazorpayCheckout from 'react-native-razorpay';
import {showMessage, hideMessage} from 'react-native-flash-message';
import CustomStatusBar from '../../common/components/statusbar';
import {useIsFocused} from '@react-navigation/native';

function Checkout({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // const sessionId = useSelector(state => state.SessionIdReducer.value);
  // const { sessionId } = useSelector((state) => state.SessionIdReducer);
  const userData = useSelector(state => state.UserReducer.value);
  const cartData = useSelector(state => state.CartReducer.value);
  const couponDetails = useSelector(state => state.CouponDetailsReducer.value);
  const selectedShippingAddress = useSelector(
    state => state.SelectedShippingAddressReducer.value,
  );

  const [isLoading, setIsLoading] = useState(true);

  const [productCartData, setProductCartData] = useState([]);
  const [changeOnCart, setChangeOnCart] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [loyalttyPoint, setLoyalttyPoint] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loyaltyPointDetails, setLoyaltyPointDetails] = useState(null);
  const [usedLoyaltyPoint, setUsedLoyaltyPoint] = useState(0);
  const [giftArea, setGiftArea] = useState([]);

  const [sameAsBilling, setSameAsBilling] = useState(
    selectedShippingAddress != null ? 0 : 1,
  );
  const [userBillingAddress, setUserBillingAddress] = useState(null);
  const [userShippingAddressList, setUserShippingAddressList] = useState([]);
  const [androidId, setAndroidId] = useState(true);

  const [cod, setCOD] = useState(null);
  const [razorPay, setRazorPay] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');

  // const _generateOrderId = () => {
  //     setIsLoading(true)
  //     const formData = new FormData();
  //     formData.append('amount', totalPrice * 100);
  //     formData.append('currency', 'INR');
  //     formData.append('receipt', 'qwsaq1');

  //     PostApiFetch(POST_GENERATE_ORDER_ID, formData)
  //         .then(([status, response]) => {
  //             // console.log(status, response);
  //             if (status == 200) {
  //                 if (response.status == true) {
  //                     if (razorPay != null) {
  //                         console.log(status, response.result.id);
  //                         // _makePayment(razorPay.RAZORPAY_KEY, response.result.id, response.result.amount)
  //                     }
  //                 }
  //             }
  //         })
  //         .catch((error) => console.log('_generateOrderIdErr: ',error))
  //         .finally(() => {
  //             setIsLoading(false)
  //         });

  // }
  // const _makePayment = (key, razorpayOrderId, amount) => {
  //     const options ={
  //         key: key,
  //         amount: amount,
  //         currency: 'INR',
  //         order_id: razorpayOrderId,
  //         handler: (response) => {
  //             console.log('payment success - ', response)
  //             // _placeOrderCashOnDelivery(response.razorpay_payment_id)
  //         }
  //     };
  //     const rzr = new Razorpay(options);
  //     rzr.on('payment.failed', (errResponse) => {
  //         console.log('payment failure - ', errResponse)
  //         showMessage({
  //             message: errResponse,
  //             type: "info",
  //             backgroundColor: "#EC1F25",
  //         })
  //     });
  //     rzr.open();
  // }
  const _makeOnlinePayment = (key) => {
    var options = {
        description: 'Payment to Greenway',
        image: 'http://demo203.amrithaa.com/vmasalaWeb/static/media/Logo-removebg-preview.17b9305b410df14eb25d.png',
        currency: 'INR',
        key: key, 
        amount: totalPrice * 100,
        name: 'Greenway',
        // order_id: response.order_id,//Replace this with an order_id created using Orders API.
        //order_id: 5,
        prefill: {
            email: userData.email,
            contact: userData.phone,
            name: userData.first_name
        },
        theme: { color: BKColor.textColor2 }
    }
    RazorpayCheckout.open(options).then((data) => {
        // navigation.navigate('Thankyou');
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        _placeOrderCashOnDelivery(data.razorpay_payment_id)
    }).catch((error) => {
        //  navigation.navigate('Thankyou');
        console.log(error.code, error.description);
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
    });
    // console.log('_makeOnlinePayment');
  };

  const _getMyAddress = () => {
    setIsLoading(true);
    let params = '';
    if (userData != null) {
      params = '?user_id=' + userData.id;
    }
    GetApiFetch(GET_MY_ADDRESS_API, params)
      .then(([status, response]) => {
        if (status == 200) {
          if (response.status == true) {
            setUserBillingAddress(response.userBillingAddress);
            setUserShippingAddressList(response.userShippingAddressList);
          } else {
            // console.log(response.status, response);
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const _getCartData = androidId => {
    setIsLoading(true);
    let params = '';
    if (userData != null) {
      params = '?customers_id=' + userData.id + '&session_id=&shopNow';
    } else {
      params = '?customers_id=&session_id=' + androidId + '&shopNow';
    }
    GetApiFetch(GET_CART_API, params)
      .then(([status, response]) => {
        if (status == 200) {
          if (response.status == true) {
            // console.log('cart - ', response)
            setProductCartData(response.cart);
            setGiftArea(response.giftArray);
            if (response.status == true) {
              if (response.cart.length > 0) {
                dispatch({
                  type: 'setCartData',
                  payload: response.cart,
                });
                _calculateAmounts(
                  response.cart,
                  response.shipping_detail,
                  couponDetails,
                  0,
                );
              } else {
                dispatch({
                  type: 'setCartData',
                  payload: null,
                });
              }
            }
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
  const _setSelectedShippingAddress = shipping => {
    dispatch({type: 'setSelectedShippingAddressData', payload: shipping});
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
  const _getPaymentMethods = () => {
    let params = '';
    GetApiFetch(GET_PAYMENT_METHODS, params)
      .then(([status, response]) => {
        if (status == 200) {
          // console.log('response',response)
          if (response.cod != undefined) {
            setCOD(response.cod);
          } else {
            setCOD(null);
          }
          if (response.razorpay != undefined) {
            // console.log("razorpay ", response.razorpay)
            setRazorPay(response.razorpay);
          } else {
            setRazorPay(null);
          }
        } else {
          console.log('getPaymentMethods - Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        // setIsLoading(false)
      });
  };
  const _placeOrderCashOnDelivery = (razorpay_payment_id = '') => {
    if (userBillingAddress == null) {
      showMessage({
        message: 'Please Add a Billing Address !',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    } else if (sameAsBilling === 0 && selectedShippingAddress == null) {
      showMessage({
        message: 'Select a Shipping address !',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('customers_id', userData.id);
      formData.append(
        'customers_email',
        sameAsBilling === 1
          ? userBillingAddress.entry_email
          : selectedShippingAddress.entry_email,
      );
      formData.append(
        'orderBillingAddressBookId',
        userBillingAddress.address_book_id,
      );
      formData.append(
        'address_id_hidden',
        sameAsBilling === 1 ? '' : selectedShippingAddress.address_book_id,
      );
      formData.append('payment_method', paymentMethod);
      formData.append('razorpay_payment_id', razorpay_payment_id);
      formData.append('is_shop_now', 0);
      formData.append('orderNote', '');
      formData.append('shipping_rate', deliveryCharges);
      if (couponDetails != null) {
        formData.append('coupon_code', JSON.stringify(couponDetails.coupon));
        formData.append(
          'coupon_discount_percent',
          couponDetails.coupon_discount_percent,
        );
      } else {
        formData.append('coupon_code', '');
        formData.append('coupon_discount_percent', '');
      }
      formData.append('os', '');
      formData.append('user_server_details', '');
      formData.append('same_as_billing', sameAsBilling);

      PostApiFetch(POST_ADD_ORDER, formData)
        .then(([status, response]) => {
          console.log(status, response);
          if (status == 200) {
            dispatch({type: 'setCouponDetails', payload: null});
            navigation.navigate('MyOrders');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
      _getCartData(androidId);
    });
    if (isFocused) {
      _getMyAddress();
    }
    _getPaymentMethods();
  }, [navigation,isFocused]);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <SafeAreaView>
        <CustomStatusBar/>
        <ScrollView style={pageContainerStyle2}>
          <View style={pageHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Fontisto
                name="arrow-left-l"
                color={BKColor.textColor1}
                size={fontSize.h2}
              />
            </TouchableOpacity>
            <Text style={pageHeader.text}>Checkout</Text>
            <View style={{width: wp('10%')}}></View>
          </View>
          <View style={styles.regContainer}>
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyAddress')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <Ionicons
                    name="location-outline"
                    color="#000000"
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>
                    Billing Addresses
                  </Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  color="#000000"
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            {userBillingAddress != null ? (
              <View style={styles.customerDetailsSec}>
                <View style={styles.checkBoxIcon}>
                  <Fontisto
                    name="checkbox-active"
                    color="#000000"
                    size={fontSize.h3}
                  />
                </View>
                <View style={styles.customerDetails}>
                  <Text style={styles.regContainer.text2}>
                    {userBillingAddress.entry_firstname}
                  </Text>
                  <Text style={styles.contactUsText}>
                    {userBillingAddress.entry_street_address},{' '}
                    {userBillingAddress.entry_city},{' '}
                    {userBillingAddress.states_name},{' '}
                    {userBillingAddress.districts_name},{' '}
                    {userBillingAddress.pincodes_val}
                  </Text>
                  <View style={styles.contactUsSec}>
                    <Text style={styles.contactUsLabel}>Mobile Number :</Text>
                    <Text style={styles.contactUsText}>
                      {' '}
                      {userBillingAddress.entry_phone}
                    </Text>
                  </View>
                  <View style={styles.contactUsSec}>
                    <Text style={styles.contactUsLabel}>Email :</Text>
                    <Text style={styles.contactUsText}>
                      {' '}
                      {userBillingAddress.entry_email}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text style={styles.contactUsLabel}>
                No billing address added
              </Text>
            )}
          </View>
          <View style={styles.regContainer}>
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyAddress')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <Ionicons
                    name="location-outline"
                    color="#000000"
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>
                    Shipping Addresses
                  </Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  color="#000000"
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.customerDetailsSec}>
              {sameAsBilling === 1 ? (
                <TouchableOpacity
                  style={styles.checkBoxIcon}
                  onPress={() => {
                    setSameAsBilling(0);
                  }}>
                  <Fontisto
                    name="checkbox-active"
                    color="#000000"
                    size={fontSize.h3}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.checkBoxIcon}
                  onPress={() => {
                    setSameAsBilling(1);
                    dispatch({
                      type: 'setSelectedShippingAddressData',
                      payload: null,
                    });
                  }}>
                  <Fontisto
                    name="checkbox-passive"
                    color="#000000"
                    size={fontSize.h3}
                  />
                </TouchableOpacity>
              )}
              <View style={styles.customerDetails}>
                <Text style={styles.regContainer.text2}>Same as billing</Text>
              </View>
            </View>
          </View>
          <View style={styles.regContainer}>
            {userShippingAddressList.length > 0 ? (
              <View>
                {userShippingAddressList.map((item, key) => (
                  <View style={styles.customerDetailsSec} key={key}>
                    {selectedShippingAddress != null &&
                    item.address_book_id ==
                      selectedShippingAddress.address_book_id ? (
                      <TouchableOpacity
                        style={styles.checkBoxIcon}
                        onPress={() => {
                          dispatch({
                            type: 'setSelectedShippingAddressData',
                            payload: null,
                          });
                          setSameAsBilling(1);
                        }}>
                        <Fontisto
                          name="checkbox-active"
                          color="#000000"
                          size={fontSize.h3}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.checkBoxIcon}
                        onPress={() => {
                          _setSelectedShippingAddress(item);
                          setSameAsBilling(0);
                        }}>
                        <Fontisto
                          name="checkbox-passive"
                          color="#000000"
                          size={fontSize.h3}
                        />
                      </TouchableOpacity>
                    )}

                    <View style={styles.customerDetails}>
                      <Text style={styles.regContainer.text2}>
                        {item.entry_firstname}
                      </Text>
                      <Text style={styles.contactUsText}>
                        {item.entry_street_address}, {item.entry_city},{' '}
                        {item.states_name}, {item.districts_name},{' '}
                        {item.pincodes_val}
                      </Text>
                      <View style={styles.contactUsSec}>
                        <Text style={styles.contactUsLabel}>
                          Mobile Number :
                        </Text>
                        <Text style={styles.contactUsText}>
                          {' '}
                          {item.entry_phone}
                        </Text>
                      </View>
                      <View style={styles.contactUsSec}>
                        <Text style={styles.contactUsLabel}>Email :</Text>
                        <Text style={styles.contactUsText}>
                          {' '}
                          {item.entry_email}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.contactUsLabel}>
                No shipping address added
              </Text>
            )}
          </View>
          <View style={styles.regContainer}>
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyAddress')}>
              <View style={styles.orderOuter}>
                <View style={styles.textOuter}>
                  <Text style={styles.regContainer.orderHeading}>
                    Your Order
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.customerDetailsSec}>
              <View style={styles.orderSec}>
                <Text style={styles.regContainer.text3}>Product</Text>
              </View>
              <View style={styles.orderSec}>
                <Text style={styles.regContainer.text3}>Total</Text>
              </View>
            </View>
            {cartData != null && (
              <>
                {cartData.map((item, key) => (
                  <View style={styles.customerOrderSec} key={key}>
                    <View style={styles.productSec}>
                      <Text style={styles.regContainer.text3}>
                        {item.products_name} x {item.customers_basket_quantity}
                      </Text>
                    </View>
                    <View style={styles.totalSec}>
                      <Text style={styles.orderTotal}>
                        ₹{' '}
                        {item.afterDiscountPrice *
                          item.customers_basket_quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}

            <View style={styles.customerOrderSec}>
              <View style={styles.productSec}>
                <Text style={styles.regContainer.text3}>Cart Subtotal</Text>
              </View>
              <View style={styles.totalSec}>
                <Text style={styles.orderTotal}>₹ {subTotal}</Text>
              </View>
            </View>
            <View style={styles.customerOrderSec}>
              <View style={styles.productSec}>
                <Text style={styles.regContainer.text3}>Shipping</Text>
              </View>
              <View style={styles.totalSec}>
                <Text style={styles.orderTotal}>₹ {deliveryCharges}</Text>
              </View>
            </View>
            {giftArea.length > 0 && (
              <View style={styles.customerOrderSec}>
                <View style={styles.productSec}>
                  <Text style={styles.regContainer.text3}>Gifts</Text>
                </View>
                {giftArea.map((item2, key2) => (
                  <View style={styles.totalSec} key={key2}>
                    <Text style={styles.orderTotal}>{item2.gift_title}</Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.customerOrderSec}>
              <View style={styles.productSec}>
                <Text style={styles.regContainer.text3}>Coupon applied</Text>
              </View>
              {couponDetails != null ? (
                <View style={styles.totalSec}>
                  <Text style={styles.orderTotal}>₹ {couponDiscount}</Text>
                </View>
              ) : (
                <View style={styles.totalSec}>
                  <Text style={styles.orderTotal}>no coupon applied</Text>
                </View>
              )}
            </View>
            <View style={styles.customerOrderSec}>
              <View style={styles.productSec}>
                <Text style={styles.regContainer.text3}>Order Total</Text>
              </View>
              <View style={styles.totalSec}>
                <Text style={styles.orderTotal}>₹ {totalPrice}</Text>
              </View>
            </View>
          </View>
          <View style={{marginVertical: hp('3%')}}>
            <View style={styles.paymentSec}>
              {cod != null && (
                <TouchableOpacity
                  style={styles.paymentOuterSec}
                  onPress={() => {
                    setPaymentMethod('cash_on_delivery');
                  }}>
                  {paymentMethod === 'cash_on_delivery' ? (
                    <MaterialIcons
                      name="circle"
                      color="#000000"
                      size={fontSize.h2}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="circle-outline"
                      color="#000000"
                      size={fontSize.h2}
                    />
                  )}

                  <Text style={styles.paymentType}>Cash on delivery</Text>
                </TouchableOpacity>
              )}
              {razorPay != null && (
                <TouchableOpacity
                  style={styles.paymentOuterSec}
                  onPress={() => {
                    setPaymentMethod('razor_pay');
                  }}>
                  {paymentMethod === 'razor_pay' ? (
                    <MaterialIcons
                      name="circle"
                      color="#000000"
                      size={fontSize.h2}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="circle-outline"
                      color="#000000"
                      size={fontSize.h2}
                    />
                  )}

                  <Text style={styles.paymentType}>Razor Pay</Text>
                </TouchableOpacity>
              )}
            </View>
            {paymentMethod === 'cash_on_delivery' && (
              <TouchableOpacity
                style={activeButton.button}
                onPress={() => {
                  _placeOrderCashOnDelivery();
                }}>
                <Text style={activeButton.text}>Place Order</Text>
              </TouchableOpacity>
            )}
            {paymentMethod === 'razor_pay' && (
              <TouchableOpacity
                style={activeButton.button}
                onPress={() => {
                  // _generateOrderId()
                  if (razorPay != null) {
                    _makeOnlinePayment(razorPay.RAZORPAY_KEY);
                  }
                }}>
                <Text style={activeButton.text}>Proceed to Razorpay</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Checkout;
