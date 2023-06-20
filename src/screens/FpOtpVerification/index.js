import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  pageContainerStyle,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
} from '../../common/values/BKStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BKColor } from '../../common/values/BKColor';
import OTPTextInput from 'react-native-otp-textinput';
import { POST_PROCESS_SIGNUP_API } from '../../config/ApiConfig';
import { GetApiFetch, PostApiFetch } from '../../config/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import CustomStatusBar from '../../common/components/statusbar';

function FpOtpVerification({ navigation, route }) {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { forgetPasswordOtp, userId } = route.params;
  console.log(forgetPasswordOtp, userId);
  const [errorArr, setErrorArr] = useState({});
  const _checkOtp = () => {
    if (OTP == '') {
      // setErrorMessage('Please enter otp');
      setErrorArr({ id: 1, message: 'Please enter otp' });
    } else if (OTP != forgetPasswordOtp) {
      // setErrorMessage('Wrong otp');
      setErrorArr({ id: 1, message: 'Wrong otp' });
    } else {
      navigation.navigate('UpdatePassword', {
        userId: userId,
      });
    }
  };
  useEffect(() => { }, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <ScrollView style={pageContainerStyle}>
        <View style={styles.regContainer}>
          <View style={styles.logoSection}>
            {/* <Text>Phone Number</Text> */}

            <View style={styles.loginLogoSection}>
              <View style={styles.loginLogoSection.logo}>
                <Image
                  source={require('../../assets/images/header-logo.png')}
                  style={{
                    height: wp('38.8%'), width: wp('27.1%'),
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <Text style={styles.loginLogoSection.text1}>Welcome to</Text>
              <Text style={styles.loginLogoSection.text2}>Fresh Fruits</Text>
            </View>
            
          </View>
          <Text style={styles.regContainer.headerText}>
            Entry Your 4 digit code
          </Text>

          <OTPTextInput
            textInputStyle={[styles.otpBoxStyle, errorArr.id == 1 && styles.errorInput]}
            tintColor={BKColor.textColor2}
            handleTextChange={otpInput => setOTP(otpInput)}
            onFocus={() => {
              setErrorArr(0);
            }}
          />
          {errorArr.id == 1 && (
            <Text style={styles.errorText}>* {errorArr.message}</Text>
          )}
          {/* <Text style={{textAlign: 'center', color: BKColor.textColor2}}>
            {errorMessage}
          </Text> */}

          <View style={styles.loginFooter}>
            <Text style={styles.loginFooter.textLeft}>
              Did you don’t get code?{' '}
            </Text>
            <Text style={styles.loginFooter.textRight}>Resend</Text>
          </View>
          <TouchableOpacity style={activeButton.button} onPress={_checkOtp}>
            <Text style={activeButton.text}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default FpOtpVerification;
