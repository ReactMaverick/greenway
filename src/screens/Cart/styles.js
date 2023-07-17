import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontFamily, fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
  headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

  cartDetailsSec: {
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingVertical: hp('1%'),
    // borderBottomWidth: 1,
    // borderStyle: 'solid',
    // borderBottomColor: '#dddddd',
    backgroundColor: BKColor.bgColor,
    borderRadius: 11,
    shadowColor: 'rgba(23, 149, 94, 0.90)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    margin: 5,
    elevation: 10,
  },

  cartImgSec: {
    flex: 1.4,
    alignItems:'center',
    paddingVertical: hp('1.5%')
  },

  itemOuter: {
    // marginTop: hp('-10%'),
    shadowColor: 'rgba(23, 149, 94, 0.90)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    margin: 5,
    elevation: 10,
    backgroundColor: BKColor.white,
    borderRadius: wp('12.5%'),
    // paddingVertical:hp('1%'),
    width: wp('20%'),
    height: wp('20%'),
  },

  itemImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('12.5%'),
    // marginHorizontal: wp('2%'),
  },
  cartQtyOuter: {
    flex: 0.9,
    backgroundColor:BKColor.textColor2,
    justifyContent:'center',
    borderBottomRightRadius:11,
    borderTopRightRadius:11
  },
  cartDecSec: {
    width: '100%',
    // lineHeight: 27,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
  cartDecAttriSec: {
    width: '100%',
    flexDirection: 'row',
  },
  cartDecHeading: {
    fontSize: fontSize.h3,
    fontFamily:fontFamily.bold,
    color: BKColor.textColor1,
    lineHeight: 30
  },
  itemAttrValue: {
    fontSize: fontSize.h5,
    fontFamily:fontFamily.regular,
    color: BKColor.textColor2 
  },
  cartAttr: {
    fontSize: fontSize.h4,
    fontWeight: '500',
  },

  cartQtySec: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    // marginTop: hp('2%')
    // backgroundColor:'red'
  },
  cartMinus: {
    fontSize: fontSize.h2,
    color: BKColor.white,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: BKColor.inputBorder,
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    // marginRight: wp('4%')
  },
  cartQty: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.bold,
    color: BKColor.white
  },
  cartPlus: {
    fontSize: fontSize.h2,
    color: BKColor.white,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: BKColor.inputBorder,
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    // marginLeft: wp('4%')
  },

  cartDltSec: {
    width: wp('10%'),
  },

  cartDltIcon: {
    fontSize: fontSize.bh,
    backgroundColor: '#F9ECE9',
    padding: wp('2%'),
    borderRadius: 15
  },
  cartPrice: {
    fontSize: fontSize.h3,
    fontFamily:fontFamily.bold,
    color: BKColor.textColor2,
    marginTop: hp('2%')
  },
  cartCouponHeading: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.bold,
    color: BKColor.textColor1
  },
  // couponInputSec: {
  //   borderRadius: 30,
  //   borderStyle: 'solid',
  //   borderWidth: 1,
  //   borderColor: BKColor.inputBorder,
  //   paddingHorizontal: wp('4%'),
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   height: hp('6.5%'),
  //   width:wp('80%')
  // },
  // inputText: {
  //   color: BKColor.textColor1,
  //   fontFamily: fontFamily.regular,
  //   fontSize: fontSize.h3,
  // },
  inputContainerWidth: {
    width: '90%'
  },
  // couponApplyBtn: {
  //   width: wp('31%')
  // },
  // couponApplyText: {
  //fontSize: fontSize.h3,
  //   fontWeight: '700',
  //color: BKColor.textColor2,
  //   paddingVertical: wp('4%'),
  //   paddingHorizontal: wp('10%'),
  //   backgroundColor: '#F9ECE9',
  //   borderRadius: 10
  // },
  cartItemSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:1
  },
  totalItemHeading: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.medium,
    color: BKColor.textColor1,
    marginBottom: hp('1%'),
  },

  totalItem: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.bold,
    color: BKColor.textColor1,
    textAlign:'right'
  },
  cartTotalPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('1%'),
    flex:1
  },
  cartGiftsSec: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: BKColor.boxBorder,
    padding: wp('4%'),
    borderRadius: 15,
    marginTop: hp('3%')
  },
  giftsSec: {
    flexDirection: 'row',
    // justifyContent:'space-between',
    alignItems: 'flex-start',
    marginVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: BKColor.boxBorder,
    paddingBottom: hp('3%')
  },
  giftsItemText: {
    fontSize: fontSize.h3,
    fontWeight: '500',
    color: BKColor.textColor1,
  },
  giftsItemPriceText: {
    fontSize: fontSize.h3,
    fontWeight: '500',
    color: BKColor.textColor1,
    textDecorationLine: 'line-through'
  },
  giftsItemPriceText2: {
    fontSize: fontSize.h3,
    fontWeight: '500',
    color: BKColor.textColor2,
    paddingLeft: wp('2%')
  }
});
