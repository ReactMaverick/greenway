import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { fontSize } from './src/common/values/BKStyles';
import { BKColor } from './src/common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeIcon from './src/assets/images/HomeIcon';
import CartIcon from './src/assets/images/CartIcon';
import SlideMenu from './src/common/components/SlideMenu';
import { useSelector, useDispatch } from 'react-redux';
import { userDetails } from './src/redux/reducers/UserReducer';

// screens
import List from './src/screens/List';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import OtpVerification from './src/screens/OtpVerification';
import ResetPassword from './src/screens/ResetPassword';
import ProductList from './src/screens/ProductList';
import ProductDetails from './src/screens/ProductDetails';
import CategoryList from './src/screens/CategoryList';
import Cart from './src/screens/Cart';
import AboutUs from './src/screens/AboutUs';
import ContactUs from './src/screens/ContactUs';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import TermsAndConditions from './src/screens/TermsAndConditions';
import Faq from './src/screens/Faq';
import MyProfile from './src/screens/MyProfile';
import MyAccount from './src/screens/MyAccount';
import MyOrders from './src/screens/MyOrders';
import OrderDetails from './src/screens/OrderDetails';
import MyAddress from './src/screens/MyAddress';
import Wishlist from './src/screens/Wishlist';
import Blogs from './src/screens/Blogs';
import BlogDetails from './src/screens/BlogDetails';
import Checkout from './src/screens/Checkout';
import ForgetPassword from './src/screens/ForgetPassword';
import FpOtpVerification from './src/screens/FpOtpVerification';
import UpdatePassword from './src/screens/UpdatePassword';
import Search from './src/screens/Search';
import styles from './src/screens/Home/styles';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: '80%',
        },
      }}
      drawerContent={props => <SlideMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}



function MyTabBar({ state, descriptors, navigation }) {

  const icons = [
    'home', // Icon name for Home tab
    'user', // Icon name for Profile tab
    'shopping-cart', // Icon name for Cart tab
    'list', // Icon name for Orders tab
    'cog',  // Icon name for Settings tab
  ];
  const customMargin = [
    '-1%', // Icon name for Home tab
    '0%', // Icon name for Profile tab
    '1%', // Icon name for Cart tab
    '0%', // Icon name for Orders tab
    '-1%',  // Icon name for Settings tab
  ];
  return (
    <View style={{ marginTop: hp('-8%') }}>
      <ImageBackground source={require('../greenway/src/assets/images/tabBackground.png')}
        style={Styles.backgroundImg}
      >

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const icon = isFocused ? (

            <View style={[Styles.TabActiveIcon, { marginTop: hp(customMargin[index]) }]}>
              <FontAwesome name={icons[index]} size={hp('4%')} color={BKColor.white} />
            </View>
          ) : (
            <View style={[Styles.TabInActiveIcon, { marginTop: hp(customMargin[index]) }]}>
              <FontAwesome name={icons[index]} size={hp('4%')} color={BKColor.textColor1} />
            </View>
          );

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
            key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              {icon}
            </TouchableOpacity>
          );
        })}

      </ImageBackground>
    </View>
  );
}


