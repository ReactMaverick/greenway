import React, {useState, useEffect} from 'react';
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
  RefreshControl
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
  pageContainerStyle2
} from '../../common/values/BKStyles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {GET_SEARCH_SUGGESSION} from '../../config/ApiConfig';
import {GetApiFetch} from '../../config/CommonFunction';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {BKColor} from '../../common/values/BKColor';
import PopularProducts from '../../common/components/home/PopularProducts';
import WholeSaleProduct from '../../common/components/home/WholeSaleProduct';
import PopularCategory from '../../common/components/home/PopularCategory';
function Search({navigation, route}) {
  const [result, setResult] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
  };

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
  // useEffect(() => {}, [navigation]);
  return (
    <>
      <View style={styles.searchSection}>
        {result !='' ? (<TouchableOpacity style={{ marginRight:wp('3%') }} onPress={() => navigation.goBack()}><Fontisto
              name="arrow-left-l"
              color={BKColor.textColor1}
              size={fontSize.h1}
            /></TouchableOpacity>) :<AntDesign name="search1" style={styles.searchIcon} />}
        <TextInput
          style={styles.searchSectionText}
          autoFocus={true}
          placeholder="Search your products, brands...."
          value={result}
          onChangeText={result => _search_suggession(result)}
        />
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                  source={{uri: item.image_path}}
                  style={styles.searchImage}
                />
              </View>
              <View style={{flex: 1}}>
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
      <SafeAreaView>
        <View style={styles.pageContainerStyle2}>
          <ScrollView
            style={{marginBottom: hp('11%')}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <PopularProducts
              navigation={navigation}
              refreshing={refreshing}
              stopRefreshing={() => {
                setRefreshing(false);
              }}
            />
            <WholeSaleProduct
              navigation={navigation}
              refreshing={refreshing}
              stopRefreshing={() => {
                setRefreshing(false);
              }}
            />
            <PopularCategory
              navigation={navigation}
              refreshing={refreshing}
              stopRefreshing={() => {
                setRefreshing(false);
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
export default Search;
