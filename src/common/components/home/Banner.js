import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import styles from "./styles";
import { boxHeader1 } from "../../values/BKStyles";
import { GET_BANNERS, IMAGE_BASE_PATH } from "../../../config/ApiConfig";
import { GetApiFetch } from "../../../config/CommonFunction";

function Banner({ navigation }) {
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _getBanners = async () => {
        let params = '';

        GetApiFetch(GET_BANNERS, params)
            .then(([status, response]) => {
                if (status == 200) {
                    console.log('_getBanners', response);
                    setBanners(response.Banners1)
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
        _getBanners();
    }, [navigation]);
    const SliderItem = ({ navigation, item }) => {
        // console.log("item ", item)

        return (
            <TouchableOpacity onPress={() => {
                if (item.product_exist != undefined && item.product_exist == "Yes") {
                    // console.log('ProductList')
                    navigation.navigate('ProductList', {
                        urlSlug2: item.url_slug
                    })
                }
            }}>
                <ImageBackground
                    // borderRadius={20}
                    resizeMode="cover"
                    style={styles.bannerSlider}
                    source={{ uri: IMAGE_BASE_PATH + item.path }}
                />
            </TouchableOpacity>
        );
    };
    if (isLoading) {
        return (
            <></>
        )
    } else {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {banners.length > 0 &&
                    // <ScrollView horizontal={true} ScrollIndicator={false} >
                    //     {banners.map((item, key) => (
                    //         <SliderItem navigation={navigation} item={item} key={key} />
                    //     ))}
                    // </ScrollView>
                    banners.map((item, key) => (
                        <SliderItem navigation={navigation} item={item} key={key} />
                    ))
                }

            </View >

        )
    }


}
export default Banner;