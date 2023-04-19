import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {pageContainerStyle, pageHeader} from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  IMAGE_BASE_PATH,
  POST_REVIEW_API,
  POST_CANCEL_ORDER,
  GET_RETURNS_REASONS,
  POST_RETURN_PRODUCT_API,
  POST_ORDER_DETAILS,
} from '../../config/ApiConfig';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {PostApiFetch, GetApiFetch} from '../../config/CommonFunction';
import {Dropdown} from 'react-native-element-dropdown';
import Moment from 'moment';
import CustomStatusBar from '../../common/components/statusbar';

function OrderDetails({navigation, route}) {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {orderId} = route.params;
  const [reviewModal, setReviewModal] = useState('');
  const [show, setShow] = useState(false);
  const [changeRating, setChangeRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  // const userData = useSelector(state => state.userReducer.value);
  // console.log('userData =>',userData)

  //Return Product
  const [returnReasonList, setReturnReasonList] = useState([]);
  const [returnReason, setReturnReason] = useState('');
  const [comment, setComment] = useState('');
  const [showReturn, setShowReturn] = useState(false);
  const modalClose = () => setShowReturn(false);
  const modalShow = () => setShowReturn(true);
  const [isFocus, setIsFocus] = useState(false);
  const [productId, setProductId] = useState('');

  const [returnRequested, setReturnRequested] = useState(0);

  const [fieldMessage, setFieldMessage] = useState('');

  const toggleModal = async orderDetails => {
    setReviewModal(orderDetails);
  };
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  const _submitReview = () => {
    setIsLoading(true);
    console.log('user_id -', userData.id);
    console.log('first_name -', userData.first_name);
    console.log('products_id -', reviewModal.products_id);
    console.log('starRatting -', changeRating);
    console.log('reviews_text -', reviewText);

    if (changeRating == 0) {
      setFieldMessage('Please select ratting.');
    } else if (reviewText == '') {
      setFieldMessage('Please write some review.');
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('first_name', userData.first_name);
      formData.append('products_id', reviewModal.products_id);
      formData.append('starRatting', changeRating);
      formData.append('reviews_text', reviewText);
      PostApiFetch(POST_REVIEW_API, formData)
        .then(([status, response]) => {
          if (status == 200) {
            console.log(status, response);
            if (response.status == true) {
              closeModal();
              showMessage({
                message: response.message,
                type: 'info',
                backgroundColor: '#EC1F25',
              });
            } else {
            }
          } else {
            console.log(status, response);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const _returnDateCal = (date_purchased, returnable_days) => {
    // console.log('date_purchased', date_purchased)

    // var orderDate = date_purchased;
    var today = Date.parse(new Date());
    // console.log('today', today)

    var orderDateStr = Moment(date_purchased).utc();
    // console.log('orderDate', Date.parse(orderDateStr))

    //  var day = 60 * 60 * 24 * 1000 * parseInt(returnable_days);
    //  var endDate = new Date(Date.parse(orderDateStr) + day);
    var endDate = new Date(Date.parse(orderDateStr));
    var totalDate = Moment(endDate, 'DD/MM/YYYY').add(returnable_days, 'day');
    var cmp = Moment(today) <= Moment(totalDate);
    // console.log('endDate', cmp)
    return cmp;
  };

  const _getReturnReasons = async () => {
    let params = '';
    GetApiFetch(GET_RETURNS_REASONS, params)
      .then(([status, response]) => {
        // console.log(status, response);
        if (status == 200) {
          // console.log('response==>', response);

          let arr = [];
          response.return_reasons.forEach(value => {
            var obj = {};
            obj['label'] = value.retutn_reason;
            obj['value'] = value.return_reasons_id;

            arr.push(obj);
          });
          // console.log("list", arr)
          setReturnReasonList(arr);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {});
  };

  const _submitReturnComment = () => {
    if (returnReason == '') {
      setFieldMessage('please choose one reason!!');
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('products_id', productId);
      formData.append('orders_id', orderId);
      formData.append('return_reason', returnReason);
      formData.append('return_comment', comment);
      // console.log('formData', formData)
      PostApiFetch(POST_RETURN_PRODUCT_API, formData).then(
        ([status, response]) => {
          if (status == 200) {
            // console.log("response==>", response)
            modalClose();
            setReturnReason('');
            setComment('');
            showMessage({
              message: 'Return Request Added successfully...',
              type: 'info',
              backgroundColor: '#EC1F25',
            });
            _getOrderDetails(orderId);
          }
        },
      );
    }
  };
  const _getOrderDetails = async ordersId => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('orders_id', ordersId);
    // console.log('orders_id', ordersId)
    PostApiFetch(POST_ORDER_DETAILS, formData)
      .then(([status, response]) => {
        // console.log('response ----> ', response.orderDetails)
        if (response.status === true) {
          setOrderDetails(response.orderDetails[0]);
          setProductId(response.orderDetails[0].products[0].products_id);
          setReturnRequested(response.return_request);
          // console.log(response.return_request);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _cancelOrder = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('user_id', userData.id);
    formData.append('orders_id', orderId);
    // console.log('orders_id', orderId)
    // console.log('formData', formData)
    PostApiFetch(POST_CANCEL_ORDER, formData)
      .then(([status, response]) => {
        if (response.status === true) {
          // console.log('order cancel')
          showMessage({
            message: 'your order canceled successfully',
            type: 'info',
            backgroundColor: '#EC1F25',
          });
          _getOrderDetails(orderId);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    _getOrderDetails(orderId);
    _getReturnReasons();
  }, [navigation]);

  if (isLoading) {
    return (
      <>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CustomStatusBar/>
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView style={pageContainerStyle}>
        <CustomStatusBar/>
        <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left-l"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Order Details</Text>
          <View style={{width: wp('10%')}}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.orderDetailsHeadSec}>
            <View style={styles.orderDetailsSec}>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Order ID</Text>
                <Text style={styles.orderTextLeft}>
                  {orderDetails.invoice_number}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Placed On</Text>
                <Text style={styles.orderText}>
                  {orderDetails.date_purchased}
                </Text>
              </View>
            </View>
            <View style={styles.orderDetailsSec}>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Total Amount</Text>
                <Text style={styles.orderTextLeft}>
                  {orderDetails.order_price}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Payment Type</Text>
                <Text style={styles.orderText}>
                  {orderDetails.payment_method}
                </Text>
              </View>
            </View>
            <View style={styles.orderDetailsSec}>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Customer Name</Text>
                <Text style={styles.orderTextLeft}>
                  {orderDetails.customers_name}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.orderTopHeading}>Order Status</Text>
                <Text style={styles.orderTextLeft}>
                  {orderDetails.orders_status}
                </Text>
              </View>
            </View>
            <View style={styles.itemHeadingSec}>
              <Text style={styles.productItemHeading}>Items</Text>
              {/* <Text style={styles.productItemText}>Items with ID proof (2)</Text> */}
              {orderDetails.orders_status != 'Return' ? (
                <>
                  {orderDetails.statusess[0].cancellable == 1 && (
                    <TouchableOpacity
                      style={activeButton.cancelButton}
                      onPress={() => {
                        // console.log("Cancel")
                        _cancelOrder();
                      }}>
                      <Text style={activeButton.text}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <></>
              )}
            </View>

            {orderDetails.products.map((item2, key) => (
              <View style={styles.contactUsSec} key={key}>
                <View style={styles.productImageSec}>
                  <Image
                    source={{uri: IMAGE_BASE_PATH + item2.image}}
                    style={styles.itemImage}
                    borderRadius={5}
                  />
                </View>
                <View style={styles.productDetailsSec}>
                  <Text style={styles.productName}>{item2.products_name}</Text>
                  <View style={styles.productQtySec}>
                    <Text style={styles.productQtyText}>Quantity : </Text>
                    <Text style={styles.productQty}>
                      {' '}
                      {item2.products_quantity}
                    </Text>
                  </View>
                  <View style={styles.productQtySec}>
                    <Text style={styles.productQtyText}>
                      {item2.attributes[0].products_options} :{' '}
                    </Text>
                    <Text style={styles.productQty}>
                      {' '}
                      {item2.attributes[0].products_options_values}
                    </Text>
                  </View>
                  <Text style={styles.productPrice}>
                    Price : ₹{item2.products_price}
                  </Text>

                  <View style={styles.extraSec}>
                    {orderDetails.orders_status == 'Completed' && (
                      <TouchableOpacity
                        style={activeButton.reviewButton}
                        onPress={() => {
                          toggleModal(item2).then(openModal);
                        }}>
                        <Text style={activeButton.text}>Review</Text>
                      </TouchableOpacity>
                    )}

                    {orderDetails.orders_status == 'Completed' ? (
                      <>
                        {item2.returnable_days != 0 &&
                        _returnDateCal(
                          orderDetails.date_purchased,
                          item2.returnable_days,
                        ) &&
                        returnRequested == 0 ? (
                          <TouchableOpacity
                            style={activeButton.reviewButton}
                            onPress={() => {
                              modalShow();
                            }}>
                            <Text style={activeButton.text}>Return</Text>
                          </TouchableOpacity>
                        ) : (
                          <></>
                        )}

                        {returnRequested == 1 ? (
                          <Text style={styles.returnProduct}>
                            Return Request Submited
                          </Text>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.itemHeadingSec}>
              <Text style={styles.productItemHeading}>Gifts</Text>
            </View>
            {orderDetails.allGift.map((item3, key3) => (
              <TouchableOpacity style={styles.contactUsSec} key={key3}>
                <View style={styles.productImageSec}>
                  <Image
                    source={{uri: IMAGE_BASE_PATH + item3.image_path}}
                    style={styles.itemImage}
                    borderRadius={5}
                  />
                </View>

                <View style={styles.productDetailsSec}>
                  <Text style={styles.productName}>
                    {item3.order_gift_title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* Review Modal */}
        <Modal
          isVisible={show}
          onBackdropPress={closeModal}
          style={{
            margin: wp('5%'),
            // marginHorizontal: wp("5%"),
            // marginVertical: hp('20%'),
            backgroundColor: BKColor.white,
            padding: wp('3%'),
            borderRadius: 15,
          }}>
          <ScrollView>
            <View style={styles.headerPopup}>
              <Text style={styles.modalText}>Review Product</Text>
              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" style={styles.modalText} />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                source={{uri: IMAGE_BASE_PATH + reviewModal.image}}
                style={styles.itemReviewImage}
                borderRadius={5}
              />
            </View>
            <View style={styles.modalStar}>
              <Text style={styles.modalText}>{reviewModal.products_name}</Text>
              <StarRating
                maxStars={5}
                disabled={false}
                starSize={20}
                fullStarColor={'#C2C71B'}
                halfStarColor={'white'}
                selectedStar={rating => setChangeRating(rating)}
                rating={changeRating}
                name="rating"
              />
            </View>
            <View>
              <Text style={{textAlign: 'center', color: '#EC1F25'}}>
                {fieldMessage}
              </Text>
            </View>
            <View>
              <Text style={{paddingBottom: 10}}>Write a review</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="put your review here"
                  placeholderTextColor="grey"
                  onChangeText={text => setReviewText(text)}
                  value={reviewText}
                  style={styles.textArea}
                />
              </View>
              <TouchableOpacity
                style={[activeButton.reviewButton, {alignSelf: 'center'}]}
                onPress={() => {
                  _submitReview();
                }}>
                <Text style={activeButton.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
        {/* End of Review Modal */}
        {/* Return Modal */}

        <Modal
          isVisible={showReturn}
          onBackdropPress={modalClose}
          style={{
            margin: wp('5%'),
            // marginHorizontal: wp("5%"),
            // marginVertical: hp('20%'),
            backgroundColor: BKColor.white,
            padding: wp('3%'),
            borderRadius: 15,
          }}>
          <ScrollView>
            <View style={styles.headerPopup}>
              <Text style={styles.modalText}>Return Product</Text>
              <TouchableOpacity onPress={modalClose}>
                <AntDesign name="close" style={styles.modalText} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{textAlign: 'center', color: '#EC1F25'}}>
                {fieldMessage}
              </Text>
            </View>
            <View>
              <Text style={{paddingBottom: 10}}>Return Reasons</Text>
              <View style={styles.dropdownArea}>
                <Dropdown
                  // style={[styles.textInput, isFocus && { borderColor: '#DDDDDD' }]}
                  // style={styles.dropdownArea}
                  placeholder={!isFocus ? 'Select Reasons' : ''}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  value={returnReason}
                  onChange={value => {
                    setReturnReason(value.value);
                    setIsFocus(false);
                  }}
                  data={returnReasonList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="bottom"
                />
              </View>
            </View>

            <View>
              <Text style={{paddingBottom: 10}}>Write a comment</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="put your comment here"
                  placeholderTextColor="grey"
                  onChangeText={text => setComment(text)}
                  value={comment}
                  style={styles.textArea}
                />
              </View>
              <TouchableOpacity
                style={[activeButton.reviewButton, {alignSelf: 'center'}]}
                onPress={() => {
                  // console.log('Return')
                  _submitReturnComment();
                }}>
                <Text style={activeButton.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default OrderDetails;
