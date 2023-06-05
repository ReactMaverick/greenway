import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize, fontFamily } from '../../values/BKStyles';
import { BKColor } from '../../values/BKColor';

export default StyleSheet.create({
  headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },
  imageSlider: {
    width: wp('91%'),
    // marginTop: hp('3%'),
    marginRight: wp('9%'),
    // marginLeft: wp('5%'),
    height: hp('25%'),
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    justifyContent: 'flex-end',
  },
  bannerSlider: {
    width: wp('43.5%'),
    height: hp('15%'),
    marginTop: hp('2%'),
    // marginRight: wp('4%'),
    // marginLeft: wp('5%'),
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    justifyContent: 'flex-end',
  },
  brandsContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingBottom: hp('2%'),
    // marginBottom: hp('3%'),
  },
  brandsSlider: {
    width: wp('35%'),
    marginTop: hp('3%'),
    // marginRight: wp('4%'),
    // marginLeft: wp('5%'),
    height: hp('14%'),
    // paddingHorizontal: wp('10%'),
    paddingVertical: hp('1%'),
    justifyContent: 'flex-end'
  },
  brandsSliderText: {
    alignItems: 'center',
    marginHorizontal: wp('2%'),
    // backgroundColor: 'yellow'
  },
  PopularProductsSection: {
    flex: 1,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleProductContainer: {
    width: wp('45.5%'),
    // height: wp('45.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('10%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex:1,
  },
  // item: {
  //   backgroundColor: 'white',
  //   width: '100%',
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  itemLeft: {
    backgroundColor: 'white',
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: '5%',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('0.8%'),
  },
  itemRight: {
    backgroundColor: 'white',
    width: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: '5%',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('0.8%'),
  },
  itemImage: {
    width: wp('30%'),
    height: wp('30%'),
  },
  itemText: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    marginTop: 10,
  },
  itemName: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.regular,
    fontWeight: '700',
    color: BKColor.textColor1
  },
  itemDetails: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.regular,
    fontWeight: '200',
    color: BKColor.textColor3
  },
  itemPrice: {
    fontSize: fontSize.h3,
    fontFamily: fontFamily.regular,
    fontWeight: '700',
    color: BKColor.textColor2
  },
  itemOldPrice: {
    marginLeft: 3,
    fontSize: fontSize.h3,
    fontFamily: fontFamily.regular,
    fontWeight: '200',
    color: BKColor.textColor3,
    textDecorationLine: 'line-through'
  },
  wishlistIcon: {
    // alignSelf: "flex-end",
    // marginRight:wp('4%'),
    // marginBottom: -10,
    zIndex: 1,
    color: BKColor.textColor2,
    position: 'absolute',
    top: 45,
    right: wp('4%'),
    // backgroundColor: BKColor.white,
    // borderRadius: 12,
    // width: wp('6%'),
    // height: wp('6%'),
  },
  shippingArea: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    paddingBottom: hp('2%')
  },
  shipping_content: {
    letterSpacing: 2,
    fontWeight: '700',
    alignItems: 'flex-start',
    width: wp('75%')
  },
  shippingAreaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  shippingAreaImg: {
    // height: wp('20%'),
    width: wp('20%'),
    alignItems: 'center'
  },
  wholeSaleprice: {
    fontSize: fontSize.h5,
    fontFamily: fontFamily.regular,
    color:BKColor.textColor1,
   
  }

});
