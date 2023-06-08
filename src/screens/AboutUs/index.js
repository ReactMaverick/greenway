import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { pageContainerStyle,pageContainerStyle2 } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_ABOUT_US_API, IMAGE_BASE_PATH, BASE_URL } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";
import CustomStatusBar from "../../common/components/statusbar";


function AboutUs({ navigation }) {
    const [aboutUs, setAboutUs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&#39;))*/gmi;
    const ThirdRegEx = /((&nbsp;))*/gmi;

    const _getAboutUsData = async () => {
        let params = '';
        GetApiFetch(GET_ABOUT_US_API, params)
            .then(([status, response]) => {
                // console.log(status, response);
                if (status == 200) {
                    // console.log("response=>", response);
                    setAboutUs(response.aboutUsDetails)

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

        _getAboutUsData();

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

            <SafeAreaView style={pageContainerStyle2}>
                <CustomStatusBar/>
                <View style={pageHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                    </TouchableOpacity>
                    <Text style={pageHeader.text}>About Us</Text>
                    <View></View>
                </View>
                {/* <Image
                source={require('../../assets/images/about-us-banner-img.jpg')}
                style={styles.itemImage}
            /> */}
                <ImageBackground source={{ uri: IMAGE_BASE_PATH + aboutUs.path }} resizeMode='cover' style={styles.bannerImage} />
                <View style={{ paddingHorizontal: wp('3%') }}>

                    {/* <Text style={styles.aboutUsHeading}>What is Lorem Ipsum?</Text> */}
                    <Text style={styles.aboutUsDesc}>{aboutUs.cms_text != null ? (((aboutUs.cms_text).replace(regex, '')).replace(secondRegEx, '')).replace(ThirdRegEx, '') : ''}</Text>
                </View>
            </SafeAreaView>

        )
    }

}
export default AboutUs;