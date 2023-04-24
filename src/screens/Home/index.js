import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
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
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
// components
import PopularProducts from '../../common/components/home/PopularProducts';
import WholeSaleProduct from '../../common/components/home/WholeSaleProduct';
import Slider from '../../common/components/home/Slider';
import Banner from '../../common/components/home/Banner';
import Brands from '../../common/components/home/Brands';
import ShippingArea from '../../common/components/home/ShippingArea';
import GiftsArea from '../../common/components/home/GiftsArea';
import PopularCategory from '../../common/components/home/PopularCategory';
import {useSelector, useDispatch} from 'react-redux';
import CustomStatusBar from '../../common/components/statusbar';

function Home({navigation}) {
  // const userData = useSelector(state => state.userReducer.value);
  // console.log('userData', userData);

  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
        <CustomStatusBar/>
      <ScrollView style={pageContainerStyle}>
        <View style={pageHeader}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <Image
              source={require('../../assets/images/menu_alt_03.png')}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Greenway</Text>
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


        <Slider navigation={navigation} />
        {/* <Banner navigation={navigation} /> */}
        <PopularProducts navigation={navigation} />
        <WholeSaleProduct navigation={navigation} />
        {/* <Brands navigation={navigation} /> */}
        <PopularCategory navigation={navigation} />
        {/* <ShippingArea navigation={navigation} /> */}

        {/* <GiftsArea navigation={navigation} /> */}




      </ScrollView>
    </SafeAreaView>
  );
}
export default Home;
