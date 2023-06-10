import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontFamily, fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
    headText :{color:'#2E2E2E', fontSize:16, margin:5},

    bannerImage: {
      width: wp('91%'),
      height: hp('25%'),
    },
    aboutUsHeading: {
      fontSize: fontSize.h2,
      fontFamily: fontFamily.bold,
      color: BKColor.textColor1,
      marginTop: hp('3%')
    },
    aboutUsDesc: {
      fontSize: fontSize.h4,
      fontFamily: fontFamily.regular,
      color: BKColor.textColor1,
      marginTop: hp('2%'),
      textAlign:'justify'
    }
});
