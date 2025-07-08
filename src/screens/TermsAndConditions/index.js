import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyle, pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_TERMS_AND_CONDITON_API } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";
import CustomStatusBar from "../../common/components/statusbar";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { platform } from "../../common/values/BKConstants";

function TermsAndConditions({ navigation }) {
    const [termsAndConditions, setTermsAndConditions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&#39;))*/gmi;
    const ThirdRegEx = /((&nbsp;))*/gmi;

    const _getTermsAndConditions = async () => {
        let params = '';
        GetApiFetch(GET_TERMS_AND_CONDITON_API, params)
            .then(([status, response]) => {
                // console.log(status, response);
                if (status == 200) {
                    console.log("response=>", response);
                    setTermsAndConditions(response.termsDetails)

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
        _getTermsAndConditions();
    }, [navigation]);

    if (isLoading) {
        return (
            <>
                <KeyboardAvoidingView
                    behavior={platform === 'ios' ? 'padding' : 'height'}
                    style={commonStyle.keyboardAvoidingView}>
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomStatusBar />
                        <ActivityIndicator size="large" color={BKColor.textColor2} />
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </>
        )
    } else {
        return (
            <KeyboardAvoidingView
                behavior={platform === 'ios' ? 'padding' : 'height'}
                style={commonStyle.keyboardAvoidingView}>
                <SafeAreaView style={pageContainerStyle}>
                    <CustomStatusBar />
                    <View style={pageHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                        </TouchableOpacity>
                        <Text style={pageHeader.text}>Terms And Conditions</Text>
                        <View></View>
                    </View>
                    {/* <Image
                source={require('../../assets/images/about-us-banner-img.jpg')}
                style={styles.itemImage}
            /> */}
                    {/* <ImageBackground source={require('../../assets/images/about-us-banner-img.jpg')} resizeMode= 'cover' style={styles.bannerImage} /> */}
                    <View style={{ paddingHorizontal: wp('3%') }}>

                        {/* <Text style={styles.aboutUsHeading}>Terms & Conditions What is Lorem Ipsum?</Text> */}
                        <Text style={styles.aboutUsDesc}>{termsAndConditions.cms_text != null ? (((termsAndConditions.cms_text).replace(regex, '')).replace(secondRegEx, '')).replace(ThirdRegEx, '') : ''}</Text>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }

}
export default TermsAndConditions;