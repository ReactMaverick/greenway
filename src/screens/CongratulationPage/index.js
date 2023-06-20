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

function CongratulationPage({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhoneNumber, setRegPhoneNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [regErrorMsg, setRegErrorMessage] = useState('');
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const [errorArr, setErrorArr] = useState({});

  // const _signUpCheck = () => {
  // //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  //   if (fullName == '') {
  //     setErrorArr({id: 1, message: 'Please enter full name'});
  //   } else if (regEmail == '') {
  //     setErrorArr({id: 2, message: 'Please enter email'});
  //   } else if (reg.test(regEmail) === false) {
  //     setErrorArr({id: 2, message: 'Please enter valid email'});
  //   } else if (regPhoneNumber == '') {
  //     setErrorArr({id: 3, message: 'Please enter phone number'});
  //   } else if (regPhoneNumber.length != 10) {
  //     setErrorArr({id: 3, message: 'Please enter valid phone number'});
  //   } else if (regPassword == '') {
  //     setErrorArr({id: 4, message: 'Please enter password'});
  //   } else if (regPassword.length < 8) {
  //     setErrorArr({id: 4, message: 'Password must be 8 character long'});
  //   } else if (regPassword != confirmPassword) {
  //     setErrorArr({
  //       id: 5,
  //       message: 'please check password and confirm password',
  //     });
  //   } else {
  //     const formData = new FormData();

  //     formData.append('fullname', fullName);
  //     formData.append('phone', regPhoneNumber);
  //     formData.append('email', regEmail);
  //     formData.append('password', regPassword);

  //     PostApiFetch(POST_SIGNUP_API, formData)
  //       .then(([status, response]) => {
  //         if (status == 200) {
  //           console.log('status', status, 'response', response);
  //           if (response.status == true) {
  //             navigation.navigate('OtpVerification', {
  //               response: response,
  //             });
  //             console.log('User registered successfully...');
  //           } else {
  //             setRegErrorMessage(response.message);
  //           }
  //         } else {
  //           console.log('Something went wrong');
  //         }
  //       })
  //       .catch(error => console.log(error))
  //       .finally(() => {});
  //   }
  // };

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
            </View>

            <View style={{ flex: 1.3,justifyContent:'flex-end',marginBottom: hp('2%') }}>
              <TouchableOpacity
                style={activeButton.button}
                onPress={() => navigation.navigate('MyOrders')}>
                <Text style={activeButton.text}>My Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={activeButton.button}
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
