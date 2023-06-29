import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  pageContainerStyle,
  pageContainerStyle2,
  pageHeader,
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
} from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// components
import PopularProducts from '../../common/components/home/PopularProducts';
import WholeSaleProduct from '../../common/components/home/WholeSaleProduct';
import Slider from '../../common/components/home/Slider';
import Banner from '../../common/components/home/Banner';
import Brands from '../../common/components/home/Brands';
import ShippingArea from '../../common/components/home/ShippingArea';
import GiftsArea from '../../common/components/home/GiftsArea';
import PopularCategory from '../../common/components/home/PopularCategory';
import { useSelector, useDispatch } from 'react-redux';
import CustomStatusBar from '../../common/components/statusbar';

function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(true);
  // const userData = useSelector(state => state.userReducer.value);
  // console.log('userData', userData);

  // useEffect(() => {}, [navigation]);
  const onRefresh = () => {
    setRefreshing(true);
  };
  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View style={pageContainerStyle2}>
        <View style={pageHeader}>
          <TouchableOpacity
            style={styles.headerIcon}
            // onPress={() => {
            //   navigation.toggleDrawer();
            // }}
            >
            <FontAwesome5
              name="map"
              color={BKColor.textColor1}
              size={fontSize.h3}
              style={styles.headerIcon.icon}
            />
            {/* <Image
              source={require('../../assets/images/menu_alt_03.png')}
              resizeMode="cover"
            /> */}
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/homeHeaderLogo.png')}
            resizeMode="cover"
          />
          {/* <Text style={pageHeader.text}>Greenway</Text> */}
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Fontisto
              name="search"
              color={BKColor.textColor1}
              size={fontSize.h3}
              style={styles.headerIcon.icon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ marginBottom: hp('11%') }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>


          <Slider navigation={navigation} />
          {/* <Banner navigation={navigation} /> */}
          <PopularProducts navigation={navigation} refreshing={refreshing} stopRefreshing={() => {
            setRefreshing(false);
          }} />
          <WholeSaleProduct navigation={navigation} refreshing={refreshing} stopRefreshing={() => {
            setRefreshing(false);
          }} />
          {/* <Brands navigation={navigation} /> */}
          <PopularCategory navigation={navigation} refreshing={refreshing} stopRefreshing={() => {
            setRefreshing(false);
          }} />
          {/* <ShippingArea navigation={navigation} /> */}

          {/* <GiftsArea navigation={navigation} /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default Home;
