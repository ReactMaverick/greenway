import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
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

function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhoneNumber, setRegPhoneNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [regErrorMsg, setRegErrorMessage] = useState('');
  const [passwordEye, setPasswordEye] = useState(true);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(true);
  const [errorArr, setErrorArr] = useState({});

  const _signUpCheck = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (fullName == '') {
      setErrorArr({ id: 1, message: 'Please enter full name' });
    } else if (regEmail == '') {
      setErrorArr({ id: 2, message: 'Please enter email' });
    } else if (reg.test(regEmail) === false) {
      setErrorArr({ id: 2, message: 'Please enter valid email' });
    } else if (regPhoneNumber == '') {
      setErrorArr({ id: 3, message: 'Please enter phone number' });
    } else if (regPhoneNumber.length != 10) {
      setErrorArr({ id: 3, message: 'Please enter valid phone number' });
    } else if (regPassword == '') {
      setErrorArr({ id: 4, message: 'Please enter password' });
    } else if (regPassword.length < 8) {
      setErrorArr({ id: 4, message: 'Password must be 8 character long' });
    } else if (regPassword != confirmPassword) {
      setErrorArr({
        id: 5,
        message: 'please check password and confirm password',
      });
    } else {
      const formData = new FormData();

      formData.append('fullname', fullName);
      formData.append('phone', regPhoneNumber);
      formData.append('email', regEmail);
      formData.append('password', regPassword);

      PostApiFetch(POST_SIGNUP_API, formData)
        .then(([status, response]) => {
          if (status == 200) {
            console.log('status', status, 'response', response);
            if (response.status == true) {
              navigation.navigate('OtpVerification', {
                response: response,
              });
              console.log('User registered successfully...');
            } else {
              setRegErrorMessage(response.message);
            }
          } else {
            console.log('Something went wrong');
          }
        })
        .catch(error => console.log(error))
        .finally(() => { });
    }
  };

  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View style={pageContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>

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
          <View>
            {/* <Text style={{textAlign: 'center', color: BKColor.textColor2}}>
              {regErrorMsg}
            </Text> */}
            <View style={inputContainer}>
              <TextInput
                placeholder={'Full Name'}
                placeholderTextColor={placeHolderColor}
                style={[
                  styles.textInput,
                  errorArr.id == 1 && styles.errorInput,
                ]}
                key="fullname"
                onChangeText={value => setFullName(value)}
                value={fullName}
                onFocus={() => {
                  setErrorArr(0);
                }}
              />
              {errorArr.id == 1 && (
                <Text style={styles.errorText}>* {errorArr.message}</Text>
              )}
            </View>
            <View style={inputContainer}>
              <TextInput
                placeholder={'Enter email address'}
                placeholderTextColor={placeHolderColor}
                style={[
                  styles.textInput,
                  errorArr.id == 2 && styles.errorInput,
                ]}
                key="email"
                onChangeText={value => setRegEmail(value)}
                value={regEmail}
                onFocus={() => {
                  setErrorArr(0);
                }}
              />
              {errorArr.id == 2 && (
                <Text style={styles.errorText}>* {errorArr.message}</Text>
              )}
            </View>
            <View style={inputContainer}>
              <TextInput
                placeholder={'Phone Number'}
                placeholderTextColor={placeHolderColor}
                style={[
                  styles.textInput,
                  errorArr.id == 3 && styles.errorInput,
                ]}
                key="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={value => setRegPhoneNumber(value)}
                value={regPhoneNumber}
                onFocus={() => {
                  setErrorArr(0);
                }}
              />
              {errorArr.id == 3 && (
                <Text style={styles.errorText}>* {errorArr.message}</Text>
              )}
            </View>

            <View style={inputContainer}>
              <View
                style={[
                  textInput,
                  errorArr.id == 4 && styles.errorInput,
                ]}>
                <TextInput
                  placeholder={'Enter Password'}
                  key="email"
                  onChangeText={value => setRegPassword(value)}
                  value={regPassword}
                  secureTextEntry={passwordEye}
                  placeholderTextColor={placeHolderColor}
                  style={styles.passwordInput}
                  onFocus={() => {
                    setErrorArr(0);
                  }}
                />
                <View style={{ width: '8%', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setPasswordEye(!passwordEye);
                    }}>
                    <Entypo
                      name={passwordEye ? 'eye-with-line' : 'eye'}
                      style={{
                        fontSize: 20,
                        // marginRight: wp('3%'),
                        color: BKColor.textColor1,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {errorArr.id == 4 && (
                <Text style={styles.errorText}>* {errorArr.message}</Text>
              )}
            </View>

            <View style={inputContainer}>
              <View
                style={[
                  textInput,
                  { paddingHorizontal: wp('3%'), paddingVertical: hp('0.5%') },
                  errorArr.id == 5 && styles.errorInput,
                ]}>
                <TextInput
                  placeholder={'Confirm Password'}
                  key="email"
                  onChangeText={value => setConfirmPassword(value)}
                  value={confirmPassword}
                  secureTextEntry={confirmPasswordEye}
                  placeholderTextColor={placeHolderColor}
                  style={styles.passwordInput}
                  onFocus={() => {
                    setErrorArr(0);
                  }}
                />
                <View style={{ width: '8%', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setConfirmPasswordEye(!confirmPasswordEye);
                    }}>
                    <Entypo
                      name={confirmPasswordEye ? 'eye-with-line' : 'eye'}
                      style={{
                        fontSize: 20,
                        // marginRight: wp('3%'),
                        color: BKColor.textColor1,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {errorArr.id == 5 && (
                <Text style={styles.errorText}>* {errorArr.message}</Text>
              )}
            </View>
            <TouchableOpacity
              style={activeButton.button}
              onPress={_signUpCheck}>
              <Text style={activeButton.text}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginFooter}>
              <Text style={styles.loginFooter.textLeft}>
                Already Have Account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginFooter.textRight}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default Register;
