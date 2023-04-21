import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { pageContainerStyle, pageHeader, inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize,placeHolderColor } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import CustomStatusBar from "../../common/components/statusbar";


function ResetPassword({ navigation }) {
    //   useEffect(() => {}, [navigation]);

    return (
        <SafeAreaView style={pageContainerStyle}>
            <CustomStatusBar/>
            <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Forget Password</Text>
                <View></View>
            </View>
            <View style={styles.fpContainer}>
                <View style={styles.rpTopSection}>
                    <Text style={styles.rpTopSection.text1}>Reset your password</Text>
                    <Text style={styles.rpTopSection.text2}>Please enter your number. We will send a code</Text>
                    <Text style={styles.rpTopSection.text2}>to your phone to reset your password.</Text>
                </View>
                <View style={inputContainer}>
                    <Text style={inputLevel}>Phone Number</Text>
                    <TextInput
                        placeholder={'phone number'}
                        placeholderTextColor={placeHolderColor}
                        style={textInput}
                        key='phonenumber'
                    // secureTextEntry={passwordEye}
                    // onChangeText={(password) => setPassword(password)}
                    // onFocus={() => {
                    //   setErrorMessage('')
                    // }}
                    />
                </View>
                <TouchableOpacity style={activeButton.button}>
                    <Text style={activeButton.text}>Send me a link</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )

}
export default ResetPassword;