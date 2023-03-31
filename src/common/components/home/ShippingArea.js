import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image } from 'react-native';
import styles from "./styles";
import { boxHeader1, shadowStyle } from "../../values/BKStyles";
import { GET_SHIPPING_AREA, IMAGE_BASE_PATH } from "../../../config/ApiConfig";
import { GetApiFetch } from "../../../config/CommonFunction";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


function ShippingArea({ navigation }) {
    const [shippingArea, setShippingArea] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const _getShippingArea = async () => {
        let params = '';

        GetApiFetch(GET_SHIPPING_AREA, params)
            .then(([status, response]) => {
                if (status == 200) {
                    console.log('response', response);
                    setShippingArea(response.FooterBanner);
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
        _getShippingArea()
    }, [navigation]);

    // const SliderItem = ({ item, navigation }) => {
    //     return (
    //         <TouchableOpacity onPress={() =>
    //             navigation.navigate('ProductList', {
    //                 categorySlug: item.slug
    //             })
    //         }>
    //             <ImageBackground
    //                 // borderRadius={20}
    //                 resizeMode="cover"
    //                 style={styles.brandsSlider}
    //                 source={{ uri: item.imgpath }}
    //             />
    //         </TouchableOpacity>
    //     );
    // };
    if (isLoading) {
        return (
            <></>
        )
    } else {
        return (
            // <View style={styles.brandsContainer}>

            // </View>
            <View style={styles.shippingArea}>
                {shippingArea.map((item, key) => (
                    <View key={key} style={styles.shippingAreaContent}>
                        <View style={styles.shippingAreaImg}>
                        <Image
                            source={{ uri: IMAGE_BASE_PATH + item.path }} resizeMode="cover" style={{height: wp('15%'), width: wp('15%')}}/>
                        </View>
                        <View style={styles.shipping_content}>
                            <Text>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </View>
                    </View>
                ))}



            </View>
        )
    }

}
export default ShippingArea;