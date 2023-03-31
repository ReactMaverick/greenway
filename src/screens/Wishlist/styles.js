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
        width: wp('55%'),
        lineHeight:27
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
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: wp('18%'),
        paddingTop: 5
      },

      cartDltIcon:{
        fontSize: fontSize.bh,
        backgroundColor: '#F9ECE9',
        padding: wp('2%'),        
        borderRadius: 15
      },
      cartPrice: {
        fontSize: fontSize.h3,
        fontWeight: '500',
        color: BKColor.textColor2,
        marginTop: hp('1%')
      },
      
});
