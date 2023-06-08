import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatListSlider } from 'react-native-flatlist-slider';
import { BKColor } from '../../values/BKColor';
import { fontSize } from '../../values/BKStyles';
import { TrimString } from '../../../config/CommonFunction';
import { IMAGE_BASE_PATH } from '../../../config/ApiConfig';
import { addToCart, addToWishlist } from '../../../config/CommonFunction';
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { wishlistDetails } from '../../../redux/reducers/WishlistReducer';
import { cartDetails } from '../../../redux/reducers/CartReducer';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// import { DOMParser } from "react-native-html-parser";

function SingleProduct({ navigation, index, item }) {
  const dispatch = useDispatch();
  const [androidId, setAndroidId] = useState(true);
  // const userDetails = useSelector(state => state.userReducer.value);
  const userData = useSelector(state => state.UserReducer.value);
  // console.log("userData", userData)
  const wishlistData = useSelector(state => state.WishlistReducer.value);
  const cartData = useSelector(state => state.CartReducer.value);
  // const sessionId = useSelector(state => state.SessionIdReducer.value);
  const regex = /(<([^>]+)>)/gi;
  // console.log('item', item);

  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
    });
  }, [navigation]);

  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.navigate(
          // console.log('ProductDetailsId',item.products_slug)
          'ProductDetails',
          {
            preUrl: 'SingleProduct',
            productsSlug: item.products_slug,
            productsAttributes: item.attributes,
          },
        );
      }}>


      <View style={styles.singleProductContainer}>
        <View style={(index + 1) % 2 == 0 ? styles.itemRight : styles.itemLeft}>
          {item.wholesale_check != null && (
            <View style={{ paddingHorizontal: wp('5%') }}>
              {item.attributes[0].values.map(
                (attributesData, key) =>
                  attributesData.products_attributes_id ==
                  item.wholesale_check.attributes_ids && (
                    <Text style={styles.wholeSaleprice} key={key}>
                      {attributesData.value + ' ' + 'Wholesale Price'}
                    </Text>
                  ),
              )}
              <Text style={{ color: BKColor.textColor2, fontWeight: '700' }}>
                Rs.{item.wholesale_check.attr_selling_price}
              </Text>
            </View>
          )}

          {userData != null ? (
            <TouchableOpacity
              style={styles.wishlistIcon}
              onPress={() => {
                userData != null &&
                  addToWishlist(
                    userData.id,
                    item.products_id,
                    item.products_attributes_prices_id,
                  ).then(([wishlistData]) => {
                    if (wishlistData.result.success == 1) {
                      showMessage({
                        message: 'This product is removed from wishlist.',
                        type: 'info',
                        backgroundColor: '#808080',
                      });
                    } else if (wishlistData.result.success == 2) {
                      showMessage({
                        message: 'This product is added to wishlist.',
                        type: 'info',
                        backgroundColor: '#808080',
                      });
                    }

                    if (wishlistData.wishlist_data.length > 0) {
                      dispatch(wishlistDetails(wishlistData.wishlist_data));
                      // dispatch({ type: 'setWishlistData', payload: wishlistData.wishlist_data });
                    } else {
                      dispatch(wishlistDetails());
                      // dispatch({ type: 'setWishlistData', payload: null });
                    }
                  });
              }}>
              {wishlistData != null &&
                wishlistData.some(
                  value =>
                    value.products_id == item.products_id &&
                    value.products_attributes_prices_id ==
                    item.products_attributes_prices_id,
                ) ? (
                <AntDesign
                  name="heart"
                  color={BKColor.textColor2}
                  size={fontSize.bh}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  color={BKColor.textColor2}
                  size={fontSize.bh}
                />
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.wishlistIcon}
              onPress={() => navigation.navigate('Login')}>
              <AntDesign
                name="hearto"
                style={{ fontWeight: 'bold' }}
                color={BKColor.textColor2}
                size={fontSize.bh}
              />
            </TouchableOpacity>
          )}

          <View style={styles.itemOuter}>
            <Image
              source={{ uri: item.image_path }}
              style={styles.itemImage}
              borderRadius={wp('12.5%')}
            />
          </View>
          <View style={{ width: '85%', marginTop: 10 }}>
            <Text style={styles.itemName}>{item.products_name}</Text>
            {/* <Text style={styles.itemDetails}>{TrimString(item.products_description.replace(regex, ''), 15)}</Text> */}
            <Text style={styles.itemDetails}>
              {item.products_description != null
                ? TrimString(item.products_description, 15).replace(regex, '')
                : ''}
            </Text>

            <View>
              <Text style={styles.itemOldPrice}>{item.products_price}</Text>
              <Text style={styles.itemPrice}>{item.discounted_price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (item.defaultStock > 0) {
                  userData != null
                    ? addToCart(
                      item.products_id,
                      1,
                      userData.id,
                      '',
                      '',
                      item.attributes_ids,
                    ).then(([status, response]) => {
                      console.log('cartData - ', response);
                      if (status == 200) {
                        if (response.status === true) {
                          dispatch(cartDetails(response.cart));
                          // dispatch({ type: 'setCartData', payload: response.cart })
                          // dispatch({ type: 'setCouponDetails', payload: null });
                          console.log('this product is added');
                          showMessage({
                            message: 'This product is added to cart.',
                            type: 'info',
                            backgroundColor: '#808080',
                          });
                        } else {
                          console.log(response.status, response);
                        }
                      }
                    })
                    : addToCart(
                      item.products_id,
                      1,
                      '',
                      androidId,
                      '',
                      item.attributes_ids,
                    ).then(([status, response]) => {
                      console.log('cartData - ', response);
                      if (status == 200) {
                        if (response.status === true) {
                          dispatch(cartDetails(response.cart));
                          // dispatch({ type: 'setCartData', payload: response.cart })
                          console.log('this product is added');

                          showMessage({
                            message: 'This product is added to cart.',
                            type: 'info',
                            backgroundColor: '#808080',
                          });
                        } else {
                          console.log(response.status, response);
                        }
                      }
                    });
                } else {
                  showMessage({
                    message: 'this product is out of stock.',
                    type: 'warning',
                    backgroundColor: '#808080',
                  });
                  console.log('this product is out of stock.');
                }
              }}>
              <View style={{ position: 'absolute', bottom: -20, right: -18 }}>
                {cartData != null &&
                  cartData.some(
                    value =>
                      value.products_id == item.products_id &&
                      value.attributes_id.toString() == item.attributes_ids,
                  ) ? (
                  <View style={styles.cartIconBg}>
                    <MaterialCommunityIcons
                      name="cart-check"
                      color={BKColor.white}
                      size={fontSize.bh}
                      // style={{ alignSelf: 'flex-end', marginTop: -15 }}
                    />
                  </View>
                ) : (
                  <View style={styles.cartIconBg}>
                    <Feather
                      name="plus"
                      color={BKColor.white}
                      size={fontSize.bh}
                      // style={{ alignSelf: 'flex-end', marginTop: -15 }}

                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    </TouchableOpacity>
  );
}
export default SingleProduct;
