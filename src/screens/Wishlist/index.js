import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {
  pageContainerStyle,
  pageContainerStyle2,
} from '../../common/values/BKStyles';
import {
  pageHeader,
  fontSize,
  activeButton,
  passiveButton,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {inputContainer, textInput} from '../../common/values/BKStyles';
import {
  GET_WISHLIST_API,
  IMAGE_BASE_PATH,
  POST_DELETE_WISHLIST_API,
} from '../../config/ApiConfig';
import {GetApiFetch, PostApiFetch} from '../../config/CommonFunction';
import {useDispatch, useSelector} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {addToCart} from '../../config/CommonFunction';
import {wishlistDetails} from '../../redux/reducers/WishlistReducer';
import CustomStatusBar from '../../common/components/statusbar';
import {SwipeListView} from 'react-native-swipe-list-view';

function Wishlist({navigation}) {
  // const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const { wishlistData } = useSelector((state) => state.WishlistReducer);
  const wishlistData = useSelector(state => state.WishlistReducer.value);
  const userData = useSelector(state => state.UserReducer.value);
  // console.log('userData==>', userData)

  const _getWishlist = async () => {
    setIsLoading(true);
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
            dispatch(wishlistDetails(response.result));
            // dispatch({
            //     type: 'setWishlistData',
            //     payload: response.result
            // });
          } else {
            dispatch(wishlistDetails());
            // dispatch({
            //     type: 'setWishlistData',
            //     payload: null
            // });
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _deleteWishlist = item => {
    const formData = new FormData();
    formData.append('customers_id', userData.id);
    formData.append('products_id', item.products_id);
    formData.append(
      'products_attributes_prices_id',
      item.products_attributes_prices_id,
    );

    console.log('formData ==>', formData);
    PostApiFetch(POST_DELETE_WISHLIST_API, formData)
      .then(([status, response]) => {
        // console.log(' delete wishlist response =>', response)
        if (status == 200) {
          // console.log("Wishlist item deleted successfully.");

          if (response.status == true) {
            if (response.wishlist_data.length > 0) {
              dispatch(wishlistDetails(response.wishlist_data));

              // dispatch({
              //     type: 'setWishlistData',
              //     payload: response.wishlist_data
              // });

              // showMessage({
              //     message: "Wishlist item deleted successfully",
              //     type: "info",
              //     backgroundColor: "#808080",
              // })
            } else {
              dispatch(wishlistDetails(response.wishlist_data));

              // dispatch({
              //     type: 'setWishlistData',
              //     payload: null
              // });
            }
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {});
  };
  useEffect(() => {
    _getWishlist();
  }, [navigation]);

  if (isLoading) {
    return (
      <>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomStatusBar />
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView style={pageContainerStyle2}>
        <CustomStatusBar />
        <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left-l"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Wishlist</Text>
          <View style={{width: wp('10%')}}></View>
        </View>
        {wishlistData != null ? (
          // <ScrollView
          //   style={{marginBottom: hp('10%')}}
          //   showsVerticalScrollIndicator={false}>
          //   {wishlistData.map((item, key) => (
          //     <View style={styles.cartDetailsSec} key={key}>
          //       <View style={styles.cartImgSec}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             navigation.navigate(
          //               // console.log('ProductDetailsId',item.products_slug)
          //               'ProductDetails',
          //               {
          //                 preUrl: 'SingleProduct',
          //                 productsSlug: item.products_slug,
          //                 productsAttributes: item.attributes,
          //               },
          //             );
          //           }}>
          //           <View style={styles.productImageSec}>
          //             <Image
          //               source={{uri: IMAGE_BASE_PATH + item.image_path}}
          //               style={styles.itemImage}
          //               borderRadius={wp('12.5%')}
          //             />
          //           </View>
          //         </TouchableOpacity>
          //       </View>
          //       <View
          //         style={{
          //           flex: 2,
          //           paddingVertical: hp('1.5%'),
          //           paddingHorizontal: wp('2%'),
          //         }}>
          //         <View style={styles.cartDecSec}>
          //           <TouchableOpacity
          //             onPress={() => {
          //               navigation.navigate(
          //                 // console.log('ProductDetailsId',item.products_slug)
          //                 'ProductDetails',
          //                 {
          //                   preUrl: 'SingleProduct',
          //                   productsSlug: item.products_slug,
          //                   productsAttributes: item.attributes,
          //                 },
          //               );
          //             }}>
          //             <Text style={styles.cartDecHeading}>
          //               {item.products_name}
          //             </Text>
          //             <Text style={styles.cartAttr}>
          //               {item.attributes[0].values1[0].value}
          //             </Text>
          //             <Text style={styles.cartPrice}>
          //               Rs {item.discounted_price}
          //             </Text>
          //           </TouchableOpacity>
          //         </View>
          //       </View>
          //       <View style={styles.cartQtyOuter}>
          //         <TouchableOpacity
          //           onPress={() => {
          //             // _deleteWishlist(item);
          //             if (item.defaultStock > 0) {
          //               userData != null &&
          //                 addToCart(
          //                   item.products_id,
          //                   '',
          //                   userData.id,
          //                   '',
          //                   '',
          //                   item.attributes_ids,
          //                 ).then(([status, response]) => {
          //                   // console.log("add to cart ==>>>", response.status, response)
          //                   if (status == 200) {
          //                     if (response.status === true) {
          //                       // dispatch({ type: 'setCartData', payload: response.cart })
          //                       _deleteWishlist(item);
          //                       showMessage({
          //                         message: 'This product is added to cart.',
          //                         type: 'info',
          //                         backgroundColor: '#808080',
          //                       });
          //                     } else {
          //                       // console.log(response.status, response)
          //                       showMessage({
          //                         message: response.message,
          //                         type: 'info',
          //                         backgroundColor: '#808080',
          //                       });
          //                     }
          //                   }
          //                 });
          //             } else {
          //               showMessage({
          //                 message: 'this product is out of stock',
          //                 type: 'info',
          //                 backgroundColor: '#808080',
          //               });
          //               // console.log("this product is out of stock.");
          //             }
          //           }}>
          //           <View style={styles.cartDltSec}>
          //             <FontAwesome5
          //               name="shopping-cart"
          //               // style={styles.cartDltIcon}
          //               color={BKColor.white}
          //               size={fontSize.bh}
          //             />
          //           </View>
          //         </TouchableOpacity>

          //         {/* <TouchableOpacity
          //           onPress={() => {
          //             _deleteWishlist(item);
          //           }}>
          //           <View style={styles.cartDltSec}>
          //             <Feather
          //               name="trash"
          //               style={styles.cartDltIcon}
          //               color={BKColor.textColor6}
          //             />
          //           </View>
          //         </TouchableOpacity> */}
          //       </View>
          //     </View>
          //   ))}
          // </ScrollView>
          <ScrollView
            style={{marginBottom: hp('10%')}}
            showsVerticalScrollIndicator={false}>
            <SwipeListView
              data={wishlistData}
              renderItem={(data, rowMap) => (
                <View style={styles.cartDetailsSec}>
                  <View style={styles.cartImgSec}>
                    <TouchableOpacity
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
                      <View style={styles.productImageSec}>
                        <Image
                          source={{uri: IMAGE_BASE_PATH + data.item.image_path}}
                          style={styles.itemImage}
                          borderRadius={wp('12.5%')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      paddingVertical: hp('1.5%'),
                      paddingHorizontal: wp('2%'),
                    }}>
                    <View style={styles.cartDecSec}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(
                            // console.log('ProductDetailsId',item.products_slug)
                            'ProductDetails',
                            {
                              preUrl: 'SingleProduct',
                              productsSlug: data.item.products_slug,
                              productsAttributes: data.item.attributes,
                            },
                          );
                        }}>
                        <Text style={styles.cartDecHeading}>
                          {data.item.products_name}
                        </Text>
                        <Text style={styles.cartAttr}>
                          {data.item.attributes[0].values1[0].value}
                        </Text>
                        <Text style={styles.cartPrice}>
                          Rs {data.item.discounted_price}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.cartQtyOuter}>
                    <TouchableOpacity
                      onPress={() => {
                        // _deleteWishlist(item);
                        if (item.defaultStock > 0) {
                          userData != null &&
                            addToCart(
                              data.item.products_id,
                              '',
                              userData.id,
                              '',
                              '',
                              data.item.attributes_ids,
                            ).then(([status, response]) => {
                              // console.log("add to cart ==>>>", response.status, response)
                              if (status == 200) {
                                if (response.status === true) {
                                  // dispatch({ type: 'setCartData', payload: response.cart })
                                  _deleteWishlist(item);
                                  showMessage({
                                    message: 'This product is added to cart.',
                                    type: 'info',
                                    backgroundColor: '#808080',
                                  });
                                } else {
                                  // console.log(response.status, response)
                                  showMessage({
                                    message: response.message,
                                    type: 'info',
                                    backgroundColor: '#808080',
                                  });
                                }
                              }
                            });
                        } else {
                          showMessage({
                            message: 'this product is out of stock',
                            type: 'info',
                            backgroundColor: '#808080',
                          });
                          // console.log("this product is out of stock.");
                        }
                      }}>
                      <View style={styles.cartDltSec}>
                        <FontAwesome5
                          name="shopping-cart"
                          // style={styles.cartDltIcon}
                          color={BKColor.white}
                          size={fontSize.bh}
                        />
                      </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                    onPress={() => {
                      _deleteWishlist(item);
                    }}>
                    <View style={styles.cartDltSec}>
                      <Feather
                        name="trash"
                        style={styles.cartDltIcon}
                        color={BKColor.textColor6}
                      />
                    </View>
                  </TouchableOpacity> */}
                  </View>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <View style={styles.cartSlideOuter}>
                  <TouchableOpacity
                    onPress={() => {
                      _deleteWishlist(data.item);
                    }}>
                    <Feather
                      name="trash"
                      style={styles.cartDltIcon}
                      color={BKColor.textColor6}
                    />
                  </TouchableOpacity>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
              // disableRightSwipe={true}
              disableLeftSwipe={true}
            />
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: hp('15%'),
            }}>
            <Text style={[styles.totalItemHeading, {fontWeight: '700'}]}>
              Your wishlist is empty
            </Text>
            <Text style={[styles.totalItemHeading, {textAlign: 'center'}]}>
              Looks like you haven't added anything to your wishlist yet
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default Wishlist;
