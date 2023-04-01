import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from "./styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { pageContainerStyle } from "../../common/values/BKStyles";
import { pageHeader, fontSize, activeButton, passiveButton } from "../../common/values/BKStyles";
import { BKColor } from "../../common/values/BKColor";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { inputContainer, textInput } from "../../common/values/BKStyles";
import { GET_WISHLIST_API, IMAGE_BASE_PATH, POST_DELETE_WISHLIST_API } from "../../config/ApiConfig";
import { GetApiFetch, PostApiFetch } from "../../config/CommonFunction";
import { useDispatch, useSelector } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import { addToCart } from "../../config/CommonFunction";


function Wishlist({ navigation }) {
    // const [wishlistData, setWishlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { wishlistData } = useSelector((state) => state.WishlistReducer);
    const { userData } = useSelector((state) => state.UserReducer);
    // console.log('userData==>', userData)

    const _getWishlist = async () => {
        setIsLoading(true)
        // let params = '?customers_id=9';
        let params = '';
        if (userData != null) {
            params = '?customers_id=' + userData.id;
        }

        GetApiFetch(GET_WISHLIST_API, params)
            .then(([status, response]) => {
                if (status == 200) {
                    // console.log('result', response.result)
                    // setWishlistData(response.result);
                    if (response.result.length > 0) {
                        dispatch({
                            type: 'setWishlistData',
                            payload: response.result
                        });
                    } else {
                        dispatch({
                            type: 'setWishlistData',
                            payload: null
                        });
                    }
                } else {
                    console.log('Something went wrong');
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                setIsLoading(false)
            });
    };

    const _deleteWishlist = (item) => {
        const formData = new FormData();
        formData.append('customers_id', userData.id);
        formData.append('products_id', item.products_id);
        formData.append('products_attributes_prices_id', item.products_attributes_prices_id);

        console.log('formData ==>', formData)
        PostApiFetch(POST_DELETE_WISHLIST_API, formData)
            .then(([status, response]) => {
                // console.log(' delete wishlist response =>', response)
                if (status == 200) {
                    // console.log("Wishlist item deleted successfully.");

                    if (response.status == true) {
                        if (response.wishlist_data.length > 0) {

                            dispatch({
                                type: 'setWishlistData',
                                payload: response.wishlist_data
                            });

                            // showMessage({
                            //     message: "Wishlist item deleted successfully",
                            //     type: "info",
                            //     backgroundColor: "#808080",
                            // })
                        } else {
                            dispatch({
                                type: 'setWishlistData',
                                payload: null
                            });
                        }


                    }
                } else {
                    console.log('Something went wrong');

                }
            })
            .catch(error => console.log(error))
            .finally(() => {

            });
    }
    useEffect(() => {
        _getWishlist();
    }, [navigation]);

    if (isLoading) {
        return (
            <>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={BKColor.textColor2} />
                </View>
            </>
        )
    } else {
        return (

            <View style={pageContainerStyle}>
                <View style={pageHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                    </TouchableOpacity>
                    <Text style={pageHeader.text}>Wishlist</Text>
                    <View style={{ width: wp('10%') }}></View>
                </View>
                {wishlistData != null ?

                    <ScrollView style={{ marginBottom: hp('10%') }} showsVerticalScrollIndicator={false} >
                        {wishlistData.map((item, key) => (

                            <View style={styles.cartDetailsSec} key={key}>
                                <View style={styles.cartImgSec}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate(
                                            // console.log('ProductDetailsId',item.products_slug)
                                            'ProductDetails', {
                                            preUrl: 'SingleProduct',
                                            productsSlug: item.products_slug,
                                            productsAttributes: item.attributes,
                                        }
                                        )
                                    }}>
                                        <Image
                                            source={{ uri: IMAGE_BASE_PATH + item.image_path }}
                                            style={styles.itemImage}
                                        />
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.cartDecSec}>
                                    <Text style={styles.cartDecHeading}>{item.products_name}</Text>
                                    <Text style={styles.cartAttr}>{item.attributes[0].values1[0].value}</Text>
                                    <Text style={styles.cartPrice}>Rs {item.discounted_price}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        // _deleteWishlist(item);
                                        if (item.defaultStock > 0) {
                                            userData != null &&
                                                addToCart(item.products_id, '', userData.id, '', '', item.attributes_ids).then(([status, response]) => {
                                                    // console.log("add to cart ==>>>", response.status, response)
                                                    if (status == 200) {
                                                        if (response.status === true) {
                                                            dispatch({ type: 'setCartData', payload: response.cart })
                                                            _deleteWishlist(item);
                                                            showMessage({
                                                                message: "This product is added to cart.",
                                                                type: "info",
                                                                backgroundColor: "#808080",
                                                            })
                                                        } else {
                                                            // console.log(response.status, response)
                                                            showMessage({
                                                                message: response.message,
                                                                type: "info",
                                                                backgroundColor: "#808080",
                                                            })
                                                        }
                                                    }
                                                })
                                        } else {
                                            showMessage({
                                                message: "this product is out of stock",
                                                type: "info",
                                                backgroundColor: "#808080",
                                            })
                                            // console.log("this product is out of stock.");
                                        }
                                    }}>
                                        <View style={styles.cartDltSec}>
                                            <AntDesign name="shoppingcart" style={styles.cartDltIcon} color={BKColor.textColor2} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        _deleteWishlist(item);
                                    }}>
                                        <View style={styles.cartDltSec}>
                                            <Feather name="trash" style={styles.cartDltIcon} color={BKColor.textColor2} />
                                        </View>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        ))}


                    </ScrollView>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: hp('15%') }}>
                        <Text style={[styles.totalItemHeading, { fontWeight: '700' }]}>Your wishlist is empty</Text>
                        <Text style={[styles.totalItemHeading, { textAlign: 'center' }]}>Looks like you haven't added anything to your wishlist yet</Text>
                    </View>
                }

            </View>

        )
    }

}
export default Wishlist;