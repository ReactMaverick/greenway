import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// styles
import styles from './styles';
import {
  pageContainerStyle,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
//components
import SingleProduct from '../../common/components/home/SingleProduct';
import {POST_SHOP_PAGE_API} from '../../config/ApiConfig';
import {PostApiFetch} from '../../config/CommonFunction';
// import SliderScreen from "../../common/components/slider/Slider";
// import RangeSlider from "../../common/components/RangeSlider";
import Slider from '@react-native-community/slider';
import CustomStatusBar from '../../common/components/statusbar';

function ProductList({navigation, route}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('sort');
  const [isLoading, setIsLoading] = useState(true);
  const [androidId, setAndroidId] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [filters, setFilters] = useState();
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(false);
  // const {productType} = route.params;
  // Filters
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(
    route.params == undefined ? null : route.params.categorySlug,
  );
  const [attrValueIds, setAttrValueIds] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const _clearFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setType(null);
    setCategory(null);
    setAttrValueIds(null);
    _getAllProducts(androidId, false);
    setModalVisible(false);
  };
  const _getAllProducts = (androidId, status) => {
    // const params = [];
    // for (let entry of searchParams.entries()) {
    //     params.push(entry);
    // }
    // console.log('all params - ',params); // [["page", 5], ["pageSize", 25]]
    setIsLoading(true);
    const formData = new FormData();
    formData.append('session_id', androidId);
    // console.log('all params - ','type -'+type+' minPrice - '+minPrice+' maxPrice - '+maxPrice+' category - '+category+' attrValueIds - '+attrValueIds );
    if (status) {
      if (type != null) {
        formData.append('type', type);
      }
      if (minPrice != null) {
        formData.append('min_price', minPrice);
      }
      if (maxPrice != null) {
        formData.append('max_price', maxPrice);
      }
      // if (searchParams.get("search") != null) {
      //     formData.append('search', searchParams.get("search"));
      // }
      if (category != null) {
        formData.append('categories_slug', category);
      }
      // if (searchParams.get("brands_id") != null) {
      //     formData.append('brands_id', searchParams.get("brands_id"));
      // }
      // if (searchParams.get("filters_applied") != null) {
      //     formData.append('filters_applied', searchParams.get("filters_applied"));
      // }
      // if (searchParams.get("classification_values_ids") != null) {
      //     formData.append('classification_values_ids', searchParams.get("classification_values_ids"));
      // }
      if (attrValueIds != null) {
        formData.append('attr_value_ids', attrValueIds);
      }
    }

    PostApiFetch(POST_SHOP_PAGE_API, formData)
      .then(([status, response]) => {
        if (status == 200) {
          // console.log('_getAllProducts', response);
          setProductList(response.products.product_data);
          setCategoryList(response.categories);
          console.log('response.filters - ', response.filters);
          setFilters(response.filters);
          setMinPrice(response.filters.minPrice);
          setMaxPrice(response.filters.maxPrice);
          // console.log('response.filters.attr_data - ', response.filters.attr_data)
          // set_minValue(response.filters.minPrice);
          // if (minValue != null) {
          //     setCurrentMin(minValue);
          // } else {
          //     setCurrentMin(response.filters.minPrice);
          // }
          // if (maxValue != null) {
          //     setCurrentMax(maxValue);
          // } else {
          //     setCurrentMax(response.filters.maxPrice);
          // }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
        setModalVisible(false);
      });
  };
  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      setAndroidId(androidId);
      _getAllProducts(androidId, true);
    });
  }, [navigation]);

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
      <SafeAreaView>
        <CustomStatusBar/>
        <View style={pageContainerStyle}>
          <View style={pageHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Fontisto
                name="arrow-left-l"
                color={BKColor.textColor1}
                size={fontSize.h2}
              />
            </TouchableOpacity>
            <Text style={pageHeader.text}>Buy Items</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Octicons
                name="filter"
                color={BKColor.textColor1}
                size={fontSize.h2}
              />
            </TouchableOpacity>
          </View>

          <ScrollView ScrollIndicator={false}>
            <View style={styles.productContainer}>
              {productList.length > 0 &&
                productList.map((item, key) => (
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
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={{alignItems: 'center'}}>
          <View style={styles.filterModal}>
            <View style={styles.filterModalHeader}>
              <Text style={styles.filterModalHeader.text1}>Filter</Text>
              <TouchableOpacity
                onPress={() => {
                  _clearFilter();
                }}>
                <Text style={styles.filterModalHeader.text2}>Clear all</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 40}}></View>
            <View style={styles.filterModalBody}>
              <View style={styles.filterModalTab}>
                <TouchableOpacity
                  style={
                    activeTab == 'sort'
                      ? styles.filterModalTabItemActive
                      : styles.filterModalTabItem
                  }
                  onPress={() => {
                    setActiveTab('sort');
                  }}>
                  <Text
                    style={
                      activeTab == 'sort'
                        ? styles.filterModalTabItemActive.text
                        : styles.filterModalTabItem.text
                    }>
                    Sort
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    activeTab == 'filterByCategory'
                      ? styles.filterModalTabItemActive
                      : styles.filterModalTabItem
                  }
                  onPress={() => {
                    setActiveTab('filterByCategory');
                  }}>
                  <Text
                    style={
                      activeTab == 'filterByCategory'
                        ? styles.filterModalTabItemActive.text
                        : styles.filterModalTabItem.text
                    }>
                    FILTER BY CATEGORY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    activeTab == 'filterByPrice'
                      ? styles.filterModalTabItemActive
                      : styles.filterModalTabItem
                  }
                  onPress={() => {
                    setActiveTab('filterByPrice');
                  }}>
                  <Text
                    style={
                      activeTab == 'filterByPrice'
                        ? styles.filterModalTabItemActive.text
                        : styles.filterModalTabItem.text
                    }>
                    FILTER BY PRICE
                  </Text>
                </TouchableOpacity>
                {filters.attr_data.length != undefined &&
                filters.attr_data.length > 0 ? (
                  filters.attr_data.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      style={
                        activeTab == item.option.name
                          ? styles.filterModalTabItemActive
                          : styles.filterModalTabItem
                      }
                      onPress={() => {
                        setActiveTab(item.option.name);
                      }}>
                      <Text
                        style={
                          activeTab == item.option.name
                            ? styles.filterModalTabItemActive.text
                            : styles.filterModalTabItem.text
                        }>
                        Select By {item.option.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <></>
                )}
                {
                  // filters.attr_data.length > 0 &&
                  // filters.attr_data.map((item, key) => (
                  //     <div className="widget_list widget_manu">
                  //         <h3>Select By {item.option.name}</h3>
                  //         <ul>
                  //             {item.values.map((item2, key2) => (
                  //                 <li>
                  //                     <Link to={_filterRoute("attr_value_ids", item2.value_id)}>{item2.value}</Link>
                  //                 </li>
                  //             ))}
                  //         </ul>
                  //     </div>
                  // ))
                }
              </View>
              <View style={styles.filterModalTabContent}>
                {activeTab == 'sort' && (
                  <>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('ratinghightolow')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'ratinghightolow' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'ratinghightolow'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by average rating
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('topseller')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'topseller' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'topseller'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by popularity
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('lowtohigh')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'lowtohigh' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'lowtohigh'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by price: low to heigh
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('hightolow')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'hightolow' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'hightolow'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by price: heigh to low
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('ztoa')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'ztoa' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'ztoa'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by Z to A
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.filterModalTabContentItem}
                      onPress={() => setType('atoz')}>
                      <View style={styles.filterModalTabContentItem.icon}>
                        {type === 'atoz' && (
                          <Octicons
                            name="check"
                            color={BKColor.textColor2}
                            size={fontSize.h2}
                          />
                        )}
                      </View>
                      <Text
                        style={
                          type === 'atoz'
                            ? styles.filterModalTabContentItem.textActive
                            : styles.filterModalTabContentItem.text
                        }>
                        Sort by A to Z
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
                {activeTab == 'filterByCategory' && (
                  <>
                    {categoryList.map((item, key) => (
                      <View key={key}>
                        <TouchableOpacity
                          style={styles.filterModalTabContentItem}
                          onPress={() => setCategory(item.slug)}
                          key={key}>
                          <View style={styles.filterModalTabContentItem.icon}>
                            {category === item.slug && (
                              <Octicons
                                name="check"
                                color={BKColor.textColor2}
                                size={fontSize.h2}
                              />
                            )}
                          </View>
                          <Text
                            style={
                              category === item.slug
                                ? styles.filterModalTabContentItem.textActive
                                : styles.filterModalTabContentItem.text
                            }>
                            {item.categories_name}
                          </Text>
                        </TouchableOpacity>
                        {item.childs != undefined &&
                          item.childs.map((item2, key2) => (
                            <TouchableOpacity
                              style={styles.filterModalTabContentSubItem}
                              onPress={() => setCategory(item2.slug)}
                              key={key2}>
                              <View
                                style={
                                  styles.filterModalTabContentSubItem.icon
                                }>
                                {category === item2.slug && (
                                  <Octicons
                                    name="check"
                                    color={BKColor.textColor2}
                                    size={fontSize.h2}
                                  />
                                )}
                              </View>
                              <MaterialCommunityIcons
                                name="arrow-right-bottom"
                                color={BKColor.textColor3}
                                size={fontSize.h3}
                              />
                              <Text
                                style={
                                  category === item2.slug
                                    ? styles.filterModalTabContentItem
                                        .textActive
                                    : styles.filterModalTabContentItem.text
                                }>
                                {item2.categories_name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                      </View>
                    ))}
                  </>
                )}

                {activeTab == 'filterByPrice' && (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      <View>
                        <Text>Min Price</Text>
                        <Text>{minPrice}</Text>
                      </View>
                      <View>
                        <Text>Max Price</Text>
                        <Text>{maxPrice}</Text>
                      </View>
                    </View>

                    <Slider
                      style={{width: wp('65%'), height: 40}}
                      minimumValue={filters.minPrice}
                      maximumValue={filters.maxPrice}
                      minimumTrackTintColor={BKColor.textColor2}
                      maximumTrackTintColor={BKColor.textColor4}
                      onValueChange={Value => {
                        if (priceChange) {
                          setMaxPrice(Math.round(Value));
                          setPriceChange(true);
                          console.log(Value);
                        }
                      }}
                    />
                  </>
                )}

                {filters.attr_data.length != undefined &&
                filters.attr_data.length > 0 ? (
                  filters.attr_data.map(
                    (item, key) =>
                      activeTab == item.option.name && (
                        <>
                          {item.values.map((item2, key2) => (
                            <TouchableOpacity
                              style={styles.filterModalTabContentItem}
                              onPress={() => setAttrValueIds(item2.value_id)}
                              key={item2.value_id}>
                              <View
                                style={styles.filterModalTabContentItem.icon}>
                                {attrValueIds === item2.value_id && (
                                  <Octicons
                                    name="check"
                                    color={BKColor.textColor2}
                                    size={fontSize.h2}
                                  />
                                )}
                              </View>
                              <Text
                                style={
                                  attrValueIds === item2.value_id
                                    ? styles.filterModalTabContentItem
                                        .textActive
                                    : styles.filterModalTabContentItem.text
                                }>
                                {item2.value}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </>
                      ),
                  )
                ) : (
                  <></>
                )}
              </View>
            </View>

            <View style={styles.filterModalFooter}>
              <TouchableOpacity
                style={styles.filterModalButton.button}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.filterModalButton.text}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterModalButton.button,
                  {backgroundColor: BKColor.textColor2},
                ]}
                onPress={() => {
                  _getAllProducts(androidId, true);
                }}>
                <Text
                  style={[
                    styles.filterModalButton.text,
                    {color: BKColor.white},
                  ]}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default ProductList;
