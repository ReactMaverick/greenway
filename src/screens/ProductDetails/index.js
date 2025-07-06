import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
  pageContainerStyle,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
  passiveButton,
  pageContainerStyle2
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {
  GET_PRODUCT_DETAILS_API,
  UPDATE_CART_QUANTITY,
} from '../../config/ApiConfig';
import {GetApiFetch} from '../../config/CommonFunction';
import {TrimString} from '../../config/CommonFunction';
import {IMAGE_BASE_PATH} from '../../config/ApiConfig';
import DeviceInfo from 'react-native-device-info';
import {addToCart, addToWishlist} from '../../config/CommonFunction';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSelector, useDispatch} from 'react-redux';
// import StarRating from 'react-native-star-rating';
import {wishlistDetails} from '../../redux/reducers/WishlistReducer';
import {cartDetails} from '../../redux/reducers/CartReducer';
import {shopnowDetails} from '../../redux/reducers/ShopNowReducer';
import CustomStatusBar from '../../common/components/statusbar';

function ProductDetails({navigation, route}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.UserReducer.value);
  // const cartData = useSelector(state => state.CartReducer.value);
  const wishlistData = useSelector(state => state.WishlistReducer.value);
  // const { wishlistData } = useSelector((state) => state.WishlistReducer);
  const [changeInCart, setChangeInCarts] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  // const { productsSlug } = route.params;
   
  const [productsSlug, setProductsSlug] = useState(route.params.productsSlug);
  const [productsAttributes, setProductsAttributes] = useState(
    route.params.productsAttributes,
  );
  const [preUrl, setPreUrl] = useState(route.params.preUrl);
  // console.log('preUrl ===============> ',route.params)
  const [productImages, setProductImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsAttributesChange, setProductsAttributesChange] =
    useState(false);
  const [androidId, setAndroidId] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const regex = /(<([^>]+)>)/gi;
  const secondRegEx = /((&nbsp;))*/gim;
  const [productReview, setProductReview] = useState([]);
  const _getProductDetails = androidId => {
    setProductsAttributesChange(false);
    setChangeInCarts(false);
    setIsLoading(true);
    let params = '';
    if (userData != null) {
      params =
        '?products_slug=' +
        productsSlug +
        '&customers_id=' +
        userData.id +
        '&session_id=';
    } else {
      params =
        '?products_slug=' +
        productsSlug +
        '&customers_id=&session_id=' +
        androidId;
    }
    if (preUrl == 'SingleProduct') {
      for (let item of productsAttributes) {
        params =
          params +
          '&' +
          item.option.product_option_slug +
          '=' +
          item.values1[0].value;
      }
    } else if (preUrl == 'Cart') {
      for (let item of productsAttributes) {
        params =
          params + '&' + item.product_option_slug + '=' + item.attribute_value;
      }
    }
    // console.log('params',params);
    GetApiFetch(GET_PRODUCT_DETAILS_API, params)
      .then(([status, response]) => {
        // console.log(status, response);
        if (status == 200) {
          // console.log("_getProductDetails - ", response.detail.product_data[0])
          if (response.detail.product_data.length > 0) {
            setProductDetails(response.detail.product_data[0]);
            var images = [];
            images.push(response.detail.product_data[0].image_path);
            images.concat(response.detail.product_data[0].images);
            setProductImages(images);
            // setSelectedImage(IMAGE_BASE_PATH + response.detail.product_data[0].default_images)
            // setSingleImage(IMAGE_BASE_PATH + response.detail.product_data[0].default_images)
            // setSimliarProducts(response.simliar_products.product_data)
            setProductReview(response.product_review);
          } else {
            // navigate('*')
          }
        } else {
          console.log(status, response);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _setProductsAttributes = async (key, item2) => {
    // console.log(key, item2)
    var tempProductAttr = productsAttributes;
    tempProductAttr[key].values1[0] = item2;
    // console.log('tempProductAttr ', tempProductAttr)
    setProductsAttributes(tempProductAttr);
    // _getProductDetails(androidId)
  };

  const _minusQuantity = async products_min_order => {
    var newQuantity = quantity;
    if (quantity > products_min_order) {
      newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
    return newQuantity;
  };
  const _plusQuantity = async products_max_stock => {
    var newQuantity = quantity;
    if (quantity < products_max_stock) {
      newQuantity = quantity + 1;
      setQuantity(newQuantity);
    }
    return newQuantity;
  };
  const _buyNow = () => {
    if (userData != null) {
      addToCart(
        productDetails.products_id,
        quantity,
        userData.id,
        '',
        1,
        productDetails.prod_attributeids,
      ).then(([status, response]) => {
        // console.log('cartData - ', response)
        if (status == 200) {
          if (response.status === true) {
            dispatch(cartDetails(response.cart));
            dispatch(shopnowDetails(1));
            // dispatch({ type: 'setShopNowData', payload: 1 });
            showMessage({
              message: 'This product is added to cart.',
              type: 'info',
              backgroundColor: '#808080',
            });
            navigation.navigate('Cart', {shopNow: 1});
          } else {
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
        message: 'Please login to use this option.',
        type: 'info',
        backgroundColor: '#808080',
      });
    }
  };
  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
      _getProductDetails(androidId);
    });
    // _getProductDetails();
  }, [navigation, productsAttributesChange, changeInCart]);

  const SliderItem = ({item, key}) => {
    return (
      <ImageBackground
        // borderRadius={20}
        key={key}
        resizeMode="contain"
        style={styles.imageSlider}
        source={{uri: item}}
      />
    );
  };
  if (isLoading) {
    return (
      <>
        <SafeAreaView
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CustomStatusBar/>
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </SafeAreaView>
      </>
    );
  } else {
    return (
      <SafeAreaView style={pageContainerStyle2}>
        <CustomStatusBar/>
        <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Product Details</Text>
          <View></View>
        </View>

        <ScrollView style={{marginVertical: hp('1%')}} showsVerticalScrollIndicator={false}>
          {productImages.length > 0 && (
            <ScrollView style={styles.productImageSection}>
              <FlatListSlider
                data={productImages}
                component={<SliderItem />}
                indicator={true}
                timer={10000}
                loop={true}
              />
            </ScrollView>
          )}

          <View style={styles.productNameAttrSec}>
            <View style={styles.cartWishlistIcon}>
              <Text style={styles.productName}>
                {productDetails.products_name}
              </Text>
              {userData != null ? (
                <TouchableOpacity
                  onPress={() => {
                    addToWishlist(
                      userData.id,
                      productDetails.products_id,
                      productDetails.products_attributes_prices_id,
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
                      } else {
                        dispatch(wishlistDetails());
                      }
                    });
                  }}>
                  {wishlistData != null &&
                  wishlistData.some(
                    value =>
                      value.products_id == productDetails.products_id &&
                      value.products_attributes_prices_id ==
                        productDetails.products_attributes_prices_id,
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
                  {/* <AntDesign name="heart" color={BKColor.textColor2} size={fontSize.bh} /> */}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <AntDesign
                    name="hearto"
                    style={{fontWeight: 'bold'}}
                    color={BKColor.textColor2}
                    size={fontSize.bh}
                  />
                </TouchableOpacity>
              )}
            </View>
            {productDetails.attributes.map((item, key) => (
              <View
                key={key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: wp('2%'),
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={[
                    styles.productAttr,
                    {marginTop: 0},
                    // {marginTop: 0, marginRight: wp('2%')},
                  ]}>
                  {/* {item.option.name} */}
                </Text>
                
                <Text style={styles.attrName}>Weight : </Text>
                {item.values.map((item2, key2) => (
                  <TouchableOpacity
                    key={key2}
                    onPress={() => {
                      _setProductsAttributes(key, item2).then(() => {
                        setProductsAttributesChange(true);
                      });
                    }}
                    style={
                      item.values1[0].products_attributes_id ==
                      item2.products_attributes_id
                        ? styles.productAttrItemActive
                        : styles.productAttrItem
                    }>
                    <Text
                      style={
                        item.values1[0].products_attributes_id ==
                          item2.products_attributes_id && {color: BKColor.white}
                      }>
                      {item2.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          {productDetails.wholesale_check != null ?
          <Text style={[styles.wholeSaleprice2, {marginTop: '3%'}]}>
            {productDetails.attributes[0].values.map((attributesData,key)=>(attributesData.products_attributes_id == productDetails.wholesale_check.attributes_ids ? attributesData.value +" "+"Wholesale Price" : <></>))}
            <Text style={{color: BKColor.textColor2, fontWeight: '700'}}>
              {' '}
              Rs.{productDetails.wholesale_check.attr_selling_price}
            </Text>
          </Text>
          :
          <></>
          }
          <View style={styles.productPriceQtySec}>
            <View style={styles.productPriceSec}>
              <Text style={styles.productOldPrice}>
                Rs.{productDetails.products_price}
              </Text>
              <Text style={styles.productPrice}>
                Rs.{productDetails.discounted_price}
              </Text>
            </View>
            <View style={styles.productQtySec}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Product decreased');
                  _minusQuantity(productDetails.products_min_order);
                }}>
                <AntDesign name="minus" style={styles.productMinus} />
              </TouchableOpacity>

              <Text style={styles.productQty}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => {
                  if (quantity < productDetails.defaultStock) {
                    console.log('Product increased');
                    _plusQuantity(productDetails.products_max_stock);
                  } else {
                    showMessage({
                      message: 'Product is out stock!!',
                      type: 'info',
                      backgroundColor: '#EC1F25',
                    });
                  }
                }}>
                <AntDesign name="plus" style={styles.productPlus} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productDecSec}>
            <Text style={styles.productDecHeading}>Product Details</Text>
            <Text style={styles.productDec}>
              {productDetails.products_special_instructions != null
                ? productDetails.products_special_instructions.replace(
                    regex,
                    '',
                  )
                : ''}
            </Text>
            <Text style={styles.productDec}>
              {productDetails.products_description != null
                ? productDetails.products_description
                    .replace(regex, '')
                    .replace(secondRegEx, '')
                : ''}
            </Text>
          </View>
          {productDetails.products_specification != '' && (
            <View style={styles.productDecSec}>
              <Text style={styles.productDecHeading}>Specification</Text>
              <Text style={styles.productDec}>
                {productDetails.products_specification
                  .replace(regex, '')
                  .replace(secondRegEx, '')}
              </Text>
            </View>
          )}

          {/* Review list Section Start */}
          <View style={styles.productReviewSec}>
            <Text style={styles.productReview}>Reviews</Text>

            {/* <StarRating
              maxStars={5}
              disabled={true}
              starSize={20}
              fullStarColor={BKColor.textColor2}
              rating={Math.round(productDetails.rating)}
            /> */}
          </View>
          {productReview.length < 0 ? (
            <View>
              <Text style={styles.productReview}>No Reviews Available</Text>
            </View>
          ) : (
            <View>
              {productReview.map((item, key) => (
                <View key={key} style={styles.reviewSec}>
                  <View style={styles.reviewStar}>
                    {/* <StarRating
                      maxStars={5}
                      disabled={true}
                      starSize={20}
                      fullStarColor={BKColor.textColor2}
                      // halfStarColor={'white'}
                      changeRating={item.reviews_rating}
                      rating={item.reviews_rating}
                      // name='rating'
                    /> */}
                  </View>
                  <View>
                    <Text>{item.reviews_text}</Text>
                  </View>
                  <View>
                    <Text style={{color: 'grey'}}>{item.customers_name}</Text>
                  </View>
                  <View>
                    <Text style={{color: 'grey'}}>{item.created_at}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {/* Review list Section End */}

          <View style={styles.addToCartSec}>
            {productDetails.defaultStock > 0 ? (
              <>
                {productDetails.isCartPresent == 1 ? (
                  <View
                    style={[
                      passiveButton.button,
                      {padding: wp('3%'), borderColor: BKColor.textColor2},
                    ]}>
                    <Text style={passiveButton.text}>Added</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.addToCartBtn}>
                      <TouchableOpacity
                        style={[passiveButton.button, {padding: wp('3%')}]}
                        onPress={() => {
                          if (productDetails.defaultStock > 0) {
                            userData != null
                              ? addToCart(
                                  productDetails.products_id,
                                  quantity,
                                  userData.id,
                                  '',
                                  '',
                                  productDetails.prod_attributeids,
                                ).then(([status, response]) => {
                                  setChangeInCarts(true);
                                  // console.log('cartData - ', response);
                                  if (status == 200) {
                                    if (response.status === true) {
                                      dispatch(cartDetails(response.cart));
                                      // dispatch({ type: 'setCartData', payload: response.cart })
                                      // console.log("this product is added")
                                      showMessage({
                                        message:
                                          'This product is added to cart.',
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
                                })
                              : addToCart(
                                  productDetails.products_id,
                                  quantity,
                                  '',
                                  androidId,
                                  '',
                                  productDetails.prod_attributeids,
                                ).then(([status, response]) => {
                                  setChangeInCarts(true);
                                  if (status == 200) {
                                    if (response.status === true) {
                                      dispatch(cartDetails(response.cart));
                                      // dispatch({ type: 'setCartData', payload: response.cart })
                                      console.log('this product is added');

                                      showMessage({
                                        message:
                                          'This product is added to cart.',
                                        type: 'info',
                                        backgroundColor: '#808080',
                                      });
                                    } else {
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
                        <AntDesign
                          name="shoppingcart"
                          style={passiveButton.icon}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buyNowBtn}>
                      <TouchableOpacity
                        style={activeButton.button}
                        onPress={() => {
                          _buyNow();
                        }}>
                        <Text style={activeButton.text}>Buy now</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            ) : (
              <View style={[passiveButton.button, {padding: wp('3%')}]}>
                <Text style={passiveButton.text}>Out of Stock</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export default ProductDetails;
