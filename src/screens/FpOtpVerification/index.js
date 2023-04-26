import React, {useState, useEffect} from 'react';
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
import {BKColor} from '../../common/values/BKColor';
import OTPTextInput from 'react-native-otp-textinput';
import {POST_PROCESS_SIGNUP_API} from '../../config/ApiConfig';
import {GetApiFetch, PostApiFetch} from '../../config/CommonFunction';
import {useSelector, useDispatch} from 'react-redux';
import CustomStatusBar from '../../common/components/statusbar';

function FpOtpVerification({navigation, route}) {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {forgetPasswordOtp, userId} = route.params;
  console.log(forgetPasswordOtp, userId);
  const _checkOtp = () => {
    if (OTP == '') {
      setErrorMessage('Please enter otp');
    } else if (OTP != forgetPasswordOtp) {
      setErrorMessage('Wrong otp');
    } else {
      navigation.navigate('UpdatePassword', {
        userId: userId,
      });
    }
  };
  useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <ScrollView style={pageContainerStyle}>
        <View style={styles.regContainer}>
          <Text style={styles.regContainer.headerText}>
            Entry Your 4 digit code
          </Text>
          <View style={styles.logoSection}>
            {/* <Text>Phone Number</Text> */}

            <Image
              style={styles.logoSection.logoImage}
              source={require('../../assets/images/OtpLogo.png')}
              borderRadius={5}
            />
          </View>
          <OTPTextInput
            textInputStyle={styles.otpBoxStyle}
            tintColor={BKColor.textColor2}
            // inputCellLength={1}
            // onChangeText={(value) => setOTP(value)}
            handleTextChange={otpInput => setOTP(otpInput)}
          />
          <Text style={{textAlign: 'center', color: BKColor.textColor2}}>
            {errorMessage}
          </Text>

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
