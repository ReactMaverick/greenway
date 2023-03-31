import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize } from '../../common/values/BKStyles';
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
    headText :{color:'#2E2E2E', fontSize:16, margin:5},
    blogsSec:{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: BKColor.boxBorder,
      padding: wp('4%'),
      borderRadius: 15,
      marginBottom: hp('2%')
    },
    bannerImage: {
      width: wp('82%'),
      height: hp('25%'),      
    },
    aboutUsHeading: {
      fontSize: fontSize.h2,
      fontWeight: '700',
      color: BKColor.textColor1,
      marginTop: hp('2%')
    },
    aboutUsDesc: {
      fontSize: fontSize.h3,
      fontWeight: '400',
      color: BKColor.textColor1,
      marginTop: hp('1%'),
      textAlign:'justify'
    }
});
