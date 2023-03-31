import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import styles from "./styles";
import { boxHeader1, shadowStyle } from "../../values/BKStyles";
import { GET_GIFTS, IMAGE_BASE_PATH } from "../../../config/ApiConfig";
import { GetApiFetch } from "../../../config/CommonFunction";

function GiftsArea({ navigation }) {
    // const [popularCategory, setPopularCategory] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _getGifts = async () => {
        let params = '';

        GetApiFetch(GET_GIFTS, params)
            .then(([status, response]) => {
                if (status == 200) {
                    console.log('_getGifts', response);
                    setGifts(response.gift_list)
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
        _getGifts();
    }, [navigation]);

    const SliderItem = ({ item, navigation }) => {
        return (
            <View style={styles.brandsSliderText}>
                <ImageBackground
                    // borderRadius={20}
                    resizeMode="cover"
                    style={styles.brandsSlider}
                    source={{ uri: IMAGE_BASE_PATH + item.image_path }}
                />
                <View>
                <Text>{item.gift_title}</Text>
                </View>
                <Text>₹ {item.amount_from + '-' + item.amount_to}</Text>
                
            </View>

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
                    <Text style={boxHeader1.text}>Gifts for every purchase</Text>
                </View>
                {gifts.length > 0 &&
                    <ScrollView horizontal={true} ScrollIndicator={false} >
                        {gifts.map((item, key) => (
                            <SliderItem navigation={navigation} item={item} key={key} />


                        ))}
                    </ScrollView>
                }

            </View>
        )
    }

}
export default GiftsArea;