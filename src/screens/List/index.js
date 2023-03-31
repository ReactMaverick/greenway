import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as dp } from "react-native-responsive-screen";
function List({ navigation }) {
    //   useEffect(() => {}, [navigation]);
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#2E2E2E', fontSize: 16, margin: 10 }}>All Pages Links</Text>
            <ScrollView style={{ marginBottom: hp('10%') }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Home')}>
                    <Text >Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Login')}>
                    <Text >Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Register')}>
                    <Text >Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('OtpVerification')}>
                    <Text >OtpVerification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('ResetPassword')}>
                    <Text >ResetPassword</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('ProductList')}>
                    <Text >ProductList</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('ProductDetails')}>
                    <Text >ProductDetails</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('CategoryList')}>
                    <Text >CategoryList</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Cart')}>
                    <Text >Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('AboutUs')}>
                    <Text >AboutUs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('ContactUs')}>
                    <Text >ContactUs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('PrivacyPolicy')}>
                    <Text >PrivacyPolicy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('TermsAndConditions')}>
                    <Text >TermsAndConditions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Faq')}>
                    <Text >Faq</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('MyProfile')}>
                    <Text >MyProfile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('MyAccount')}>
                    <Text >MyAccount</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('MyOrders')}>
                    <Text >MyOrders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('OrderDetails')}>
                    <Text >OrderDetails</Text>
                </TouchableOpacity>
            <TouchableOpacity style={{ fontSize:13, margin:8}} onPress={() => navigation.navigate('MyAddress')}>
                <Text >My Address</Text>
            </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Wishlist')}>
                    <Text >Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Blogs')}>
                    <Text >Blogs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('BlogDetails')}>
                    <Text >BlogDetails</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ fontSize: 13, margin: 8 }} onPress={() => navigation.navigate('Checkout')}>
                    <Text >Checkout</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )

}
export default List;