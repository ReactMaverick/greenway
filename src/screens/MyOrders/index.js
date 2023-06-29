import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { pageContainerStyle, pageContainerStyle2, pageHeader } from '../../common/values/BKStyles';
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
import { POST_MY_ORDER_API,POST_CANCEL_ORDER } from '../../config/ApiConfig';
import { PostApiFetch } from '../../config/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import CustomStatusBar from '../../common/components/statusbar';
import { showMessage, hideMessage } from 'react-native-flash-message';
function MyOrders({ navigation }) {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(state => state.UserReducer.value);
  const isFocused = useIsFocused();

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
  const _cancelOrder = async (id) => {
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
              <View style={styles.orderItemOuter}>
                <View style={{ borderBottomWidth: 1, borderColor: BKColor.inputBorder }}>
                  <View
                    style={styles.contactUsSec}
                    key={key}
                    >
                    <View style={styles.orderLeftSec}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.myOrderLabel}>Order Id : </Text>
                        <Text style={styles.myOrderText}>
                          {' '}
                          {item.invoice_number}
                        </Text>
                      </View>
                      <Text style={styles.orderStatus}>{item.orders_status}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Text style={styles.contactUsText}>
                          Order Date :
                        </Text>
                        <Text style={styles.myOrderDateText}> {item.date_purchased}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp('0.5%') }}>
                        <Text style={styles.contactUsText}>
                          Delivery By :
                        </Text>
                        <Text style={styles.myOrderDateText}> {item.date_purchased}</Text>
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
                    borderColor: BKColor.inputBorder
                  }}>
                    <Text style={styles.viewDetailsBtn}>View Details</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{
                    flex: 1,
                    borderLeftWidth: 0.5,
                    borderColor: BKColor.inputBorder
                  }} onPress={() => {_cancelOrder(item.orders_status_history[0].orders_id)}}>
                    <Text style={styles.orderCancelBtn}>Cancel Order</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity style={{
                    flex: 1,
                    borderLeftWidth: 0.5,
                    borderColor: BKColor.inputBorder
                  }}>
                    <Text style={styles.orderReviewlBtn}>Review</Text>
                  </TouchableOpacity> */}

                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default MyOrders;
