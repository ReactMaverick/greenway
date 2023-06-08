import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image
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
  fontFamily
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

  const [regErrorMsg, setRegErrorMessage] = useState('');
  const [passwordEye, setPasswordEye] = useState(true);

  const _signUpCheck = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (fullName == '') {
      setRegErrorMessage('Please enter full name');
    } else if (regEmail == '') {
      setRegErrorMessage('Please enter email');
    } else if (reg.test(regEmail) === false) {
      setRegErrorMessage('Please enter valid email');
    } else if (regPhoneNumber == '') {
      setRegErrorMessage('Please enter phone number');
    } else if (regPhoneNumber.length != 10) {
      setRegErrorMessage('Please enter valid phone number');
    } else if (regPassword == '') {
      setRegErrorMessage('Please enter password');
    } else if (regPassword.length < 8) {
      setRegErrorMessage('Password must be 8 character long');
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Signup</Text>
                <View></View>
            </View> */}
        <View style={pageContainerStyle}>

          <View style={styles.loginLogoSection}>
            <View style={styles.loginLogoSection.logo}>
              <Image
                source={require('../../assets/images/header-logo.png')} style={{ height: hp('18%'), width: wp('26%'), resizeMode: "cover" }}
              />
            </View>
            <Text style={styles.loginLogoSection.text1}>Welcome to</Text>
            <Text style={styles.loginLogoSection.text2}>Fresh Fruits</Text>
          </View>

          {/* <View style={styles.regTopSection}>
            <Text style={styles.regTopSection.text1}>Welcome to our</Text>
            <Text style={styles.regTopSection.text1}>Greenway shop</Text>
          </View> */}
          <View>
            <Text style={{ textAlign: 'center', color: BKColor.textColor2 }}>
              {regErrorMsg}
            </Text>

            <View style={inputContainer}>
              {/* <Text style={inputLevel}>Name</Text> */}
              <TextInput
                placeholder={'Full Name'}
                placeholderTextColor={placeHolderColor}
                style={textInput}
                key="fullname"
                onChangeText={value => setFullName(value)}
                value={fullName}
                // secureTextEntry={passwordEye}
                // onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setRegErrorMessage('');
                }}
              />
            </View>
            <View style={inputContainer}>
              {/* <Text style={inputLevel}>Email</Text> */}
              <TextInput
                placeholder={'Enter email address'}
                placeholderTextColor={placeHolderColor}
                style={textInput}
                key="email"
                onChangeText={value => setRegEmail(value)}
                value={regEmail}
                // secureTextEntry={passwordEye}
                // onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setRegErrorMessage('');
                }}
              />
            </View>
            <View style={inputContainer}>
              {/* <Text style={inputLevel}>Phone Number</Text> */}
              <TextInput
                placeholder={'Phone Number'}
                placeholderTextColor={placeHolderColor}
                style={textInput}
                key="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={value => setRegPhoneNumber(value)}
                value={regPhoneNumber}
                // secureTextEntry={passwordEye}
                // onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setRegErrorMessage('');
                }}
              />
            </View>



            <View style={inputContainer}>
              {/* <Text style={inputLevel}>Password</Text> */}
              <View style={[
                textInput,
                { paddingHorizontal: wp('2%'), paddingVertical: hp('0.5%') },
              ]}>

                <TextInput
                  placeholder={'Enter Password'}
                  // style={textInput2}
                  key="email"
                  onChangeText={value => setRegPassword(value)}
                  value={regPassword}
                  secureTextEntry={passwordEye}
                  placeholderTextColor={placeHolderColor}
                  style={{
                    width: '90%', fontFamily: fontFamily.regular,
                    fontSize: fontSize.h3, color: BKColor.textColor1
                  }}
                  // onChangeText={(password) => setPassword(password)}
                  onFocus={() => {
                    setRegErrorMessage('');
                  }}
                />
                <TouchableOpacity style={{ width: '10%', }}
                  onPress={() => {
                    setPasswordEye(!passwordEye);
                  }}>
                  <Entypo
                    name={passwordEye ? 'eye-with-line' : 'eye'}
                    style={{ fontSize: 20, marginRight: wp('3%'), color: BKColor.textColor1 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={inputContainer}>
              {/* <Text style={inputLevel}>Password</Text> */}
              <View style={[
                textInput,
                { paddingHorizontal: wp('2%'), paddingVertical: hp('0.5%') },
              ]}>

                <TextInput
                  placeholder={'Confirm Password'}
                  // style={textInput2}
                  key="email"
                  onChangeText={value => setRegPassword(value)}
                  value={regPassword}
                  secureTextEntry={passwordEye}
                  placeholderTextColor={placeHolderColor}
                  style={{
                    width: '90%', fontFamily: fontFamily.regular,
                    fontSize: fontSize.h3, color: BKColor.textColor1
                  }}
                  // onChangeText={(password) => setPassword(password)}
                  onFocus={() => {
                    setRegErrorMessage('');
                  }}
                />
                <TouchableOpacity style={{ width: '10%', }}
                  onPress={() => {
                    setPasswordEye(!passwordEye);
                  }}>
                  <Entypo
                    name={passwordEye ? 'eye-with-line' : 'eye'}
                    style={{ fontSize: 20, marginRight: wp('3%'), color: BKColor.textColor1 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={styles.regBtmSection}>
              <Text style={styles.regBtmSection.text1}>Sign up</Text>
              <TouchableOpacity
                style={styles.regBtmSection.button}
                onPress={_signUpCheck}>
                <Fontisto name="arrow-right-l" color="#FFFFFF" size={fontSize.h1} />
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity style={activeButton.button} onPress={_signUpCheck}>
              <Text style={activeButton.text}>Sign Up</Text>
            </TouchableOpacity>
            {/* <View style={styles.loginFooter}>
              <Text style={styles.loginFooter.textLeft}>
                Already Have Account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginFooter.textRight}>Login</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.loginFooter}>
              <Text style={styles.loginFooter.textLeft}>
                Already Have Account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginFooter.textRight}>Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default Register;
