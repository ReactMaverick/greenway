import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontFamily, fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
  headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

  cartDetailsSec: {
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingVertical: hp('2%'),
    backgroundColor: BKColor.bgColor,
    // paddingH: wp('2%'),
    borderRadius:10,
    shadowColor: 'rgba(23, 149, 94, 0.90)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    margin: 5,
    elevation: 10,
    // marginTop: hp('3%')
    // borderBottomWidth: 1,
    // borderStyle: 'solid',
    // borderBottomColor: '#dddddd'
  },

  cartImgSec: {
    flex: 1.4,
    alignItems:'center',
    paddingVertical: hp('1.5%')
  },
  productImageSec: {
    // width: wp('25%')
    shadowColor: 'rgba(23, 149, 94, 0.90)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    margin: 5,
    elevation: 10,
    backgroundColor: BKColor.white,
    borderRadius: wp('12.5%'),
    // paddingVertical:hp('1%'),
    width: wp('15%'),
    height: wp('15%'),
  },
  itemImage: {
    width: wp('15%'),
    height: wp('15%'),
  },

  cartDecSec: {
    width: '100%',
    // lineHeight: 27
  },

  cartDecHeading: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.bold,
    color: BKColor.textColor1,
    lineHeight: 30
  },

  cartAttr: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.medium,
    color: BKColor.textColor1
  },

  cartQtySec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%')
  },
  cartMinus: {
    fontSize: fontSize.h2,
    color: BKColor.textColor2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    marginRight: wp('4%')
  },
  cartQty: {
    fontSize: fontSize.h4,
    fontWeight: '700',
    color: BKColor.textColor1
  },
  cartPlus: {
    fontSize: fontSize.h2,
    color: BKColor.textColor2,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('1%'),
    marginLeft: wp('4%')
  },

  cartDltSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: wp('18%'),
    flex:1,
    paddingTop: 5
  },

  cartDltIcon: {
    fontSize: fontSize.bh,
    backgroundColor: BKColor.white,
    padding: wp('2%'),
    borderRadius: 15
  },
  cartPrice: {
    fontSize: fontSize.h3,
    fontFamily:fontFamily.bold,
    color: BKColor.textColor2,
    marginTop: hp('2%')
  },
  cartQtyOuter: {
    flex: 0.9,
    backgroundColor:BKColor.textColor2,
    justifyContent:'center',
    borderBottomRightRadius:11,
    borderTopRightRadius:11
  },

});
