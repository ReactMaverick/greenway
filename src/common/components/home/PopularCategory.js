import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import styles from "./styles";
import { boxHeader1, shadowStyle } from "../../values/BKStyles";
import { GET_ALL_CATEGORY_API, IMAGE_BASE_PATH } from "../../../config/ApiConfig";
import { GetApiFetch } from "../../../config/CommonFunction";

function PopularCategory({ navigation, refreshing, stopRefreshing }) {
    const [popularCategory, setPopularCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _getPopularCategory = async () => {
        let params = '';
        GetApiFetch(GET_ALL_CATEGORY_API, params)
            .then(([status, response]) => {
                if (status == 200) {
                    // console.log('_getPopularCategory', response.allCategory);
                    setPopularCategory(response.allCategory)
                } else {
                    console.log('Something went wrong');
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false)
                stopRefreshing()
            });
    };
    useEffect(() => {
        if(refreshing){
            _getPopularCategory();
        }
    }, [navigation, refreshing]);

    const SliderItem = ({ item, navigation }) => {
        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate('ProductList', {
                    categorySlug: item.slug
                })
            }>
                <ImageBackground
                    // borderRadius={20}
                    resizeMode="cover"
                    style={styles.brandsSlider}
                    source={{ uri: item.imgpath }}
                />
                <Text style={{alignSelf: 'center'}}>{item.name}</Text>
            </TouchableOpacity>
        );
    };
    if (isLoading) {
        return (
            <></>
        )
    } else {
        return (
            <View style={styles.brandsContainer}>
                <View style={boxHeader1}>
                    <Text style={boxHeader1.text}>Popular Category</Text>
                    <TouchableOpacity onPress={() => 
                        navigation.navigate('CategoryList')
                    }>
                    <Text style={boxHeader1.text2}>View All</Text>
                    </TouchableOpacity>
                    
                </View>
                {popularCategory.length > 0 &&
                    <ScrollView horizontal={true} ScrollIndicator={false} >
                        {popularCategory.map((item, key) => (
                                <SliderItem navigation={navigation} item={item} key={key}  />
                            
                            
                        ))}
                    </ScrollView>
                }

            </View>
        )
    }

}
export default PopularCategory;