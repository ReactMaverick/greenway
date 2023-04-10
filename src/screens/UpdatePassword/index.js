import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import { pageContainerStyle } from "../../common/values/BKStyles";
import { inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { POST_UPDATE_PASSWORD } from "../../config/ApiConfig";
import { PostApiFetch } from "../../config/CommonFunction";
import { showMessage, hideMessage } from "react-native-flash-message";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


function UpdatePassword({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const { userId } = route.params;
    const [passwordEye, setPasswordEye] = useState(true);
    const [conPasswordEye, setConPasswordEye] = useState(true);

    const _updatePassword = async () => {
        if (newPassword == '') {
            setLoginErrorMessage("Please enter New Password");
        } else if (newPassword.length < 8) {
            setLoginErrorMessage("Password must be 8 character long");
        } else if (confirmPassword == '') {
            setLoginErrorMessage("Please enter Confirm Password");
        }else if (newPassword != confirmPassword){
            setLoginErrorMessage("New password and Confirm Password must be same");
        } else {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('new_password', newPassword);
            formData.append('confirm_password', confirmPassword);
            PostApiFetch(POST_UPDATE_PASSWORD, formData)
                .then(([status, response]) => {
                    if (status == 200) {
                        if (response.status == true) {
                            navigation.navigate('Login')
                            showMessage({
                                message: response.message,
                                type: "info",
                                backgroundColor: "#808080",
                            })
                        } else {
                            setLoginErrorMessage(response.message);
                        }
                    } else {
                        if (response.error != undefined) {
                            setLoginErrorMessage(response.error);
                        }
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    // setIsLoading(false)
                });
        }
    }

    // useEffect(() => { }, [navigation]);

    return (
        <View style={pageContainerStyle}>
            <View style={styles.loginLogoSection}>
                <View style={styles.loginLogoSection.logo}>
                    <Image source={require('../../assets/images/header-logo.png')} style={{
                        height: hp('14%'),
                        width: hp('14%'),
                        borderRadius: hp('7%'),
                        resizeMode:'cover'
                    }} />
                </View>
                <Text style={styles.loginLogoSection.text1}>Forget Password</Text>
            </View>
            <Text style={{ textAlign: "center", color: BKColor.textColor2 }} >{loginErrorMessage}</Text>
            <View style={inputContainer}>

                <Text style={inputLevel}>New Password</Text>
                <View style={[textInput, { paddingVertical: wp('0.5%'), paddingHorizontal: hp('1.5%') }]}>
                    <TextInput
                        placeholder={'enter new password'}
                        // style={textInput}
                        onChangeText={(value) => setNewPassword(value)}
                        value={newPassword}
                        secureTextEntry={passwordEye}
                        onFocus={() => {
                            setLoginErrorMessage('')
                        }}
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
                        placeholder={'enter confirm password'}
                        // style={textInput}
                        onChangeText={(value) => setConfirmPassword(value)}
                        value={confirmPassword}
                        secureTextEntry={conPasswordEye}
                        onFocus={() => {
                            setLoginErrorMessage('')
                        }}
                    />
                    <TouchableOpacity onPress={()=>{
                        setConPasswordEye(!conPasswordEye); 
                    }}>
                        <Entypo name={conPasswordEye ? 'eye-with-line' : 'eye'} style={{ fontSize: 15 }} />
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={activeButton.button} onPress={_updatePassword}>
                <Text style={activeButton.text}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.loginFooter}>
                <Text style={styles.loginFooter.textLeft}>Back to </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginFooter.textRight}>Log in</Text>
                </TouchableOpacity>

            </View>
        </View>
    )

}
export default UpdatePassword;