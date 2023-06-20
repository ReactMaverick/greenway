import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    
    regContainer: {
        borderRadius: 20,
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: '#DDDDDD',
        paddingVertical: hp('7%'),
        paddingHorizontal: hp('2%'),
        marginTop: hp('8%'),
        marginBottom: hp('4%'),
        // height: hp('90%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        headerText: {
            fontSize: fontSize.h3,
            fontWeight: '700',
            marginBottom: hp('4%'),
            color: BKColor.textColor1
        }
    },
    
    loginFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('11%'),
        marginBottom: hp('4%'),
        textLeft: {
            color: BKColor.textColor4,
            fontSize: fontSize.h3,
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        },
        textRight: {
            color: BKColor.textColor2,
            fontSize: fontSize.h4,
            textAlign: 'center',
            fontFamily: fontFamily.bold,
        },
    },
    otpBoxStyle:{ 
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.inputBorder,
        width: hp('8%'),
        height: hp('8%'),
        fontSize: fontSize.h2,
        marginHorizontal: wp('3%')
    },
    logoSection: {
        height: hp('38%'),
        // width: wp('54%'),
        // borderRadius: hp('3%'),
        // backgroundColor: BKColor.iconBackground1,
        // alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: hp('4%'),
        logoImage: {
            height: hp('18%'),
            width: wp('26%'),
            resizeMode: "cover"
        }
    },
    errorText: {
        color: 'red',
        fontSize: fontSize.regular,
        fontFamily: fontFamily.regular,
        marginTop: 5,
      },
      errorInput: {
        borderColor: 'red',
      },
      textInput: {
        color: BKColor.textColor1,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.h3,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.inputBorder,
        padding: hp('1.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('6.5%'),
      },
      loginLogoSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('38%'),
        logo: {
          justifyContent: 'center',
          alignItems: 'center',
          resizeMode: 'cover',
        },
        text1: {
          marginTop: hp('2%'),
          color: BKColor.textColor1,
          fontSize: fontSize.h2,
          // fontWeight: '700',
          textAlign: 'center',
          fontFamily: fontFamily.medium,
        },
        text2: {
          color: BKColor.textColor2,
          fontSize: fontSize.h1,
          // fontWeight: '700',
          textAlign: 'center',
          fontFamily: fontFamily.bold,
        },
      },

});
 