import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  statusBarStyle,
  statusBarTransition
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { pageContainerStyle } from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
  placeHolderColor,
  fontFamily
} from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import {
  POST_SIGNIN_API,
  GOOGLE_LOGINKEY,
  FBAppId,
  POST_SOCIAL_LOGIN,
} from '../../config/ApiConfig';
import { PostApiFetch } from '../../config/CommonFunction';
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {userDetails} from '../../redux/reducers/UserReducer';
import CustomStatusBar from '../../common/components/statusbar';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
//import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';

// Settings.setAppID(FBAppId);

// Settings.initializeSDK();
// GoogleSignin.configure({
//   webClientId: GOOGLE_LOGINKEY,
// });

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [androidId, setAndroidId] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [passwordEye, setPasswordEye] = useState(true);

  const [socialId, setSocialId] = useState('');
  const [social, setSocial] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMessage] = useState('');

  const _signIn = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (username == '') {
      setLoginErrorMessage('Enter Email/Phone');
    } else if (password == '') {
      setLoginErrorMessage('Enter Password');
    } else if (reg.test(username) === false && username.length != 10) {
      setLoginErrorMessage('Please Enter Valid Email/Phone');
    } else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('user_name', username);
      formData.append('password', password);
      formData.append('session_id', androidId);
      formData.append('fcmToken', "test-token");
      formData.append('device_os', Platform.OS);
      // console.log('formData',formData);
      PostApiFetch(POST_SIGNIN_API, formData)
        .then(([status, response]) => {
          // console.log('response',response);
          if (status == 200) {
            // setIsLoading(true)
            if (response.status == false) {
              setLoginErrorMessage(response.message);
            } else {
              setUsername('');
              setPassword('');
              // console.log('UserData', response.userDetails[0])
              dispatch(userDetails(response.userDetails[0]));
            }
          } else {
             console.log('Something went wrong');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // const onGoogleButtonPress = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     // console.log(userInfo);
  //     return userInfo;
  //     //this.setState({ userInfo });
  //   } catch (error) {
  //     console.log(error.code, error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  // const onFacebookButtonPress = async () => {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // };

  const _socialLogin = async (social_id, social, email, name) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('social_id', social_id);
    formData.append('social', social);
    formData.append('email', email);
    formData.append('name', name);
    // formData.append('session_id', deviceToken);
    formData.append('session_id', androidId);
    formData.append('fcmToken', "test");
    formData.append('device_os', Platform.OS);
    console.log('formData==>', formData);

    fetch(POST_SOCIAL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {

        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })
      .then(([status, response]) => {

        if (status == 200) {
          // console.log('LogData', status, response);
          // dispatch({ type: 'setUserData', payload: response.userDetails[0] });
          // dispatch(userDetails(response.userDetails[0]));
          navigation.navigate('Home');
        } else {
          if (response.error != undefined) {
            setErrorMessage(response.error);
          }
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </View>
      </>
    );
  } else {
    return (
      <SafeAreaView>
         <CustomStatusBar/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={pageContainerStyle}>
          <View style={styles.loginLogoSection}>
            <View style={styles.loginLogoSection.logo}>
              <Image
                source={require('../../assets/images/header-logo.png')} style={{ height: hp('18%'),width: wp('26%'),resizeMode:"cover" }} 
              />
            </View>
            <Text style={styles.loginLogoSection.text1}>Welcome to</Text>
            <Text style={styles.loginLogoSection.text2}>Fresh Fruits</Text>
          </View>
          <Text style={{ textAlign: 'center', color: BKColor.textColor2 }}>
            {loginErrorMessage}
          </Text>
          <View>
            {/* <Text style={inputLevel}>User Name</Text> */}
            <TextInput
              placeholder={'Enter email address'}
              placeholderTextColor={placeHolderColor}
              style={textInput}
              onChangeText={value => setUsername(value)}
              value={username}
              // secureTextEntry={passwordEye}
              // onChangeText={(password) => setPassword(password)}
              onFocus={() => {
                setLoginErrorMessage('');
              }}
            />
          </View>

          <View style={inputContainer}>
            {/* <Text style={inputLevel}>Password</Text> */}
            <View
              style={[
                textInput,
                { paddingHorizontal: wp('2%'), paddingVertical: hp('0.5%') },
              ]}>
              <TextInput
                placeholder={'Password'}
                placeholderTextColor={placeHolderColor}
                style={{ width: '90%',fontFamily: fontFamily.regular,
                fontSize: fontSize.h3,color: BKColor.textColor1}}
                secureTextEntry={passwordEye}
                onChangeText={value => setPassword(value)}
                value={password}
                // onChangeText={(password) => setPassword(password)}
                onFocus={() => {
                  setLoginErrorMessage('');
                }}
              />
              <TouchableOpacity style={{ width: '10%', }}
                onPress={() => {
                  setPasswordEye(!passwordEye);
                }}>
                {/* <Text>Show</Text> */}
                <Entypo
                  name={passwordEye ? 'eye-with-line' : 'eye'}
                  style={{ fontSize: 20,color:BKColor.textColor1 }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text style={inputBottomLevel}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={activeButton.button} onPress={_signIn}>
            <Text style={activeButton.text}>Login</Text>
          </TouchableOpacity>
          {/* <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialLoginButton.button}
              onPress={() => {
                onGoogleButtonPress().then(result => {
                  console.log('google login!', result);
                  _socialLogin(
                    result.user.id,
                    'google',
                    result.user.email,
                    result.user.name,
                  );
                  setSocialId(result.user.id);
                  setEmail(result.user.email);
                  setName(result.user.name);
                  setSocial('google');
                });
              }}>
              <AntDesign
                name="google"
                color={BKColor.textColor2}
                size={fontSize.h3}
                style={styles.socialLoginButton.icon}
              />
              <Text style={styles.socialLoginButton.text}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialLoginButton.button}
              onPress={() => {
                navigation.navigate('HomeScreen');
                onFacebookButtonPress().then(result => {
                  console.log('Signed in with Facebook!', result);
                  _socialLogin(
                    result.additionalUserInfo.profile.id,
                    'facebook',
                    result.additionalUserInfo.profile.email,
                    result.user.displayName,
                  );
                  setSocialId(result.additionalUserInfo.profile.id);
                  setEmail(result.additionalUserInfo.profile.email);
                  setName(result.user.displayName);
                  setSocial('facebook');
                });
              }}>
              <FontAwesome
                name="facebook"
                color={BKColor.textColor1}
                size={fontSize.h3}
                style={styles.socialLoginButton.icon}
              />
              <Text style={styles.socialLoginButton.text2}>Facebook</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.loginFooter}>
            <Text style={styles.loginFooter.textLeft}>
              Don’t have account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.loginFooter.textRight}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}
export default Login;
