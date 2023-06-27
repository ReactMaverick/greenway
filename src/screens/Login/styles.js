import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    socialLoginContainer: {
        flexDirection: 'row',
        marginTop: hp('4%'),
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    socialLoginButton: {
        button: {
            alignItems: 'center',
            padding: hp('2%'),
            width: '47%',
            justifyContent: 'center',
            borderRadius: 13,
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: BKColor.textColor4,
            padding: hp('2%'),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        icon: {
            marginRight: wp('2%')
        },
        text: {
            color: BKColor.textColor2,
            fontSize: fontSize.h3,
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        },
        text2: {
            color: BKColor.textColor1,
            fontSize: fontSize.h3,
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        }
    },
    loginFooter: {
        flexDirection: 'row',
        marginTop: hp('4%'),
        justifyContent: 'center',
        // alignItems: 'center',
        textLeft: {
            color: BKColor.textColor1,
            fontSize: fontSize.h4,
            textAlign: 'center',
            fontFamily: fontFamily.medium,
        },
        textRight: {
            color: BKColor.textColor2,
            fontSize: fontSize.h4,
            textAlign: 'center',
            fontFamily: fontFamily.bold,
        },
    },
    loginLogoSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('38%'),
        logo: {
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode:'cover'
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
        paddingHorizontal: wp('3%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('6.5%'),
      },
      otherLoginIcon: {
        width: wp('7%'),
        height: wp('7%'),
      }

});
