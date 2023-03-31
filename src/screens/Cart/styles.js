import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
    headText :{color:'#2E2E2E', fontSize:16, margin:5},

    cartDetailsSec: {
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: hp('2%'),
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#dddddd'
    },

    cartImgSec: {
        width: wp('22%')
    },

    itemImage: {
        width: wp('15%'),
        height: wp('15%'),
      },

    cartDecSec: {
        width: '100%',
        lineHeight:27,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cartDecAttriSec:{
      width: '100%',
      flexDirection: 'row',
    },
    cartDecHeading: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        color:BKColor.textColor1,
        lineHeight:30
    },

    cartAttr: {
        fontSize: fontSize.h4,
        fontWeight: '500'
    },

    cartQtySec: {
        flexDirection:'row',
        alignItems:'center',
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

      cartDltSec:{
        width: wp('10%'),
      },

      cartDltIcon:{
        fontSize: fontSize.bh,
        backgroundColor: '#F9ECE9',
        padding: wp('2%'),        
        borderRadius: 15
      },
      cartPrice: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        color: BKColor.textColor2,
        marginTop: hp('2%')
      },
      cartCouponHeading: {
        fontSize: fontSize.h2,
        fontWeight: '700',
        color: BKColor.textColor2
      },
      couponInputSec:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      inputContainerWidth: {
        width: wp('55%')
      },
      couponApplyBtn: {
        width: wp('31%')
      },
      couponApplyText: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        color: BKColor.textColor2,
        paddingVertical: wp('4%'),
        paddingHorizontal: wp('10%'),
        backgroundColor: '#F9ECE9',
        borderRadius:10
      },
      cartItemSec: {
        flexDirection:'row',
        justifyContent:'space-between'
      },
      totalItemHeading: {
        fontSize: fontSize.h3,
        fontWeight: '400',
        color: BKColor.textColor1,
        marginBottom: hp('1%'),
      },

      totalItem: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        color: BKColor.textColor1,
      },
      cartTotalPrice: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop: hp('1%')
      },
      cartGiftsSec: {
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: BKColor.boxBorder,
        padding: wp('4%'),
        borderRadius: 15,
        marginTop: hp('3%')
      },
      giftsSec: {
        flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'flex-start',
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
