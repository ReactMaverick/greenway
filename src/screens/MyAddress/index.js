import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {pageContainerStyle,pageContainerStyle2, pageHeader} from '../../common/values/BKStyles';
import {
  inputLevel,
  inputBottomLevel,
  textInput,
  inputContainer,
  activeButton,
  fontSize,
  Button,
  placeHolderColor,
} from '../../common/values/BKStyles';
import {BKColor} from '../../common/values/BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GET_MY_ADDRESS_API,
  POST_ADD_MY_ADDRESS_API,
  POST_UPDATE_MY_ADDRESS_API,
  POST_DELETE_MY_ADDRESS_API,
  GET_STATE_API,
  POST_DISTRICT_API,
  GET_PINCODE_API,
} from '../../config/ApiConfig';
import {GetApiFetch, PostApiFetch} from '../../config/CommonFunction';
import {useSelector, useDispatch} from 'react-redux';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {Dropdown} from 'react-native-element-dropdown';
import CustomStatusBar from '../../common/components/statusbar';
import {useIsFocused} from '@react-navigation/native';

function MyAddress({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(state => state.UserReducer.value);
  // const { selectedShippingAddress } = useSelector(
  //   state => state.SelectedShippingAddressReducer,
  // );
  // const cartData = useSelector(state => state.CartReducer.value);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const [billingAddressList, setBillingAddressList] = useState([]);
  const [shippingAddressList, setShippingAddressList] = useState([]);
  const [addAddressType, setAddAddressType] = useState('shipping');

  const [showError, setShowError] = useState(false);
  const [fieldError, setFieldError] = useState('');

  // add address modal fields

  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addMobile, setAddMobile] = useState('');
  const [addVillageName, setAddVillageName] = useState('');
  const [addState, setAddState] = useState('');
  const [addDistrict, setAddDistrict] = useState('');
  const [addCity, setAddCity] = useState('');
  const [addPincode, setAddPincode] = useState('');

  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [pincodeList, setPincodeList] = useState([]);
  const [showPincodeSuggession, setShowPincodeSuggession] = useState(false);

  // edit address modal fields
  const [modalItem, setModalItem] = useState('');

  const [editAddressBookId, setEditAddressBookId] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editVillageName, setEditVillageName] = useState('');
  const [editState, setEditState] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editPincode, setEditPincode] = useState('');

  const [editFieldError, setEditFieldError] = useState('');

  const [isFocus, setIsFocus] = useState(false);
  const [isDistrictFocus, setIsDistrictFocus] = useState(false);
  const [isPincodeFocus, setIsPincodeFocus] = useState(false);

  const [zipcodeInput, setZipCodeInput] = useState(null);
  const [autoSuggestion, setAutoSuggestion] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const closeModal = () => {
    setModalVisible(false);
    setAddName('');
    setAddEmail('');
    setAddMobile('');
    setAddVillageName('');
    setAddState('');
    setAddCity('');
    setAddDistrict('');
    setAddPincode('');
    setFieldError('');
  };
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const _setModalItem = async item => {
    //  console.log("item====>",item);
     _getDistrict(item.entry_state);
     _getPincode(item.districts_id);
     searchPincode(item.pincodes_val);
     setModalItem(item);
     setEditAddressBookId(item.address_book_id);
     setEditName(item.entry_firstname);
     setEditEmail(item.entry_email);
     setEditMobile(item.entry_phone);
     setEditVillageName(item.entry_street_address);
     setEditState(parseInt(item.entry_state));
     // setEditState(item.states_name);
     setEditCity(item.entry_city);
     setEditPincode(item.pincodes_val);
     // setEditPincode(item.entry_postcode);
     setEditDistrict(item.districts_id);
  };

  const _getState = async () => {
    let params = '?';
    await GetApiFetch(GET_STATE_API, params)
      .then(([status, response]) => {
        if (status == 200) {
          let arr = [];
          //  console.log('stateList==>',response.states);
          // setStateList(response.states);
          response.states.forEach(value => {
            var obj = {};
            obj['label'] = value.states_name;
            obj['value'] = value.states_id;

            arr.push(obj);
          });
          // console.log("list", arr)
          setStateList(arr);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {});
  };
  const _getDistrict = async statesId => {
    const formData = new FormData();
    formData.append('states_id', statesId);
    PostApiFetch(POST_DISTRICT_API, formData)
      .then(([status, response]) => {
        if (status == 200) {
          // setDistrictList(response.cities);
          let arr = [];
          response.cities.forEach(value => {
            var obj = {};
            obj['label'] = value.districts_name;
            obj['value'] = value.districts_id;

            arr.push(obj);
          });
          // console.log('Dlist', arr);
          setDistrictList(arr);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log('_getDistrictError - ', error))
      .finally(() => {});
  };
  const _getPincode = async districtId => {
    let params = '?districts_id=' + districtId;
    GetApiFetch(GET_PINCODE_API, params)
      .then(([status, response]) => {
        if (status == 200) {
          // console.log('response', response);
          if (response.status == true) {
            // setPincodeList(response.pincodes);
            // setShowPincodeSuggession(!showPincodeSuggession);
            let arr = [];
            response.pincodes.forEach(value => {
              var obj = {};
              obj['label'] = value.pincodes_val;
              obj['value'] = value.pincodes_id;

              arr.push(obj);
            });

            setPincodeList(arr);
          }
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {});
  };
  

  const searchPincode = zipcodeInputText => {
   
    
    setZipCodeInput(zipcodeInputText);
   
    let newData = [];
    if (zipcodeInputText!=null) {
      let arr = [];
      let temparr = pincodeList;
      newData = temparr.filter(function (item) {
        // console.log('item ',item.label)
        const itemData = item.label.toUpperCase();
        // arr.push(itemData);
        const textData = zipcodeInputText.toUpperCase();
        return itemData.includes(textData);
      });
      

      setAutoSuggestion([...newData]);
    } else {
      setAutoSuggestion([]);
    }
  };

  const _getAddress = async () => {
    let params = '?user_id=' + userData.id;
    GetApiFetch(GET_MY_ADDRESS_API, params)
      .then(([status, response]) => {
        // console.log("Address==>", response)

        if (status == 200) {
          setBillingAddressList(response.userBillingAddress);
          setShippingAddressList(response.userShippingAddressList);
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const _insertAddress = () => {
    if (addName == '') {
      setFieldError('please enter your name');
    } else if (addEmail == '') {
      setFieldError('please enter Email');
    } else if (addMobile == '') {
      setFieldError('please enter phone Number');
    } else if (addMobile.length != 10) {
      setFieldError('please enter correct phone number');
    } else if (addVillageName == '') {
      setFieldError('please put your Street Address');
    } else if (addState == '') {
      setFieldError('Please put your State');
    } else if (addDistrict == '') {
      setFieldError('Please put your District');
    } else if (addCity == '') {
      setFieldError('please enter your city');
    } else if (addPincode == '') {
      setFieldError('please enter your pin code');
    } else {
      const formData = new FormData();
      formData.append('user_id', userData.id);
      formData.append('address_type', addAddressType);
      formData.append('entry_firstname', addName);
      formData.append('entry_email', addEmail);
      formData.append('entry_phone', addMobile);
      formData.append('entry_street_address', addVillageName);
      formData.append('entry_state', addState);
      formData.append('entry_city', addCity);
      formData.append('entry_postcode', addPincode);
      formData.append('districts_id', addDistrict);

      PostApiFetch(POST_ADD_MY_ADDRESS_API, formData).then(
        ([status, response]) => {
          if (status == 200) {
            // console.log("response==>", response)
            _getAddress();
            closeModal();
            showMessage({
              message: 'Address Added successfully...',
              type: 'info',
              backgroundColor: '#42850A',
            });
            // console.log("Address Added successfully...");
          }
        },
      );
    }
  };

  const _deleteAddress = address_book_id => {
    const formData = new FormData();
    formData.append('address_book_id', address_book_id);
    PostApiFetch(POST_DELETE_MY_ADDRESS_API, formData).then(
      ([status, response]) => {
        if (status == 200) {
          // console.log('POST_DELETE_ADDRESS_API==>', response);
          _getAddress();
          showMessage({
            message: 'ShippingAddress deleted from your account successfully.',
            type: 'info',
            backgroundColor: 'green',
          });
          // console.log("ShippingAddress deleted from your account successfully.");
        }
      },
    );
  };

  const _updateAddress = () => {
    if (editName == '') {
      setEditFieldError('please enter your name');
    } else if (editEmail == '') {
      setEditFieldError('please enter Email');
    } else if (editMobile == '') {
      setEditFieldError('please enter phone Number');
    } else if (editMobile.length != 10) {
      setEditFieldError('please enter correct phone number');
    } else if (editVillageName == '') {
      setEditFieldError('please put your villege name!!');
    } else if (editState == '') {
      setEditFieldError('please enter your State');
    } else if (editDistrict == '') {
      setEditFieldError('please enter your District');
    } else if (editCity == '') {
      setEditFieldError('please enter your city');
    } else if (editPincode == '') {
      setEditFieldError('please enter your pincode');
    } else {
      const formData = new FormData();
      formData.append('address_book_id', editAddressBookId);
      formData.append('entry_firstname', editName);
      formData.append('entry_street_address', editVillageName);
      formData.append('entry_city', editCity);
      formData.append('entry_state', editState);
      formData.append('districts_id', editDistrict);
      formData.append('entry_postcode', editPincode);
      formData.append('entry_phone', editMobile);
      formData.append('entry_email', editEmail);
      // console.log('updateformData', formData);
      PostApiFetch(POST_UPDATE_MY_ADDRESS_API, formData).then(
        ([status, response]) => {
          if (status == 200) {
            // console.log("POST_UPDATE_ADDRESS_API==>", response)
            _getAddress();
            setEditModalVisible(!isEditModalVisible);
            showMessage({
              message: 'Address Updated Successfully...',
              type: 'info',
              backgroundColor: 'green',
            });
            // console.log("Address Updated Successfully...");
          }
        },
      );
    }
  };
  useEffect(() => {
    _getState();
    if (isFocused) {
      _getAddress();
    }
  }, [navigation, isFocused]);
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
          <Text style={pageHeader.text}>My Address</Text>
          <View></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: hp('3%')}}>
            <View style={styles.addAddress}>
              <Text style={styles.myAddHeading}>Billing Address</Text>
              {billingAddressList == null && (
                <TouchableOpacity
                  style={styles.addAddress.button}
                  onPress={() => {
                    setAddAddressType('billing');
                    toggleModal();
                  }}>
                  <Text style={styles.addAddressText}>
                    Add+
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {billingAddressList != null ? (
              <View style={styles.contactUsSec}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: wp('75%')}}>
                    <Text style={styles.myOrderText}>
                      {billingAddressList.entry_firstname}
                    </Text>
                    <Text style={styles.contactUsText}>
                      Address :{' '}
                      {billingAddressList.entry_street_address +
                        ',' +
                        billingAddressList.entry_city +
                        ',' +
                        billingAddressList.states_name +
                        ',' +
                        billingAddressList.districts_name +
                        ',' +
                        billingAddressList.pincodes_val}
                    </Text>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        _setModalItem(billingAddressList).then(toggleEditModal);
                        _getPincode();
                      }}>
                      <FontAwesome
                        name="edit"
                        color={BKColor.textColor2}
                        size={wp('7%')}
                        style={{alignItems: 'center', marginBottom: hp('1%')}}
                      />
                    </TouchableOpacity>

                    {/* <MaterialCommunityIcons name="delete-circle-outline" color={BKColor.textColor2} size={wp('8%')} onPress={() => {
                                        _deleteAddress(billingAddressList.address_book_id);
                                    }} /> */}
                  </View>
                </View>
                <Text style={styles.contactUsText}>
                  Phone : {billingAddressList.entry_phone}
                </Text>
                <Text style={styles.contactUsText}>
                  Email : {billingAddressList.entry_email}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={{fontWeight: '600'}}>
                  No billing address added
                </Text>
              </View>
            )}
          </View>

          <View style={{marginTop: hp('3%')}}>
            <View style={styles.addAddress}>
              <Text style={styles.myAddHeading}>Shipping Address</Text>
              <TouchableOpacity
                style={styles.addAddress.button}
                onPress={() => {
                  setAddAddressType('shipping');
                  toggleModal();
                }}>
                <Text style={styles.addAddressText}>Add+</Text>
              </TouchableOpacity>
            </View>
            {shippingAddressList.length > 0 ? (
              <View>
                {shippingAddressList.map((item, key) => (
                  <View style={styles.contactUsSec} key={key}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: wp('75%')}}>
                        <Text style={styles.myOrderText}>
                          {item.entry_firstname}
                        </Text>
                        <Text style={styles.contactUsText}>
                          Address :
                          {item.entry_street_address +
                            ',' +
                            item.entry_city +
                            ',' +
                            item.states_name +
                            ',' +
                            item.districts_name +
                            ',' +
                            item.pincodes_val}
                        </Text>
                      </View>

                      <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => {
                            _setModalItem(item).then(toggleEditModal);
                          }}>
                          <FontAwesome
                            name="edit"
                            color={BKColor.textColor2}
                            size={wp('7%')}
                            style={{
                              alignItems: 'center',
                              marginBottom: hp('1%'),
                            }}
                          />
                        </TouchableOpacity>

                        <MaterialCommunityIcons
                          name="delete-circle-outline"
                          color={BKColor.textColor6}
                          size={wp('8%')}
                          onPress={() => {
                            _deleteAddress(item.address_book_id);
                          }}
                        />
                      </View>
                    </View>
                    <Text style={styles.contactUsText}>
                      Phone : {item.entry_phone}
                    </Text>
                    <Text style={styles.contactUsText}>
                      Email : {item.entry_email}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text style={{fontWeight: '600'}}>
                  No shipping address added
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={{
            margin: wp('5%'),
            backgroundColor: BKColor.white,
            padding: wp('3%'),
            borderRadius: 15,
          }}>
          <ScrollView>
            <View style={styles.headerPopup}>
              {addAddressType === 'shipping' && (
                <Text style={styles.modalText}>Add Shipping Address</Text>
              )}
              {addAddressType === 'billing' && (
                <Text style={styles.modalText}>Add Billing Address</Text>
              )}

              <TouchableOpacity onPress={closeModal}>
                <AntDesign name="close" style={styles.modalText} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{textAlign: 'center', color: '#EC1F25'}}>
                {fieldError}
              </Text>
            </View>
            <View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Full Name</Text>
                <TextInput
                  placeholder={'full name'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="fullname"
                  onChangeText={value => setAddName(value)}
                  value={addName}
                  // secureTextEntry={passwordEye}
                  // onChangeText={(password) => setPassword(password)}
                  onFocus={() => {
                    //   setErrorMessage('')
                    // setFieldError('please enter your name')
                    showMessage({
                      message: 'please enter your name',
                      type: 'info',
                      backgroundColor: '#EC1F25',
                    });
                  }}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Email</Text>
                <TextInput
                  placeholder={'email'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="email"
                  onChangeText={value => setAddEmail(value)}
                  value={addEmail}

                  // secureTextEntry={passwordEye}
                  // onChangeText={(password) => setPassword(password)}
                  // onFocus={() => {
                  //   setErrorMessage('')
                  // }}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Mobile No</Text>
                <TextInput
                  placeholder={'mobile no'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="mobileno"
                  onChangeText={value => setAddMobile(value)}
                  value={addMobile}

                  // secureTextEntry={passwordEye}
                  // onChangeText={(password) => setPassword(password)}
                  // onFocus={() => {
                  //   setErrorMessage('')
                  // }}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Street / Village Name</Text>
                <TextInput
                  placeholder={'Street name'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="streetname"
                  onChangeText={value => setAddVillageName(value)}
                  value={addVillageName}

                  // secureTextEntry={passwordEye}
                  // onChangeText={(password) => setPassword(password)}
                  // onFocus={() => {
                  //   setErrorMessage('')
                  // }}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>State</Text>

                <Dropdown
                  style={[
                    styles.textInput,
                    isFocus && {borderColor: '#DDDDDD'},
                  ]}
                  // style={textInput}
                  placeholder={!isFocus ? 'Select State' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  value={addState}
                  onChange={value => {
                    setAddState(value.value);
                    // console.log('value',value)
                    _getDistrict(value.value);
                    setIsFocus(false);
                  }}
                  data={stateList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>District</Text>
                <Dropdown
                  style={[
                    styles.textInput,
                    isDistrictFocus && {borderColor: '#DDDDDD'},
                  ]}
                  // style={textInput}
                  placeholder={!isDistrictFocus ? 'Select District' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsDistrictFocus(true)}
                  onBlur={() => setIsDistrictFocus(false)}
                  value={addDistrict}
                  onChange={value => {
                    setAddDistrict(value.value);
                    _getPincode(value.value);
                    setIsDistrictFocus(false);
                  }}
                  data={districtList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>City</Text>
                <TextInput
                  placeholder={'city'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="city"
                  onChangeText={value => setAddCity(value)}
                  value={addCity}

                  // secureTextEntry={passwordEye}
                  // onChangeText={(password) => setPassword(password)}
                  // onFocus={() => {
                  //   setErrorMessage('')
                  // }}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Pincode</Text>
                <Dropdown
                  style={[
                    styles.textInput,
                    isPincodeFocus && {borderColor: '#DDDDDD'},
                  ]}
                  // style={textInput}
                  placeholder={!isPincodeFocus ? 'Select Pincode' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsPincodeFocus(true)}
                  onBlur={() => setIsPincodeFocus(false)}
                  value={addPincode}
                  onChange={value => {
                    setAddPincode(value.value);
                    setIsPincodeFocus(false);
                  }}
                  data={pincodeList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                />
                <View>
                  {autoSuggestion.map((item, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        setAddPincode(item.value);
                        setZipCodeInput(item.label);
                        setAutoSuggestion([]);
                      }}
                      key={key}>
                      <Text
                        style={{backgroundColor: '#eeeeee', padding: wp('2%')}}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* <TextInput
                                    placeholder={'pincode'}
                                    style={textInput}
                                    key='pincode'
                                    onChangeText={(value) => setAddPincode(value)}
                                    value={addPincode}

                                // secureTextEntry={passwordEye}
                                // onChangeText={(password) => setPassword(password)}
                                // onFocus={() => {
                                //   setErrorMessage('')
                                // }}
                                /> */}
              </View>
              <TouchableOpacity
                style={activeButton.button}
                onPress={_insertAddress}>
                <Text style={activeButton.text}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => closeModal()}
                style={styles.socialLoginButton.button}>
                <Text style={styles.socialLoginButton.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
        {/* Edit    */}
        <Modal
          isVisible={isEditModalVisible}
          onBackdropPress={toggleEditModal}
          style={{
            margin: wp('5%'),
            backgroundColor: BKColor.white,
            padding: wp('3%'),
            borderRadius: 15,
          }}>
          <ScrollView>
            <View style={styles.headerPopup}>
              <Text style={styles.modalText}>Edit Address</Text>

              <TouchableOpacity onPress={toggleEditModal}>
                <AntDesign name="close" style={styles.modalText} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{textAlign: 'center', color: '#EC1F25'}}>
                {editFieldError}
              </Text>
            </View>
            <View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Full Name</Text>
                <TextInput
                  placeholder={'full name'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="fullname"
                  onChangeText={value => setEditName(value)}
                  value={editName}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Email</Text>
                <TextInput
                  placeholder={'email'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="email"
                  onChangeText={value => setEditEmail(value)}
                  value={editEmail}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Mobile No</Text>
                <TextInput
                  placeholder={'mobile no'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="mobileno"
                  onChangeText={value => setEditMobile(value)}
                  value={editMobile}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Street / Village Name</Text>
                <TextInput
                  placeholder={'Street name'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="streetname"
                  onChangeText={value => setEditVillageName(value)}
                  value={editVillageName}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>State</Text>
                <Dropdown
                  style={[
                    styles.textInput,
                    isFocus && {borderColor: '#DDDDDD'},
                  ]}
                  // style={textInput}
                  placeholder={!isFocus ? 'Select State' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  value={editState}
                  onChange={value => {
                    setEditState(value.value);

                    // console.log('value',value)
                    _getDistrict(value.value);
                    setIsFocus(false);
                  }}
                  data={stateList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>District</Text>
                <Dropdown
                  style={[
                    styles.textInput,
                    isDistrictFocus && {borderColor: '#DDDDDD'},
                  ]}
                  // style={textInput}
                  placeholder={!isDistrictFocus ? 'Select District' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsDistrictFocus(true)}
                  onBlur={() => setIsDistrictFocus(false)}
                  value={editDistrict}
                  onChange={value => {
                    setEditDistrict(value.value);
                    _getPincode(value.value);
                    setIsDistrictFocus(false);
                  }}
                  data={districtList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>City</Text>
                <TextInput
                  placeholder={'city'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  key="city"
                  onChangeText={value => setEditCity(value)}
                  value={editCity}
                />
              </View>
              <View style={[inputContainer, {marginTop: hp('1%')}]}>
                <Text style={inputLevel}>Pincode</Text>
                {/* <TextInput
                  placeholder={'pincode'}
                  style={textInput}
                  key="pincode"
                  onChangeText={value => setEditPincode(value)}
                  value={editPincode}
                /> */}
                {/* <Dropdown
                  style={[
                    styles.textInput,
                    isPincodeFocus && { borderColor: '#DDDDDD' },
                  ]}
                  // style={textInput}
                  placeholder={!isPincodeFocus ? 'Select Pincode' : ''}
                  placeholderTextColor={placeHolderColor}
                  onFocus={() => setIsPincodeFocus(true)}
                  onBlur={() => setIsPincodeFocus(false)}
                  value={editPincode}
                  onChange={value => {
                    setEditPincode(value.value);
                    setIsPincodeFocus(false);
                  }}
                  data={pincodeList}
                  valueField="value"
                  labelField="label"
                  dropdownPosition="top"
                /> */}

                <TextInput
                  placeholder={'Search pincode'}
                  placeholderTextColor={placeHolderColor}
                  style={textInput}
                  onChangeText={ value => {
                    // setZipCodeInput(value);
                    // setEditPincode(value);
                    searchPincode(value);
                  }}
                  value={zipcodeInput}
                  defaultValue={editPincode.toString()}
                />
                <View>
                  {autoSuggestion.map((item, key) => (
                    <TouchableOpacity
                      onPress={() => {
                        setEditPincode(item.value);
                        setZipCodeInput(item.label);
                        setAutoSuggestion([]);
                      }}
                      key={key}>
                      <Text
                        style={{backgroundColor: '#eeeeee', padding: wp('2%')}}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={activeButton.button}
                onPress={_updateAddress}>
                <Text style={activeButton.text}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={styles.socialLoginButton.button}>
                <Text style={styles.socialLoginButton.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </SafeAreaView>
    );
  }
}
export default MyAddress;
