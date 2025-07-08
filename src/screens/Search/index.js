import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
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
  pageContainerStyle2,
  commonStyle,
} from '../../common/values/BKStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GET_SEARCH_SUGGESSION,
  POST_SHOP_PAGE_API,
} from '../../config/ApiConfig';
import { GetApiFetch, PostApiFetch } from '../../config/CommonFunction';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { BKColor } from '../../common/values/BKColor';
import PopularProducts from '../../common/components/home/PopularProducts';
import SingleProduct from '../../common/components/home/SingleProduct';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { platform } from '../../common/values/BKConstants';
function Search({ navigation, route }) {
  const [result, setResult] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [androidId, setAndroidId] = useState(true);

  const _search_suggession = async result_text => {
    setResult(result_text);
    if (result_text.length >= 3) {
      setIsLoading(true);
      console.log(result_text);
      let params = '?searchChar=' + result_text.toLowerCase();
      GetApiFetch(GET_SEARCH_SUGGESSION, params)
        .then(([status, response]) => {
          if (status == 200) {
            // console.log('products', response.product)
            setProducts(response.product);
          } else {
            console.log(status, response);
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setProducts([]);
    }
  };
  const _getProducts = androidId => {
    const formData = new FormData();
    formData.append('session_id', androidId);
    formData.append('type', 'popular_product');
    PostApiFetch(POST_SHOP_PAGE_API, formData)
      .then(([status, response]) => {
        if (status == 200) {
          // /console.log('_getAllPopularProducts', response.products.product_data);
          setAllProducts(response.products.product_data);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => { });
  };
  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
      _getProducts(androidId);
    });
  }, [navigation]);
  return (
    <>
      <View style={styles.searchSection}>
        {result != '' ? (
          <TouchableOpacity
            style={{ marginRight: wp('3%') }}
            onPress={() => navigation.goBack()}>
            <Fontisto
              name="arrow-left-l"
              color={BKColor.textColor1}
              size={fontSize.h1}
            />
          </TouchableOpacity>
        ) : (
          <AntDesign name="search1" style={styles.searchIcon} />
        )}
        <TextInput
          style={styles.searchSectionText}
          autoFocus={true}
          placeholder="Search your products, brands...."
          value={result}
          onChangeText={result => _search_suggession(result)}
        />
      </View>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={BKColor.textColor2} />
        </View>
      ) : (
        <View>
          {products.map((item, key) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductDetails', {
                  productsSlug: item.products_slug,
                  productsAttributes: item.attributes,
                });
              }}
              key={key}
              style={styles.searchResult}>
              <View>
                <Image
                  source={{ uri: item.image_path }}
                  style={styles.searchImage}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.searchResultText}>
                  {item.products_name}{' '}
                </Text>
                <Text style={styles.searchResultTextCat}>
                  {item.categories_name}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <KeyboardAvoidingView
        behavior={platform === 'ios' ? 'padding' : 'height'}
        style={commonStyle.keyboardAvoidingView}>
        <SafeAreaView style={commonStyle.safeAreaView}>
          <View style={pageContainerStyle2}>
            <ScrollView ScrollIndicator={false}>
              <View style={styles.productContainer}>
                {allProducts.length > 0 &&
                  allProducts.map((item, key) => (
                    <SingleProduct
                      navigation={navigation}
                      index={key}
                      key={key}
                      item={item}
                    />
                  ))}
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
export default Search;
