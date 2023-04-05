import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { pageContainerStyle, pageHeader, inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { POST_ACCOUNT_UPDATE_API } from "../../config/ApiConfig";
import { PostApiFetch } from "../../config/CommonFunction";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useSelector, useDispatch } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


function MyAccount({ navigation }) {
    const dispatch = useDispatch();
    const [updateData, setUpdateData] = useState([]);
    // const userData = useSelector(state => state.userReducer.value);
    const [fullName, setFullName] = useState(userData.first_name);
    const [phoneNumber, setPhoneNumber] = useState(userData.phone);
    const [email, setEmail] = useState(userData.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showError, setShowError] = useState(false);
    const [fieldError, setFieldError] = useState("");

    const [passwordEye, setPasswordEye] = useState(true);
    const [conPasswordEye, setConPasswordEye] = useState(true);
    
    const _updateAccount = () => {
        if (fullName == "") {
            showMessage({
                message: "please enter Full Name",
                type: "info",
                backgroundColor: "#EC1F25",
            })

        } else if (currentPassword != "" && newPassword == "" && confirmPassword == "") {
            showMessage({
                message: "please enter New Password and Confirm Password",
                type: "info",
                backgroundColor: "#EC1F25",
            })

        } else if (currentPassword != "" && newPassword != "" && confirmPassword == "") {
            showMessage({
                message: "please enter Confirm Password",
                type: "info",
                backgroundColor: "#EC1F25",
            })

        } else if (currentPassword != "" && newPassword == "" && confirmPassword != "") {
            showMessage({
                message: "please enter New Password",
                type: "info",
                backgroundColor: "#EC1F25",
            })

        } else if (currentPassword != "" && newPassword != "" && confirmPassword != "" && newPassword != confirmPassword) {
            showMessage({
                message: "please enter correct Confirm Password",
                type: "info",
                backgroundColor: "#EC1F25",
            })
           
        } else {
            const formData = new FormData();
            formData.append('user_id', userData.id);
            formData.append('first_name', fullName);

            if (currentPassword != "") {
                formData.append('currentPassword', currentPassword);
                formData.append('newPassword', newPassword);
                formData.append('confirmPassword', confirmPassword);
            }

            PostApiFetch(POST_ACCOUNT_UPDATE_API, formData)
                .then(([status, response]) => {
                    console.log(status, response)
                    if (status == 200) {
                        console.log("response==>", response);
                        console.log("profile update successfully");
                        if (response.status == true) {
                            dispatch({ type: 'setUserData', payload: response.user_details });
                          
                            showMessage({
                                message: "profile update successfully",
                                type: "info",
                                backgroundColor: "#808080",
                            })
                            
                        } else {

                            showMessage({
                                message: "profile updation failed",
                                type: "info",
                                backgroundColor: "#808080",
                            })
                            // dispatch({
                            //     type: 'setAlertState', payload: {
                            //         alertStatus: true,
                            //         alertType: "success",
                            //         alertTitle: response.error[0]
                            //     }
                            // })
                           
                        }
                        setCurrentPassword('')
                        setNewPassword('')
                        setConfirmPassword('')
                    }

                });
        }

    };

    //   useEffect(() => {}, [navigation]);

    return (
        
            <ScrollView style={pageContainerStyle}>
            {/* <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Signup</Text>
                <View></View>
            </View> */}
            <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>My Account</Text>
                <View></View>
            </View>
            <View style={styles.regContainer}>

                <View style={inputContainer}>
                    <Text style={inputLevel}>Name</Text>
                    <TextInput
                        placeholder={'full name'}
                        style={textInput}
                        key='fullname'
                        onChangeText={(value)=> setFullName(value)}
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
                        style={textInput}
                        key='email'
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
                        style={textInput}
                        key='phonenumber'
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
                        key='password'
                        onChangeText={(password)=> setCurrentPassword(password)}
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
                    <View style={[textInput, { paddingVertical: wp('0.5%'), paddingHorizontal: hp('1.5%') }]}>
                    <TextInput
                        placeholder={'new password'}
                        // style={textInput}
                        key='password'
                        onChangeText={(password)=> setNewPassword(password)}
                        value={newPassword}
                        secureTextEntry={passwordEye}
                    // secureTextEntry={passwordEye}
                    // onChangeText={(password) => setPassword(password)}
                    // onFocus={() => {
                    //   setErrorMessage('')
                    // }}
                    />
                    <TouchableOpacity onPress={()=>{
                        setPasswordEye(!passwordEye); 
                    }}>
                        <Entypo name={passwordEye ? 'eye-with-line' : 'eye'} style={{ fontSize: 15 }} />
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={inputContainer}>
                    <Text style={inputLevel}>Confirm Password</Text>
                    <View style={[textInput, { paddingVertical: wp('0.5%'), paddingHorizontal: hp('1.5%') }]}>
                    <TextInput
                        placeholder={'confirm password'}
                        // style={textInput}
                        key='password'
                        onChangeText={(password)=> setConfirmPassword(password)}
                        value={confirmPassword}
                        secureTextEntry={conPasswordEye}
                    // secureTextEntry={passwordEye}
                    // onChangeText={(password) => setPassword(password)}
                    // onFocus={() => {
                    //   setErrorMessage('')
                    // }}
                    />
                    <TouchableOpacity onPress={()=>{
                        setConPasswordEye(!conPasswordEye); 
                    }}>
                        <Entypo name={conPasswordEye ? 'eye-with-line' : 'eye'} style={{ fontSize: 15 }} />
                    </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.regBtmSection}>
                    {/* <Text style={styles.regBtmSection.text1}>Update</Text> */}
                    <TouchableOpacity style={activeButton.button} onPress={_updateAccount}>
                        <Text style={activeButton.text}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </ScrollView>
        
    )

}
export default MyAccount;