import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BKColor } from '../../common/values/BKColor';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { logOut } from '../../redux/reducers/UserReducer';
import CustomStatusBar from '../../common/components/statusbar';

function MyProfile({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // const userData = useSelector(state => state.userReducer.value);

  const socialSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };
  //   useEffect(() => {}, [navigation]);

  return (
    <SafeAreaView>
      <CustomStatusBar />
      <View style={pageContainerStyle2}>

      <View style={pageHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Fontisto
              name="arrow-left"
              color={BKColor.textColor1}
              size={fontSize.h2}
            />
          </TouchableOpacity>
          <Text style={pageHeader.text}>Profile</Text>
          <View style={{ width: '10%' }}></View>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: hp('7%') }}>
          {/* <View style={pageHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Fontisto name="arrow-left-l" color={BKColor.textColor1} size={fontSize.h2} />
                </TouchableOpacity>
                <Text style={pageHeader.text}>Signup</Text>
                <View></View>
            </View> */}
            
          <View style={styles.loginLogoSection}>
            <View style={styles.loginLogoSection.logo}>
              <Image
                source={require('../../assets/images/user.png')}
                resizeMode="cover"
                style={{
                  height: wp('20%'), width: wp('20%'), resizeMode: "cover",
                  backgroundColor:'red'
                }}
              />
            </View>
            <Text style={styles.loginLogoSection.text2}>Fresh Fruits</Text>
          </View>
          <View style={[styles.regContainer, { paddingTop: hp('6%') }]}>
            {/* {userData != null ? */}
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyAccount')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <SimpleLineIcons
                    name="user"
                    style={{ color: BKColor.textColor1 }}
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>My Account</Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: BKColor.textColor1 }}
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            {/* :
                    <TouchableOpacity style={styles.regContainer.item} onPress={() => navigation.navigate('Login')}>
                        <View style={styles.itemOuter}>
                            <View style={styles.textOuter}>
                                <SimpleLineIcons name="user" color='#000000' size={fontSize.h2} />
                                <Text style={styles.regContainer.text1}>My Account</Text>
                            </View>
                            <Entypo name="chevron-thin-right" color='#000000' size={fontSize.h2} />
                        </View>
                    </TouchableOpacity>
                } */}
            {/* {userData != null ? */}
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyAddress')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <MaterialCommunityIcons
                    name="format-list-checkbox"
                    style={{ color: BKColor.textColor1 }}
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>My Address</Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: BKColor.textColor1 }}
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            {/* :
                    <TouchableOpacity style={styles.regContainer.item} onPress={() => navigation.navigate('Login')}>
                        <View style={styles.itemOuter}>
                            <View style={styles.textOuter}>
                                <MaterialCommunityIcons name="format-list-checkbox" color='#000000' size={fontSize.h2} />
                                <Text style={styles.regContainer.text1}>My Address</Text>
                            </View>
                            <Entypo name="chevron-thin-right" color='#000000' size={fontSize.h2} />
                        </View>
                    </TouchableOpacity>
                } */}
            {/* {userData != null ? */}
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('MyOrders')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <Feather name="package"
                    style={{ color: BKColor.textColor1 }}
                    size={fontSize.bh} />
                  <Text style={styles.regContainer.text1}>My Orders</Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: BKColor.textColor1 }}
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            {/* :
                    <TouchableOpacity style={styles.regContainer.item} onPress={() => navigation.navigate('Login')}>
                        <View style={styles.itemOuter}>
                            <View style={styles.textOuter}>
                                <Feather name="package" color='#000000' size={fontSize.bh} />
                                <Text style={styles.regContainer.text1}>My Orders</Text>
                            </View>
                            <Entypo name="chevron-thin-right" color='#000000' size={fontSize.h2} />
                        </View>
                    </TouchableOpacity>
                } */}
            {/* {userData != null ? */}

            {/* <TouchableOpacity
            style={styles.regContainer.item}
            onPress={() => navigation.navigate('Wishlist')}>
            <View style={styles.itemOuter}>
              <View style={styles.textOuter}>
                <EvilIcons name="heart" 
                style={{ color: BKColor.textColor1 }}
                size={fontSize.bh} />
                <Text style={styles.regContainer.text1}>WishList</Text>
              </View>
              <Entypo
                name="chevron-thin-right"
                style={{ color: BKColor.textColor1 }}
                size={fontSize.h2}
              />
            </View>
          </TouchableOpacity> */}
            {/* :
                    <TouchableOpacity style={styles.regContainer.item} onPress={() => navigation.navigate('Login')}>
                        <View style={styles.itemOuter}>
                            <View style={styles.textOuter}>
                                <EvilIcons name="heart" color='#000000' size={fontSize.bh} />
                                <Text style={styles.regContainer.text1}>WishList</Text>
                            </View>
                            <Entypo name="chevron-thin-right" color='#000000' size={fontSize.h2} />
                        </View>
                    </TouchableOpacity>
                } */}

            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => navigation.navigate('Cart')}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <MaterialCommunityIcons
                    name="cart-heart"
                    style={{ color: BKColor.textColor1 }}
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>Cart</Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: BKColor.textColor1 }}
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.regContainer.item}
              onPress={() => {
                // dispatch({ type: 'setUserData', payload: null })
                // dispatch({ type: 'setCartData', payload: null })
                // dispatch({ type: 'setWishlistData', payload: null })
                // dispatch({ type: 'setCouponDetails', payload: null })
                // try{
                //     socialSignOut()
                //   }catch(e){
                //     console.log('error',e)
                //   }
                // navigation.navigate('Login')
                dispatch(logOut());
                showMessage({
                  message: 'You are logged out',
                  type: 'info',
                  backgroundColor: '#808080',
                });
              }}>
              <View style={styles.itemOuter}>
                <View style={styles.textOuter}>
                  <MaterialIcons
                    name="logout"
                    style={{ color: BKColor.textColor1 }}
                    size={fontSize.h2}
                  />
                  <Text style={styles.regContainer.text1}>Log Out</Text>
                </View>
                <Entypo
                  name="chevron-thin-right"
                  style={{ color: BKColor.textColor1 }}
                  size={fontSize.h2}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default MyProfile;
