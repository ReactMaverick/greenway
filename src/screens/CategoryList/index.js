import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader } from "../../common/values/BKStyles";
import { fontSize } from "../../common/values/BKStyles";
import SingleCategory from "../../common/components/category/SingleCategory";
import { GET_ALL_CATEGORY_API, IMAGE_BASE_PATH } from "../../config/ApiConfig";
import { GetApiFetch } from "../../config/CommonFunction";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomStatusBar from "../../common/components/statusbar";

function CategoryList({ navigation }) {
    const [popularCategory, setPopularCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _getPopularCategory = async () => {
        let params = '';

        GetApiFetch(GET_ALL_CATEGORY_API, params)
            .then(([status, response]) => {
                if (status == 200) {
                    console.log('_getPopularCategory', response.allCategory);
                    setPopularCategory(response.allCategory)
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
        _getPopularCategory();
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
                        <Text style={pageHeader.text}>Choose Category</Text>
                        <View style={{ width: wp('10%') }}></View>
                    </View>
                    <ScrollView>
                        <View style={styles.categoryContainer}>
                            {popularCategory.map((item, key) => (

                                <SingleCategory navigation={navigation} index={key} item={item} key={key} />

                            ))}
                        </View>
                    </ScrollView>

            </SafeAreaView>
        )
    }

}
export default CategoryList;