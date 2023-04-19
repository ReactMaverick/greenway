import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import Accordion from "../../common/components/accordion/Accordion";
import { GET_FAQ_API, BASE_URL } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";
import { TrimString } from "../../config/CommonFunction";
import CustomStatusBar from "../../common/components/statusbar";


function Faq({ navigation }) {
    const [faq, setFaq] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&#39;))*/gmi;
    const ThirdRegEx = /((&nbsp;))*/gmi;

    const _getFaq = async () => {
        let params = '';
        GetApiFetch(GET_FAQ_API, params)
            .then(([status, response]) => {
                // console.log(status, response);
                if (status == 200) {
                    // console.log("response=>", response);
                    setFaq(response.faq_list)

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
        _getFaq();
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
                    <Text style={pageHeader.text}>Faq</Text>
                    <View></View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: hp('6%'), }}>
                    <View style={{ paddingHorizontal: wp('3%') }}>

                        <Text style={styles.aboutUsHeading}>Below are frequently asked questions, you may find the answer for yourself</Text>
                    </View>
                    {faq.map((item, key) => (
                        <Accordion key={key} heading={item.faq_title} details={item.faq_desc != null ? (((item.faq_desc).replace(regex, '')).replace(secondRegEx, '')).replace(ThirdRegEx, '') : ''} />
                    ))}

                </ScrollView>
            </SafeAreaView>

        )
    }

}
export default Faq;