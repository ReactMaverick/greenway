import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { pageContainerStyle, pageHeader, inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { POST_SIGNUP_API } from "../../config/ApiConfig";
import { GetApiFetch, PostApiFetch } from "../../config/CommonFunction";
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


function Register({ navigation }) {

    const [fullName, setFullName] = useState("")
    const [regEmail, setRegEmail] = useState("")
    const [regPhoneNumber, setRegPhoneNumber] = useState("")
    const [regPassword, setRegPassword] = useState("")

    const [regErrorMsg, setRegErrorMessage] = useState("")
    const [passwordEye, setPasswordEye] = useState(true);

    const _signUpCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (fullName == "") {
            setRegErrorMessage("Please enter full name");
        } else if (regEmail == "") {
            setRegErrorMessage("Please enter email");
        } else if ((reg.test(regEmail) === false)) {
            setRegErrorMessage("Please enter valid email");
        } else if (regPhoneNumber == "") {
            setRegErrorMessage("Please enter phone number");
        } else if (regPhoneNumber.length != 10) {
            setRegErrorMessage("Please enter valid phone number");
        } else if (regPassword == "") {
            setRegErrorMessage("Please enter password");
        } else if (regPassword.length < 8) {
            setRegErrorMessage("Password must be 8 character long");
        } else {
            const formData = new FormData();

            formData.append('fullname', fullName);
            formData.append('phone', regPhoneNumber);
            formData.append('email', regEmail);
            formData.append('password', regPassword);

            PostApiFetch(POST_SIGNUP_API, formData)
                .then(([status, response]) => {
                    if (status == 200) {
                        console.log(status, response);
                        if (response.status == false) {
                            setRegErrorMessage(response.message);
                        } else {
                            navigation.navigate('OtpVerification', {
                                response: response
                            })
                            // navigate('/otp-verification', {
                            //     state: {
                            //         response: response
                            //     }
                            // });
                            console.log("User registered successfully...");
                        }
                    } else {
                        console.log(status, response);
                    }
                })
                .catch((error) => console.log(error))
                .finally(() => {
                });
        }
    }

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
            <View style={styles.regTopSection}>
                <Text style={styles.regTopSection.text1}>Welcome to</Text>
                <Text style={styles.regTopSection.text1}>Kollupaatikadai</Text>
            </View>
            <View style={styles.regContainer}>

                <Text style={{ textAlign: "center", color: BKColor.textColor2 }} >{regErrorMsg}</Text>


                <View style={inputContainer}>
                    <Text style={inputLevel}>Name</Text>
                    <TextInput
                        placeholder={'full name'}
                        style={textInput}
                        key='fullname'
                        onChangeText={(value) => setFullName(value)}
                        value={fullName}
                        // secureTextEntry={passwordEye}
                        // onChangeText={(password) => setPassword(password)}
                        onFocus={() => {
                            setRegErrorMessage('')
                        }}
                    />
                </View>
                <View style={inputContainer}>
                    <Text style={inputLevel}>Email</Text>
                    <TextInput
                        placeholder={'email'}
                        style={textInput}
                        key='email'
                        onChangeText={(value) => setRegEmail(value)}
                        value={regEmail}
                        // secureTextEntry={passwordEye}
                        // onChangeText={(password) => setPassword(password)}
                        onFocus={() => {
                            setRegErrorMessage('')
                        }}
                    />
                </View>
                <View style={inputContainer}>
                    <Text style={inputLevel}>Phone Number</Text>
                    <TextInput
                        placeholder={'phone number'}
                        style={textInput}
                        key='phonenumber'
                        keyboardType = 'numeric'
                        maxLength={10}
                        onChangeText={(value) => setRegPhoneNumber(value)}
                        value={regPhoneNumber}
                        // secureTextEntry={passwordEye}
                        // onChangeText={(password) => setPassword(password)}
                        onFocus={() => {
                            setRegErrorMessage('')
                        }}
                    />
                </View>
                <View style={inputContainer}>
                    <Text style={inputLevel}>Password</Text>
                    <View style={[textInput, { paddingVertical: wp('0.5%'), paddingHorizontal: hp('1.5%') }]}>
                        <TextInput
                            placeholder={'password'}
                            // style={textInput}
                            key='password'
                            onChangeText={(value) => setRegPassword(value)}
                            value={regPassword}
                            secureTextEntry={passwordEye}
                            // onChangeText={(password) => setPassword(password)}
                            onFocus={() => {
                                setRegErrorMessage('')
                            }}
                        />
                        <TouchableOpacity onPress={() => {
                            setPasswordEye(!passwordEye);
                        }}>
                            <Entypo name={passwordEye ? 'eye-with-line' : 'eye'} style={{ fontSize: 15 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.regBtmSection}>
                    <Text style={styles.regBtmSection.text1}>Sign up</Text>
                    <TouchableOpacity style={styles.regBtmSection.button} onPress={_signUpCheck}>
                        <Fontisto name="arrow-right-l" color='#FFFFFF' size={fontSize.h1} />
                    </TouchableOpacity>
                </View>
                <View style={styles.loginFooter}>
                    <Text style={styles.loginFooter.textLeft}>Already Have Account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginFooter.textRight}>Login</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </ScrollView>
    )

}
export default Register;