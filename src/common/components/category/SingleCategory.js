import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatListSlider } from "react-native-flatlist-slider";
import { BKColor } from "../../values/BKColor";
import { fontSize } from "../../values/BKStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

function SingleCategory({ navigation, index, item }) {
    // console.log('item', item);
    return (
        <TouchableOpacity key={index} onPress={() => {
            navigation.navigate('ProductList', {
                categorySlug: item.slug
            })
        }}>
            <View style={styles.singleCategoryContainer}>
                <View style={styles.categoryContainerSec}>
                    <Image
                        source={{ uri: item.imgpath }}
                        style={styles.singleCategoryContainer.itemImage}
                    />
                    <Text style={styles.singleCategoryContainer.itemText}>{item.name}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )

}
export default SingleCategory;