const BottomTab = createBottomTabNavigator();
function MyTabs() {
  const userData = useSelector(state => state.UserReducer.value);
  const cartData = useSelector(state => state.CartReducer.value);
  // const userDetails = useSelector(state => state.userReducer);
  // const { cartData } = useSelector((state) => state.CartReducer);

  const dispatch = useDispatch();
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   //backgroundColor: BKColor.bgColor,

        //   height: hp('12%'),



        // },
        // tabBarActiveTintColor: BKColor.white,
        // tabBarInactiveTintColor: BKColor.textColor1,
      })}

      tabBar={(props) => <MyTabBar {...props} />}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={MyDrawer}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Animated.View style={Styles.activeDiv}>
                <HomeIcon color={color} width={size} height={size} />
              </Animated.View>
            ) : (
              <>
                <View style={Styles.inActiveDiv}>
                  <HomeIcon color={color} width={size} height={size} />
                </View>
                <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>Home</Text>
              </>
            ),
        }}
      />
      {userData != null ? (
        <BottomTab.Screen
          name="My Profile"
          component={MyProfile}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Animated.View style={Styles.activeDiv}>
                  <FontAwesome name={icons[index]} size={size} color={color} />
                </Animated.View>
              ) : (
                <>
                  <View style={Styles.inActiveDiv}>
                    <FontAwesome name={icons[index]} size={size} color={color} />
                  </View>
                  <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>My Profile</Text>
                </>
              ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="My Profile"
          component={Login}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Animated.View style={Styles.activeDiv}>
                  <FontAwesome name={icons[index]} size={size} color={color} />
                </Animated.View>
              ) : (
                <>
                  <FontAwesome name={icons[index]} size={size} color={color} />
                  <Text>My Profile</Text>
                </>
              ),
          }}
        />
      )}

      <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <>
                <Animated.View style={Styles.activeDiv}>
                  <CartIcon color={color} width={size} height={size} />
                  {cartData != null && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        width: 16,
                        height: 16,
                        borderRadius: 15 / 2,
                        right: 10,
                        top: +10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'black',
                          fontSize: 8,
                        }}>
                        {cartData.length}
                      </Text>
                    </View>
                  )}
                </Animated.View>
              </>
            ) : (
              <>
                <View style={Styles.inActiveDiv}>
                  <CartIcon color={color} width={size} height={size} />
                  {cartData != null && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: BKColor.textColor1,
                        width: 16,
                        height: 16,
                        borderRadius: 15 / 2,
                        right: 20,
                        top: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: 8,
                        }}>
                        {cartData.length}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>Cart</Text>
              </>
            ),
        }}
        listeners={{
          tabPress: e => {
            console.log('press');
            dispatch({
              type: 'setShopNowData',
              payload: 0,
            });
          },
        }}
      />
      {userData != null ? (
        <BottomTab.Screen
          name="My Orders"
          component={MyOrders}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Animated.View style={Styles.activeDiv}>
                  <MaterialIcons name="verified" size={size} color={color} />
                </Animated.View>
              ) : (
                <View>
                  <View style={Styles.inActiveDiv}>
                    <MaterialIcons name="verified" size={size} color={color} />
                  </View>
                  <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>My Order</Text>
                </View>
              ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="My Orders"
          component={Login}
          options={{
            tabBarIcon: ({ color, size, focused }) =>
              focused ? (
                <Animated.View style={Styles.activeDiv}>
                  <MaterialIcons name="verified" size={size} color={color} />
                </Animated.View>
              ) : (
                <>
                  <MaterialIcons name="verified" size={size} color={color} />
                  <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>My Order</Text>
                </>
              ),
          }}
        />
      )}

      <BottomTab.Screen
        name="About Us"
        component={AboutUs}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Animated.View style={Styles.activeDiv}>
                <Octicons name="checklist" size={size} color={color} />
              </Animated.View>
            ) : (
              <View>
                <View style={Styles.inActiveDiv}>
                  <Octicons name="checklist" size={size} color={color} />
                </View>
                <Text style={{ color: BKColor.textColor1, textAlign: 'center' }}>About Us</Text>
              </View>
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}
const Styles = StyleSheet.create({
  activeDiv: {
    backgroundColor: BKColor.textColor1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('8%'),
    width: hp('8%'),
    borderRadius: hp('4%'),
    marginBottom: hp('8%'),
  },
  inActiveDiv: {
    borderWidth: 1,
    borderColor: BKColor.textColor1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('8%'),
    width: hp('8%'),
    backgroundColor: BKColor.white
  },
  backgroundImg: {
    height: hp('12%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TabActiveIcon: {
    borderWidth: 1,
    borderColor: BKColor.textColor1,
    backgroundColor: BKColor.textColor1,
    borderRadius: wp('12.5%'),
    width: wp('15%'),
    height: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('2.5%')
  },
  TabInActiveIcon: {
    borderWidth: 1,
    borderColor: BKColor.textColor1,
    backgroundColor: BKColor.white,
    borderRadius: wp('12.5%'),
    width: wp('15%'),
    height: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp('2.5%')
  },
});
const Stack = createNativeStackNavigator();
function Stack1() {
  const userData = useSelector(state => state.UserReducer.value);
  // const userDetails = useSelector(state => state.userReducer);
  if (userData == null) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FpOtpVerification"
          component={FpOtpVerification}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CategoryList"
          component={CategoryList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Faq"
          component={Faq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="OrderDetails"
          component={OrderDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAddress"
          component={MyAddress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Blogs"
          component={Blogs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlogDetails"
          component={BlogDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Stack1 />
          </PersistGate>
        </Provider>
        <FlashMessage position="bottom" floating={true} duration={3000} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
