import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import styles from "./styles";
import { boxHeader1, shadowStyle } from "../../values/BKStyles";

function Brands({ navigation }) {
    //   useEffect(() => {}, [navigation]);
    const SliderItem = ({ item, navigation }) => {
        return (
            <TouchableOpacity>
                <ImageBackground
                    // borderRadius={20}
                    resizeMode="cover"
                    style={styles.brandsSlider}
                    source={{ uri: "https://i.ytimg.com/vi/H01OfnqxtaY/maxresdefault.jpg" }}
                />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.brandsContainer}>
            <View style={boxHeader1}>
                <Text style={boxHeader1.text}>Top Brands</Text>
                <Text style={boxHeader1.text}>View All</Text>
            </View>
            <ScrollView horizontal={true} ScrollIndicator={false} >
                <SliderItem navigation={navigation} />
                <SliderItem navigation={navigation} />
                <SliderItem navigation={navigation} />
                <SliderItem navigation={navigation} />
            </ScrollView>
        </View>

    )

}
export default Brands;