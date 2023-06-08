import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize, fontFamily } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
  headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

  productContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('3%')
  },
  singleProductContainer: {
    width: wp('45.5%'),
    // height: wp('45.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
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
  filterModal: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: BKColor.white,
    justifyContent: 'center'
  },
  filterModalHeader: {
    height: hp('8%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    borderStyle: 'solid',
    text1: {
      alignSelf: 'center',
      padding: wp('4.5%'),
      fontSize: fontSize.h3,
      fontFamily: fontFamily.regular,
      fontWeight: '200',
      color: BKColor.textColor1,
    },
    text2: {
      alignSelf: 'center',
      padding: wp('4.5%'),
      fontSize: fontSize.h3,
      fontFamily: fontFamily.regular,
      fontWeight: '200',
      color: BKColor.textColor2,
    }
  },
  filterModalBody: {
    height: hp('82%'),
    flexDirection: 'row'
  },
  filterModalTab: {
    height: '100%',
    width: wp('35%'),
    // backgroundColor: BKColor.textColor3,
    borderRightWidth: 1,
    borderRightColor: BKColor.textColor2,
    borderStyle: 'solid'
  },
  filterModalTabItem: {
    paddingVertical: hp('1.5%'),
    text: {
      alignSelf: 'center',
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '200',
      color: BKColor.textColor1,
    }
  },
  filterModalTabItemActive: {
    backgroundColor: BKColor.textColor2,
    paddingVertical: hp('1.5%'),
    text: {
      alignSelf: 'center',
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '700',
      color: BKColor.white,
    }
  },
  filterModalTabContent: {
    height: '100%',
    width: wp('65%'),
  },
  filterModalTabContentItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
    flexDirection: 'row',
    alignContent: 'center',
    text: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '200',
      color: BKColor.textColor4,
    },
    textActive: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '700',
      color: BKColor.textColor1,
    },
    icon: { width: hp('3%') }
  },
  filterModalTabContentSubItem: {
    paddingBottom: hp('1%'),
    // paddingHorizontal: hp('1.5%'),
    paddingLeft:hp('3%'),
    paddingRight:hp('1.5%'),
    flexDirection: 'row',
    alignContent: 'center',
    text: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '200',
      color: BKColor.textColor4,
    },
    textActive: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      fontWeight: '700',
      color: BKColor.textColor1,
    },
    icon: { width: hp('3%') }
  },
  filterModalFooter: {
    height: hp('8%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    borderStyle: 'solid',
  },
  filterModalButton: {
    button: {
        width: '40%',
        height: hp('6%'),
        justifyContent: 'center',
        borderRadius: 13,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: BKColor.textColor4,
        marginHorizontal: wp('4.5%')
    },
    icon: {
        marginRight: wp('2%')
    },
    text: {
        color: BKColor.textColor1,
        fontSize: fontSize.h3,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: fontFamily.regular,
    }
},

});
