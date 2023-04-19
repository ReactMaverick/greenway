import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
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
  fontSize,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import OTPTextInput from 'react-native-otp-textinput';
import {POST_PROCESS_SIGNUP_API} from '../../config/ApiConfig';
import {GetApiFetch, PostApiFetch} from '../../config/CommonFunction';
import {useSelector, useDispatch} from 'react-redux';
import {userDetails} from '../../redux/reducers/UserReducer';
import CustomStatusBar from '../../common/components/statusbar';
function OtpVerification({navigation, route}) {
  const dispatch = useDispatch();
  const [OTP, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {response} = route.params;

  const _checkOtp = () => {
    if (OTP == '') {
      setErrorMessage('Please enter otp');
    } else if (OTP != response.signUpData.otp) {
      setErrorMessage('Wrong otp');
    } else {
      const formData = new FormData();
      formData.append('fullname', response.signUpData.fullname);
      formData.append('phone', response.signUpData.phone);
      formData.append('email', response.signUpData.emailaddress);
      formData.append('password', response.signUpData.password);
      // console.log('formData', formData);
      PostApiFetch(POST_PROCESS_SIGNUP_API, formData)
        .then(([status, response]) => {
          if (status == 200) {
            // console.log(status, response.userDetails[0]);
            if (response.status == '1') {
              dispatch(userDetails(response.userDetails[0]));
              // dispatch({ type: 'setUserData', payload: response.userDetails[0] });
              //navigation.navigate('Home');
            } else {
              setErrorMessage(response.message);
            }
          } else {
            console.log('Something went wrong');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false)
        });
    }
  };
  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar/>
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
export default OtpVerification;
