import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_PRIVACY_POLICY_API } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";


function PrivacyPolicy({ navigation }) {
    const [privacyPolicy, setPrivacyPolicy] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&#39;))*/gmi;
    const ThirdRegEx = /((&nbsp;))*/gmi;

    const _getPrivacyPolicy = async () => {
        let params = '';
        GetApiFetch(GET_PRIVACY_POLICY_API, params)
            .then(([status, response]) => {
                // console.log(status, response);
                if (status == 200) {
                    // console.log("response=>", response);
                    setPrivacyPolicy(response.privacyPolicyDetails)

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
        _getPrivacyPolicy();
      }, [navigation]);
      if (isLoading) {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={BKColor.textColor2} />
                </View>
            </>
        )
    } else {
    return (

        <View style={pageContainerStyle}>
            <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Privacy Policy</Text>
                <View></View>
            </View>
            
            <View style={{paddingHorizontal:wp('3%')}}>

            {/* <Text style={styles.aboutUsHeading}>Privacy Policy What is Lorem Ipsum?</Text> */}
            <Text style={styles.aboutUsDesc}>{privacyPolicy.cms_text != null ? (((privacyPolicy.cms_text).replace(regex, '')).replace(secondRegEx, '')).replace(ThirdRegEx, '') : ''}</Text>
            </View>
        </View>

    )
    }

}
export default PrivacyPolicy;