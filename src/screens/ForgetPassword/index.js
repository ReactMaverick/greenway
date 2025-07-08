import React, { useState, useEffect } from 'react';
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
import { commonStyle, pageContainerStyle } from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
  placeHolderColor,
} from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import { POST_SIGNIN_API, POST_FORGET_PASSWORD } from '../../config/ApiConfig';
import { PostApiFetch } from '../../config/CommonFunction';
import { showMessage, hideMessage } from 'react-native-flash-message';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../common/components/statusbar';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { platform } from '../../common/values/BKConstants';

function ForgetPassword({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [emailPhone, setEmailPhone] = useState('');
  const [errorArr, setErrorArr] = useState({});

  const _submitEmailPhone = async () => {
    if (emailPhone == '') {
      setErrorArr({ id: 1, message: 'Please enter Email/Phone' });
    } else {
      const formData = new FormData();
      formData.append('email_phone', emailPhone);
      PostApiFetch(POST_FORGET_PASSWORD, formData)
        .then(([status, response]) => {
          if (status == 200) {
            // console.log("response",response);
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
              showMessage({
                message: response.massage,
                type: 'info',
                backgroundColor: '#808080',
              });
            }
          } else {
            if (response.error != undefined) {
              showMessage({
                message: response.error,
                type: 'info',
                backgroundColor: '#808080',
              });
            }
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // useEffect(() => { }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={platform === 'ios' ? 'padding' : 'height'}
      style={commonStyle.keyboardAvoidingView}>
      <SafeAreaView style={pageContainerStyle}>
        <CustomStatusBar />
        <View style={styles.loginLogoSection}>
          <View style={styles.loginLogoSection.logo}>
            <Image
              source={require('../../assets/images/header-logo.png')}
              style={{ height: wp('38.8%'), width: wp('27.1%'), resizeMode: 'cover' }}
            />
          </View>
          <Text style={styles.loginLogoSection.text1}>Forget Password</Text>
        </View>
        <View style={[inputContainer, errorArr.id == 1 && styles.errorInput]}>
          {/* <Text style={inputLevel}>Email / Phone Number</Text> */}
          <TextInput
            placeholder={'Enter email or phone number'}
            placeholderTextColor={placeHolderColor}
            style={[textInput]}
            onChangeText={value => setEmailPhone(value)}
            value={emailPhone}
            onFocus={() => {
              setErrorArr(0);
            }}
          />
        </View>
        {errorArr.id == 1 && (
          <Text style={styles.errorText}>* {errorArr.message}</Text>
        )}
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
    </KeyboardAvoidingView>
  );
}
export default ForgetPassword;
