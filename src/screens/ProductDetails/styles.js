import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize, fontFamily } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({
  productImageSection: {
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('5%'),
    marginBottom: hp('4%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    itemImage: {
      width: '100%',
      height: wp('30%'),
    },
  },
  imageSlider: {
    width: wp('91%'),
    // marginTop: hp('3%'),
    marginRight: wp('9%'),
    // marginLeft: wp('5%'),
    height: hp('20%'),
    // paddingHorizontal: wp('10%'),
    // paddingVertical: hp('1%'),
    // justifyContent: 'flex-end',
  },
  productNameAttrSec: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingBottom: hp('2%')
  },
  productName: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: BKColor.textColor2
  },
  productAttr: {
    fontSize: fontSize.h4,
    color: BKColor.textColor2,
    marginTop: hp('1%')
  },
  productAttrItem: {
    alignItems: 'center',
    padding: wp('2%'),
    // width: '100%',
    marginRight: wp('2%'),
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: BKColor.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  productAttrItemActive: {
    alignItems: 'center',
    padding: wp('2%'),
    // width: '100%',
    marginRight: wp('2%'),
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: BKColor.textColor2,
  },
  productPriceSec: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  productOldPrice: {
    fontSize: fontSize.h4,
    fontWeight: '700',
    marginRight: wp('3%'),
    textDecorationLine: 'line-through'
  },
  productPrice: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: BKColor.textColor2,
  },
  productPriceQtySec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingBottom: hp('2%')
  },
  productQtySec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productMinus: {
    fontSize: fontSize.h2,
    color: BKColor.textColor2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    marginRight: wp('3%')
  },
  productQty: {
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: BKColor.textColor1
  },
  productPlus: {
    fontSize: fontSize.h2,
    color: BKColor.textColor2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    marginLeft: wp('3%')
  },
  productDecSec: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingBottom: hp('2%')
  },
  productDecHeading: {
    fontSize: fontSize.h3,
    fontWeight: '700',
    color: BKColor.textColor2,
    marginTop: hp('2%')
  },
  productDec: {
    fontSize: fontSize.h4,
    fontWeight: '400',
    color: BKColor.textColor1,
    lineHeight: 22
  },
  productReviewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('2%')
  },
  productReview: {
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: BKColor.textColor2,
  },
  productStar: {
    color: BKColor.textColor2
  },
  button: {
    alignItems: 'center',
    padding: hp('2%'),
    marginTop: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: BKColor.btnBackgroundColor1
  },
  text: {
    color: '#FFFFFF',
    fontSize: fontSize.h3,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  addToCartSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('4%')
    // alignItems:'center'
  },
  addToCartIcon: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    width: '9%'
  },
  addToCartBtn: {
    width: '15%'
  },
  buyNowBtn: {
    width: '80%'
  },
  cartWishlistIcon: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'

  },
  modalStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productReviewList: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('2%')
  },
  reviewStar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewSec: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('2%')
  }
});
