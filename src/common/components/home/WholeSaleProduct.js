import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {boxHeader1} from '../../values/BKStyles';
import SingleProduct from './SingleProduct';
import {POST_SHOP_PAGE_API} from '../../../config/ApiConfig';
import {PostApiFetch} from '../../../config/CommonFunction';
import {useSelector, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';

function WholeSaleProduct({navigation, refreshing, stopRefreshing}) {
  const [allPopularProducts, setAllPopularProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState(null);
  const [androidId, setAndroidId] = useState(true);

  const _getPopularProducts = androidId => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('session_id', androidId);
    // formData.append('type', 'topseller');
    formData.append('type', 'whole_sale');

    PostApiFetch(POST_SHOP_PAGE_API, formData)
      .then(([status, response]) => {
        if (status == 200) {
          // console.log('_getAllAttractivePrice==>', response.products.product_data);
          setAllPopularProducts(response.products.product_data);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
        stopRefreshing(false);
      });
  };
  useEffect(() => {
    if (refreshing) {
      DeviceInfo.getAndroidId().then(androidId => {
        setAndroidId(androidId);
        _getPopularProducts(androidId);
      });
    }
  }, [navigation, refreshing]);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <View>
        {allPopularProducts.length > 0 && (
          <>
            <View style={boxHeader1}>
              <Text style={boxHeader1.text}>Attractive Price</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductList', {
                    productType: 'whole_sale',
                  })
                }>
                <Text style={boxHeader1.text2}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.productContainer}>
                {allPopularProducts.map((item, key) => (
                  <SingleProduct
                    navigation={navigation}
                    index={key}
                    item={item}
                    key={key}
                  />
                ))}
              </View>
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}
export default WholeSaleProduct;
