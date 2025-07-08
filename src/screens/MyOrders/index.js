import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  commonStyle,
  pageContainerStyle,
  pageContainerStyle2,
  pageHeader,
} from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  POST_MY_ORDER_API,
  POST_CANCEL_ORDER,
  IMAGE_BASE_PATH,
  POST_REVIEW_API,
} from '../../config/ApiConfig';
import { PostApiFetch } from '../../config/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import { StackActions, useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../common/components/statusbar';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { platform } from '../../common/values/BKConstants';
import CustomModal from '../../common/components/CustomModal';
// import StarRating from 'react-native-star-rating';
function MyOrders({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(state => state.UserReducer.value);
  const isFocused = useIsFocused();

  const [reviewModal, setReviewModal] = useState('');
  const [show, setShow] = useState(false);
  const [changeRating, setChangeRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [fieldMessage, setFieldMessage] = useState('');
  const _getOrderData = () => {
    const formData = new FormData();
    formData.append('user_id', userData.id);
    PostApiFetch(POST_MY_ORDER_API, formData)
      .then(([status, response]) => {
        // console.log(status, response);
        if (status == 200) {
          // console.log("responseOrder==>", response);
          setOrderData(response.orderList);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const _cancelOrder = async id => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('user_id', userData.id);
    formData.append('orders_id', id);
    PostApiFetch(POST_CANCEL_ORDER, formData)
      .then(([status, response]) => {
        if (response.status === true) {
          // console.log('order cancel')
          showMessage({
            message: 'your order canceled successfully',
            type: 'info',
            backgroundColor: '#EC1F25',
          });
          _getOrderData();
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const _submitReview = () => {
    // setIsLoading(true);

    // console.log('user_id -', userData.id);
    // console.log('first_name -', userData.first_name);
    // console.log('products_id -', reviewModal.products[0].products_id);
    // console.log('starRatting -', changeRating);
    // console.log('reviews_text -', reviewText);

    if (changeRating == 0) {
      setFieldMessage('Please select ratting.');
    } else if (reviewText == '') {
      setFieldMessage('Please write some review.');
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('first_name', userData.first_name);
      formData.append('products_id', reviewModal.products[0].products_id);
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
  const toggleModal = async orderDetails => {
    setReviewModal(orderDetails);
  };
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  useEffect(() => {
    if (isFocused) {
      _getOrderData();
    }
  }, [navigation, isFocused]);

  if (isLoading) {
    return (
      <>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <CustomStatusBar />
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <KeyboardAvoidingView
        behavior={platform === 'ios' ? 'padding' : 'height'}
        style={commonStyle.keyboardAvoidingView}>
        <SafeAreaView style={pageContainerStyle2}>
          <CustomStatusBar />
          <View style={pageHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Fontisto
                name="arrow-left"
                color={BKColor.textColor1}
                size={fontSize.h2}
              />
            </TouchableOpacity>
            <Text style={pageHeader.text}>My Order</Text>
            <View style={{ width: '10%' }}></View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: hp('12%') }}>
              {orderData.map((item, key) => (
                <View style={styles.orderItemOuter} key={key}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: BKColor.inputBorder,
                    }}>
                    <View style={styles.contactUsSec}>
                      <View style={styles.orderLeftSec}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.myOrderLabel}>Order Id : </Text>
                          <Text style={styles.myOrderText}>
                            {' '}
                            {item.invoice_number}
                          </Text>
                        </View>
                        {item.orders_status == 'Cancelled' ? (<Text style={styles.orderStatusCancelled}>
                          {item.orders_status}
                        </Text>) : (<Text style={styles.orderStatus}>
                          {item.orders_status}
                        </Text>)}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: hp('0.5%'),
                          }}>
                          <Text style={styles.contactUsText}>Order Date :</Text>
                          <Text style={styles.myOrderDateText}>
                            {' '}
                            {item.date_purchased}
                          </Text>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: hp('0.5%'),
                          }}>
                          <Text style={styles.contactUsText}>Delivery By :</Text>
                          <Text style={styles.myOrderDateText}>
                            {' '}
                            {item.date_purchased}
                          </Text>
                        </View>
                        {/* <Text style={styles.orderStatusActive}>Delivered</Text> */}
                      </View>
                      {/* <View style={styles.orderRightSec}>
                      <Entypo
                        name="chevron-thin-right"
                        color={BKColor.textColor1}
                        size={fontSize.h2}
                      />
                    </View> */}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        // console.log('item ', item)
                        navigation.navigate('OrderDetails', {
                          orderId: item.orders_status_history[0].orders_id,
                        });
                      }}
                      style={{
                        flex: 1,
                        borderRightWidth: 0.5,
                        borderColor: BKColor.inputBorder,
                      }}>
                      <Text style={styles.viewDetailsBtn}>View Details</Text>
                    </TouchableOpacity>
                    {item.orders_status == 'Completed' ? (
                      <TouchableOpacity
                        onPress={() => {
                          toggleModal(item).then(openModal);
                        }}
                        style={{
                          flex: 1,
                          borderLeftWidth: 0.5,
                          borderColor: BKColor.inputBorder,
                        }}>
                        <Text style={styles.orderReviewlBtn}>Review</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderLeftWidth: 0.5,
                          borderColor: BKColor.inputBorder,
                        }}
                        onPress={() => {
                          _cancelOrder(item.orders_status_history[0].orders_id);
                        }}>
                        <Text style={styles.orderCancelBtn}>Cancel Order</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          {/* Review Modal */}
          <CustomModal
            visible={show}
            onClose={closeModal}>
            <ScrollView>
              <View style={styles.headerPopup}>
                <Text style={styles.modalText}>Review Product</Text>
                <TouchableOpacity onPress={closeModal}>
                  <AntDesign name="close" style={styles.modalText} />
                </TouchableOpacity>
              </View>
              {reviewModal.products != undefined ? (
                <View>
                  <Image
                    source={{
                      uri: IMAGE_BASE_PATH + reviewModal.products[0].image,
                    }}
                    style={styles.itemReviewImage}
                    borderRadius={5}
                  />
                </View>
              ) : (
                <></>
              )}
              <View style={styles.modalStar}>
                <Text style={styles.modalText}>
                  {reviewModal.products != undefined ? (
                    reviewModal.products[0].products_name
                  ) : (
                    <></>
                  )}
                </Text>
                {/* <StarRating
                maxStars={5}
                disabled={false}
                starSize={20}
                fullStarColor={BKColor.textColor1}
                halfStarColor={'white'}
                selectedStar={rating => setChangeRating(rating)}
                rating={changeRating}
                name="rating"
              /> */}
              </View>
              <View>
                <Text style={{ textAlign: 'center', color: '#EC1F25' }}>
                  {fieldMessage}
                </Text>
              </View>
              <View>
                <Text style={{ paddingBottom: 10 }}>Write a review</Text>
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
                  style={[activeButton.reviewButton, { alignSelf: 'center' }]}
                  onPress={() => {
                    _submitReview();
                  }}>
                  <Text style={[activeButton.text, { textAlign: 'center' }]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </CustomModal>
          {/* End of Review Modal */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
export default MyOrders;
