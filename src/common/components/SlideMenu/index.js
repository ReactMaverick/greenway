import React, { useState, useEffect } from "react";
import { View, ScrollView, SafeAreaView, Image, Text, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSelector, useDispatch } from "react-redux";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { logOut } from '../../../redux/reducers/UserReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';
function SlideMenu({ navigation }) {
    const dispatch = useDispatch();
    // const userDetails = useSelector(state => state.userReducer.value);
    const userData = useSelector(state => state.UserReducer.value);
    const isDrawerOpen = useDrawerStatus()
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
    }, [navigation, isDrawerOpen]);

    return (
        <ScrollView style={styles.outerMenu}>
            {userData != null &&
                <View style={styles.headerSection}>
                    <Image
                        source={require('../../../assets/images/header-logo.png')} resizeMode='cover'
                        style={styles.headerImage}

                    />
                    <Text style={styles.headerText}>{userData.first_name}</Text>
                </View>
            }

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('ProductList');
            }} style={[styles.menuItem, { marginTop: hp('1.5%'), }]}>
                <Entypo name="shop" style={styles.menuIcon} />
                <Text style={styles.menuText}>Shop</Text>
            </TouchableOpacity>
            {userData != null ?
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    navigation.navigate('Wishlist');
                }} style={styles.menuItem}>
                    <MaterialCommunityIcons name="heart-plus-outline" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Wishlist</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    navigation.navigate('Login');
                }} style={styles.menuItem}>
                    <MaterialCommunityIcons name="heart-plus-outline" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Wishlist</Text>
                </TouchableOpacity>
            }


            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Blogs');
            }} style={styles.menuItem}>
                <MaterialCommunityIcons name="post-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Blogs</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('PrivacyPolicy');
            }} style={styles.menuItem}>
                <MaterialCommunityIcons name="script-text-key-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('TermsAndConditions');
            }} style={styles.menuItem}>
                <MaterialCommunityIcons name="text-box-check-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Terms and Conditions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('Faq');
            }} style={styles.menuItem}>
                <Ionicons name="ios-chatbubbles-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Frequently asked questions</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('ContactUs');
            }} style={styles.menuItem}>
                <Ionicons name="call-outline" style={styles.menuIcon} />
                <Text style={styles.menuText}>Contact Us</Text>
            </TouchableOpacity>

            

            <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())
                navigation.navigate('AboutUs');
            }} style={[styles.menuItem, { marginTop: 0, }]}>
                <FontAwesome name="users" style={styles.menuIcon} />
                <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>

            {userData != null ?
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    // dispatch({ type: 'setUserData', payload: null })
                    // dispatch({ type: 'setCartData', payload: null })
                    // dispatch({ type: 'setWishlistData', payload: null })
                    // dispatch({ type: 'setCouponDetails', payload: null })
                    // navigation.navigate('Login')
                    dispatch(logOut());

                }} style={styles.menuItem}>
                    <MaterialIcons name="logout" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Log Out</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer())
                    navigation.navigate('Login');
                }} style={styles.menuItem}>
                    <MaterialIcons name="logout" style={styles.menuIcon} />
                    <Text style={styles.menuText}>Log In</Text>
                </TouchableOpacity>
            }


        </ScrollView>
    )

}



export default SlideMenu;