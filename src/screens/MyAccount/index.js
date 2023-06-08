import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  pageContainerStyle,
  pageContainerStyle2,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
  placeHolderColor,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {POST_ACCOUNT_UPDATE_API} from '../../config/ApiConfig';
import {PostApiFetch} from '../../config/CommonFunction';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../common/components/statusbar';
import {userDetails} from '../../redux/reducers/UserReducer';
function MyAccount({navigation}) {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState([]);
  const userData = useSelector(state => state.UserReducer.value);
  const [fullName, setFullName] = useState(userData.first_name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone);
  const [email, setEmail] = useState(userData.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showError, setShowError] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const [passwordEye, setPasswordEye] = useState(true);
  const [conPasswordEye, setConPasswordEye] = useState(true);

  const _updateAccount = () => {
    if (fullName == '') {
      showMessage({
        message: 'please enter Full Name',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    } else if (
      currentPassword == '' &&
      newPassword == '' &&
      confirmPassword == ''
    ) {
      showMessage({
        message: 'please enter current Password & New Password and Confirm Password',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    }  else if (
      currentPassword == '' &&
      newPassword != '' &&
      confirmPassword !=''
    ) {
      showMessage({
        message: 'please enter current Password',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    } else if (
      currentPassword != '' &&
      newPassword != confirmPassword 
    ) {
      showMessage({
        message: 'please enter correct  new Password & confirm Password',
        type: 'info',
        backgroundColor: '#EC1F25',
      });
    } 
    else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('first_name', fullName);

      if (currentPassword != '') {
        formData.append('currentPassword', currentPassword);
        formData.append('newPassword', newPassword);
        formData.append('confirmPassword', confirmPassword);
      }

      PostApiFetch(POST_ACCOUNT_UPDATE_API, formData).then(
        ([status, response]) => {
          // console.log(status, response);
          if (status == 200) {
            if (response.status == true) {
              dispatch(userDetails(response.user_details));
              // dispatch({ type: 'setUserData', payload: response.user_details });
              showMessage({
                message: 'profile update successfully',
                type: 'info',
                backgroundColor: '#808080',
              });
            } else {
              showMessage({
                message: 'profile updation failed',
                type: 'info',
                backgroundColor: '#808080',
              });
            }
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }
        },
      );
    }
  };

  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <ScrollView style={pageContainerStyle2}>
        {/* <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Signup</Text>
                <View></View>
            </View> */}
        <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left-l"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>My Account</Text>
          <View></View>
        </View>
        <View style={styles.regContainer}>
          <View style={inputContainer}>
            <Text style={inputLevel}>Name</Text>
            <TextInput
              placeholder={'full name'}
              placeholderTextColor={placeHolderColor}
              style={textInput}
              key="fullname"
              onChangeText={value => setFullName(value)}
              value={fullName}
              // secureTextEntry={passwordEye}
              // onChangeText={(password) => setPassword(password)}
              // onFocus={() => {
              //   setErrorMessage('')
              // }}
            />
          </View>
          <View style={inputContainer}>
            <Text style={inputLevel}>Email</Text>
            <TextInput
              placeholder={'email'}
              placeholderTextColor={placeHolderColor}
              style={textInput}
              key="email"
              value={email}

              // secureTextEntry={passwordEye}
              // onChangeText={(password) => setPassword(password)}
              // onFocus={() => {
              //   setErrorMessage('')
              // }}
            />
          </View>
          <View style={inputContainer}>
            <Text style={inputLevel}>Phone Number</Text>
            <TextInput
              placeholder={'phone number'}
              placeholderTextColor={placeHolderColor}
              style={textInput}
              key="phonenumber"
              value={phoneNumber}

              // secureTextEntry={passwordEye}
              // onChangeText={(password) => setPassword(password)}
              // onFocus={() => {
              //   setErrorMessage('')
              // }}
            />
          </View>
          <View style={inputContainer}>
            <Text style={inputLevel}>Current Password</Text>
            <TextInput
              placeholder={'current password'}
              style={textInput}
              key="password"
              onChangeText={password => setCurrentPassword(password)}
              value={currentPassword}
              // secureTextEntry={passwordEye}
              // onChangeText={(password) => setPassword(password)}
              // onFocus={() => {
              //   setErrorMessage('')
              // }}
            />
          </View>
          <View style={inputContainer}>
            <Text style={inputLevel}>New Password</Text>

            <View style={styles.passwordFieldOuter}>
              <TextInput
                placeholder={'new password'}
                style={styles.inputText}
                key="password"
                onChangeText={password => setNewPassword(password)}
                value={newPassword}
                secureTextEntry={passwordEye}
                placeholderTextColor={placeHolderColor}
                // onChangeText={(password) => setPassword(password)}
                // onFocus={() => {
                //   setRegErrorMessage('');
                // }}
              />
              <TouchableOpacity
                onPress={() => {
                  setPasswordEye(!passwordEye);
                }}>
                <Entypo
                  name={passwordEye ? 'eye-with-line' : 'eye'}
                  style={{
                    fontSize: 20,
                    marginRight: wp('3%'),
                    color: BKColor.textColor1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={inputContainer}>
            <Text style={inputLevel}>Confirm Password</Text>

            <View style={styles.passwordFieldOuter}>
              <TextInput
                placeholder={'confirm password'}
                style={styles.inputText}
                key="password"
                onChangeText={password => setConfirmPassword(password)}
                value={confirmPassword}
                secureTextEntry={conPasswordEye}
                placeholderTextColor={placeHolderColor}
                // onChangeText={(password) => setPassword(password)}
                // onFocus={() => {
                //   setRegErrorMessage('');
                // }}
              />
              <TouchableOpacity
                onPress={() => {
                  setConPasswordEye(!conPasswordEye);
                }}>
                <Entypo
                  name={passwordEye ? 'eye-with-line' : 'eye'}
                  style={{
                    fontSize: 20,
                    marginRight: wp('3%'),
                    color: BKColor.textColor1,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.regBtmSection}>
            {/* <Text style={styles.regBtmSection.text1}>Update</Text> */}
            <TouchableOpacity
              style={activeButton.button}
              onPress={_updateAccount}>
              <Text style={activeButton.text}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default MyAccount;
