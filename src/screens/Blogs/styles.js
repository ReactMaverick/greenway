import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontFamily, fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
    headText :{color:'#2E2E2E', fontSize:16, margin:5},
    blogsSec:{
      // borderWidth: 1,
      // borderStyle: 'solid',
      // borderColor: BKColor.boxBorder,
      backgroundColor: BKColor.bgColor,
      borderRadius: 11,
      shadowColor: 'rgba(23, 149, 94, 0.90)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 4,
      margin: 5,
      elevation: 10,
      // padding: wp('4%'),
      borderRadius: 15,
      marginBottom: hp('2%')
    },
    bannerImage: {
      width: wp('89%'),
      height: hp('25%'),
      resizeMode:'contain',
      borderTopLeftRadius:15,
      borderTopRightRadius:15
    },
    aboutUsHeading: {
      fontSize: fontSize.h2,
      fontFamily: fontFamily.bold,
      color: BKColor.textColor1,
      // marginTop: hp('2%')
    },
    aboutUsDesc: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      color: BKColor.textColor1,
      marginTop: hp('1%'),
      textAlign:'justify'
    }
});
