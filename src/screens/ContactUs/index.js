import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator,SafeAreaView } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { pageContainerStyle, pageHeader, placeHolderColor } from "../../common/values/BKStyles";
import { inputLevel, inputBottomLevel, textInput, inputContainer, activeButton, fontSize } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { GET_CONTACT_US_API, POST_CONTACT_US_MESSAGE_API } from "../../config/ApiConfig";
import { GetApiFetch, PostApiFetch } from "../../config/CommonFunction";
import { showMessage, hideMessage } from "react-native-flash-message";
import CustomStatusBar from "../../common/components/statusbar";

function ContactUs({ navigation }) {
    const [contactUs, setContactUs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [showError, setShowError] = useState(false);
    const [fieldError, setFieldError] = useState("");

    const submitMessage = async () => {
        if (name == "") {
            showMessage({
                message: "please enter your name!!",
                type: "info",
                backgroundColor: "#EC1F25",
            })
        } else if (email == "") {
            showMessage({
                message: "please enter your email!!",
                type: "info",
                backgroundColor: "#EC1F25",
            })

        } else {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('subject', subject);
            formData.append('message', message);
            // console.log('formData ', formData)
            PostApiFetch(POST_CONTACT_US_MESSAGE_API, formData)
                .then(([status, response]) => {
                    if (status == 200) {
                        // console.log("response==>", response)
                        setName('');
                        setEmail('');
                        setPhone('');
                        setSubject('');
                        setMessage('');

                        showMessage({
                            message: "Your Request Submitted",
                            type: "info",
                            backgroundColor: "green",
                        })
                    }
                });

        }
    }
    const _getContact = async () => {
        let params = '';
        GetApiFetch(GET_CONTACT_US_API, params)
            .then(([status, response]) => {
                // console.log(status, response);
                if (status == 200) {
                    // console.log("response=>", response);
                    setContactUs(response.contactDetails)

                } else {
                    console.log('Something went wrong');
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false)
            });
    };

    useEffect(() => {
        _getContact();
    }, [navigation]);

    if (isLoading) {
        return (
            <>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomStatusBar/>
                    <ActivityIndicator size="large" color={BKColor.textColor2} />
                </SafeAreaView>
            </>
        )
    } else {
        return (
            <SafeAreaView style={pageContainerStyle}>
                <CustomStatusBar/>
                <View style={pageHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                    </TouchableOpacity>
                    <Text style={pageHeader.text}>Contact Us</Text>
                    <View></View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >


                    <View style={styles.contactUsSec}>
                        <FontAwesome name="fax" color={BKColor.textColor1} size={fontSize.h2} />
                        <Text style={styles.contactUsText}>Address : {contactUs.contact_us_address}</Text>
                    </View>
                    <TouchableOpacity style={styles.contactUsSec}>
                        <FontAwesome name="phone" color={BKColor.textColor1} size={fontSize.h2} />
                        <Text style={styles.contactUsText}> {contactUs.contact_us_phone}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactUsSec}>
                        <FontAwesome name="envelope-o" color={BKColor.textColor1} size={fontSize.h2} />
                        <Text style={styles.contactUsText}> {contactUs.contact_us_email}</Text>
                    </TouchableOpacity>
                    <View style={inputContainer}>
                        <Text style={inputLevel}>Your Name *</Text>
                        <TextInput
                            placeholder={'Name'}
                            placeholderTextColor={placeHolderColor}
                            style={textInput}
                            onChangeText={(value) => setName(value)}
                            value={name}
                        // onFocus={() => {
                        //   setErrorMessage('')
                        // }}
                        />
                    </View>

                    <View style={inputContainer}>
                        <Text style={inputLevel}>Your Email *</Text>
                        <TextInput
                            placeholder={'Email'}
                            placeholderTextColor={placeHolderColor}
                            style={textInput}
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                        // onFocus={() => {
                        //   setErrorMessage('')
                        // }}
                        />
                    </View>
                    <View style={inputContainer}>
                        <Text style={inputLevel}>Your Phone</Text>
                        <TextInput
                            placeholder={'Number'}
                            placeholderTextColor={placeHolderColor}
                            style={textInput}
                            onChangeText={(value) => setPhone(value)}
                            value={phone}
                        // onFocus={() => {
                        //   setErrorMessage('')
                        // }}
                        />
                    </View>
                    <View style={inputContainer}>
                        <Text style={inputLevel}>Subject *</Text>
                        <TextInput
                            placeholder={'Subject'}
                            placeholderTextColor={placeHolderColor}
                            style={textInput}
                            onChangeText={(value) => setSubject(value)}
                            value={subject}
                        // onFocus={() => {
                        //   setErrorMessage('')
                        // }}
                        />
                    </View>
                    <View style={inputContainer}>
                        <Text style={inputLevel}>Your Message *</Text>
                        <TextInput
                            multiline={true}
                            placeholder={'Message'}
                            placeholderTextColor={placeHolderColor}
                            onChangeText={(value) => setMessage(value)}
                            value={message}
                            numberOfLines={10}
                            style={[textInput, { height: 200, textAlignVertical: 'top', }]} />
                    </View>
                    <TouchableOpacity onPress={submitMessage} style={[activeButton.button, { marginBottom: hp('10%') }]}>
                        <Text style={activeButton.text} >Send</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }

}
export default ContactUs;