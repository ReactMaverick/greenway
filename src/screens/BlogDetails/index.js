import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { commonStyle, pageContainerStyle, pageContainerStyle2 } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_BLOG_DETAILS_API, IMAGE_BASE_PATH } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";
import CustomStatusBar from "../../common/components/statusbar";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { platform } from "../../common/values/BKConstants";


function BlogDetails({ navigation, route }) {
    const [blogDetails, setBlogDetails] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { blogDetailsId } = route.params;
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&nbsp;))*/gmi;

    const _getBlogDetails = async () => {
        let params = '?blog_id=' + blogDetailsId;

        GetApiFetch(GET_BLOG_DETAILS_API, params)
            .then(([status, response]) => {
                if (status == 200) {
                    // console.log('response==>', response);
                    setBlogDetails(response.blogDetails[0])
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
        _getBlogDetails();
    }, [navigation]);

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomStatusBar />
                <ActivityIndicator size="large" color={BKColor.textColor2} />
            </SafeAreaView>
        )
    } else {
        return (
            <KeyboardAvoidingView
                behavior={platform === 'ios' ? 'padding' : 'height'}
                style={commonStyle.keyboardAvoidingView}>
                <SafeAreaView style={pageContainerStyle2}>
                    <CustomStatusBar />
                    <View style={pageHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                        </TouchableOpacity>
                        <Text style={pageHeader.text}>Blog Details</Text>
                        <View style={{ width: wp('10%') }}></View>
                    </View>
                    {/* <Image
                    source={require('../../assets/images/about-us-banner-img.jpg')}
                    style={styles.itemImage}
                /> */}

                    <ImageBackground source={{ uri: IMAGE_BASE_PATH + blogDetails.image }} resizeMode='cover' style={styles.bannerImage} />
                    <View style={{ paddingHorizontal: wp('3%') }}>
                        <Text style={styles.aboutUsHeading}>{blogDetails.news_name}</Text>
                        <Text style={styles.aboutUsDesc}>{blogDetails.news_description != null ? ((blogDetails.news_description).replace(regex, '')).replace(secondRegEx, '') : ''}</Text>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        )
    }


}
export default BlogDetails;