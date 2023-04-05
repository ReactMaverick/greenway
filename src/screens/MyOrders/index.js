import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { pageContainerStyle, pageHeader } from "../../common/values/BKStyles";
import { inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { POST_MY_ORDER_API } from "../../config/ApiConfig";
import { PostApiFetch } from "../../config/CommonFunction";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from '@react-navigation/native';


function MyOrders({ navigation }) {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const userData = useSelector(state => state.userReducer.value);
    // console.log('userData =>',userData)
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
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLoading(false)

            });
    }

    useEffect(() => {
        if(isFocused){
            _getOrderData();
        }
        
    }, [navigation, isFocused]);

    if (isLoading) {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={BKColor.textColor2} />
                </View>
            </>
        )
    } else {
        return (
            <View style={pageContainerStyle}>
                <View style={pageHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                    </TouchableOpacity>
                    <Text style={pageHeader.text}>My Order</Text>
                    <View style={{ width: '10%' }}></View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ marginBottom: hp('5%') }}>
                        {orderData.map((item, key) => (

                            <TouchableOpacity style={styles.contactUsSec} key={key}
                                onPress={() => {
                                    // console.log('item ', item)
                                    navigation.navigate('OrderDetails', {
                                        orderId: item.orders_status_history[0].orders_id,
                                    })

                                }}>
                                <View style={styles.orderLeftSec}>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={styles.myOrderLabel}>Order Id : </Text>
                                        <Text style={styles.myOrderText}> {item.invoice_number}</Text>
                                    </View>
                                    <Text style={styles.contactUsText}>Order Date : {item.date_purchased}</Text>
                                    <Text style={styles.orderStatus}>{item.orders_status}</Text>
                                    {/* <Text style={styles.orderStatusActive}>Delivered</Text> */}
                                </View>
                                <View style={styles.orderRightSec}>
                                    <Entypo name="chevron-thin-right" color='#000000' size={fontSize.h2} />
                                </View>
                            </TouchableOpacity>

                        ))}


                    </View>

                </ScrollView>
            </View>
        )
    }

}
export default MyOrders;