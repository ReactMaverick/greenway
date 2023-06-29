import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  pageContainerStyle,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  textInput2,
  inputContainer,
  pageContainerStyle2,
  activeButton,
  fontSize,
  placeHolderColor,
  fontFamily,
} from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import { POST_SIGNUP_API } from '../../config/ApiConfig';
import { GetApiFetch, PostApiFetch } from '../../config/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../common/components/statusbar';

function CongratulationPage({ navigation,route}) {
  const orderId = route.params.orderId;
  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{ flex: 1 }}> */}
        <ImageBackground
          source={require('../../assets/images/congratulationPageBg.png')}
          resizeMode='cover'
          style={{ width: '100%', height: hp('100%') }}
        >

          <View style={{ flex: 1, padding: wp('4%') }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={styles.congratulationText1}>Congratulations</Text>
              <Text style={styles.congratulationText2}>Order has been placed</Text>
              <Text style={styles.congratulationText2}>#{orderId}</Text>
            </View>

            <View style={{ flex: 1.3,justifyContent:'flex-end',marginBottom: hp('2%') }}>
              <TouchableOpacity
                style={activeButton.button}
                onPress={() => navigation.navigate('MyOrders')}>
                <Text style={activeButton.text}>My Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[activeButton.button,{backgroundColor: BKColor.textColor2}]}
                onPress={() => navigation.navigate('HomeTab')}>
                <Text style={activeButton.text}>Back to home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
export default CongratulationPage;
