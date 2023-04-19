import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {pageContainerStyle} from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {POST_SIGNIN_API, POST_FORGET_PASSWORD} from '../../config/ApiConfig';
import {PostApiFetch} from '../../config/CommonFunction';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../common/components/statusbar';

function ForgetPassword({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailPhone, setEmailPhone] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const _submitEmailPhone = async () => {
    if (emailPhone == '') {
      setLoginErrorMessage('Please enter Email/Phone');
    } else {
      const formData = new FormData();
      formData.append('email_phone', emailPhone);
      PostApiFetch(POST_FORGET_PASSWORD, formData)
        .then(([status, response]) => {
          if (status == 200) {
            if (response.status == true) {
              navigation.navigate('FpOtpVerification', {
                forgetPasswordOtp: response.forget_password_otp,
                userId: response.userDetails[0].id,
              });
              showMessage({
                message: response.massage,
                type: 'info',
                backgroundColor: '#808080',
              });
            } else {
              setLoginErrorMessage(response.massage);
            }
          } else {
            if (response.error != undefined) {
              setLoginErrorMessage(response.error);
            }
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setIsLoading(false)
        });
    }
  };

  // useEffect(() => { }, [navigation]);

  return (
    <SafeAreaView style={pageContainerStyle}>
        <CustomStatusBar/>
      <View style={styles.loginLogoSection}>
        <View style={styles.loginLogoSection.logo}>
          <Image
            source={require('../../assets/images/header-logo.png')}
            style={{
              height: hp('14%'),
              width: hp('14%'),
              borderRadius: hp('7%'),
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text style={styles.loginLogoSection.text1}>Forget Password</Text>
      </View>
      <Text style={{textAlign: 'center', color: BKColor.textColor2}}>
        {loginErrorMessage}
      </Text>
      <View style={inputContainer}>
        <Text style={inputLevel}>Email / Phone Number</Text>
        <TextInput
          placeholder={'enter email or phone number'}
          style={textInput}
          onChangeText={value => setEmailPhone(value)}
          value={emailPhone}
          // secureTextEntry={passwordEye}
          // onChangeText={(password) => setPassword(password)}
          onFocus={() => {
            setLoginErrorMessage('');
          }}
        />
      </View>
      <TouchableOpacity style={activeButton.button} onPress={_submitEmailPhone}>
        <Text style={activeButton.text}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.loginFooter}>
        <Text style={styles.loginFooter.textLeft}>Back to </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginFooter.textRight}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default ForgetPassword;
