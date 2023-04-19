import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, ImageBackground, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_BLOG_LIST_API, IMAGE_BASE_PATH } from "../../config/ApiConfig";
import { GetApiFetch, TrimString } from "../../config/CommonFunction";
import CustomStatusBar from "../../common/components/statusbar";

function Blogs({ navigation }) {
    const [blogData, setBlogData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const regex = /(<([^>]+)>)/ig;
    const secondRegEx = /((&nbsp;))*/gmi;

    const _getBlogList = async () => {
        let params = '';
        GetApiFetch(GET_BLOG_LIST_API, params)
            .then(([status, response]) => {
                console.log(status, response);
                if (status == 200) {
                    setBlogData(response.blogs.news_data)
                    // setCategory(response.news_categories)
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
        _getBlogList();
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
                    <Text style={pageHeader.text}>Blogs</Text>
                    <View style={{ width: wp('10%') }}></View>
                </View>
                {blogData.length > 0 ?
                    <ScrollView style={{ marginBottom: hp('10%') }} showsVerticalScrollIndicator={false} >
                        {blogData.map((item, key) => (
                            <TouchableOpacity style={styles.blogsSec} key={key} onPress={() => {
                                navigation.navigate('BlogDetails', {
                                    blogDetailsId: item.news_id
                                })
                            }}>
                                <ImageBackground source={{ uri: IMAGE_BASE_PATH + item.image_path }} resizeMode='cover' style={styles.bannerImage} />
                                <View>

                                    <Text style={styles.aboutUsHeading}>{item.news_name}</Text>
                                    <Text style={styles.aboutUsDesc}>{item.news_description = ! null ? TrimString(((item.news_description).replace(regex, '')).replace(secondRegEx, ''), 100) : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                    :
                    <View>

                    </View>
                }

            </SafeAreaView>

        )
    }

}
export default Blogs;