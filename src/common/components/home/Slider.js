import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatListSlider } from "react-native-flatlist-slider";
import { GET_SLIDERS } from "../../../config/ApiConfig";

function Slider({ navigation }) {
    const [sliders, setSliders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const _getSliders = () => {

        fetch(GET_SLIDERS, {
            method: "get",
        }).then((response) => {

            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        }).then(([status, response]) => {
            if (status == 200) {
                // console.log("_getSliders", response.sliders)
                setSliders(response.sliders)
            } else {
                console.log(status, response)
            }
        })
            .catch((error) => console.log("error1", error))
            .finally(() => {
                setIsLoading(false)
            });
    }
    useEffect(() => {

        _getSliders();
    }, [navigation]);
    
    const SliderItem = ({ item, key, navigation }) => {
        // console.log("item ", item)
        return (
            <TouchableOpacity key={key} onPress={()=>{
                if(item.category_exist != undefined && item.category_exist == "Yes"){
                    console.log('CategoryList')
                    navigation.navigate('CategoryList',{
                        urlSlug : item.url_slug
                    })
                }else if(item.product_exist != undefined && item.product_exist == "Yes"){
                    console.log('ProductList')
                    navigation.navigate('ProductList',{
                        urlSlug2 : item.url_slug
                    })
                }
            }}>
                <ImageBackground
                    borderRadius={20}
                    resizeMode="cover"
                    style={styles.imageSlider}
                    source={{ uri: item.path }}
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
            <>
                {sliders.length > 0 &&
                    <FlatListSlider
                        data={sliders}
                        component={<SliderItem navigation={navigation} />}
                        indicator={false}
                        timer={10000}
                        loop={true}
                    />
                }
            </>

        )
    }


}
export default Slider;