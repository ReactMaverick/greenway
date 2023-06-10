import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    contactUsSec: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: hp('1.5%')
    },
    contactUsOuterSec: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingVertical: hp('1%'),
        // borderBottomWidth: 1,
        // borderStyle: 'solid',
        // borderBottomColor: '#dddddd',
        backgroundColor: BKColor.bgColor,
        borderRadius: 11,
        shadowColor: 'rgba(23, 149, 94, 0.90)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        margin: 5,
        elevation: 10,
        padding: wp('5%')
    },

    contactUsText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1,
        marginLeft: wp('3%'),
        flex: 1, flexWrap: 'wrap'
    },

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
        alignItems: 'center',
        textLeft: {
            color: BKColor.textColor4,
            fontSize: fontSize.h3,
            fontWeight: '300',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        },
        textRight: {
            color: BKColor.textColor2,
            fontSize: fontSize.h3,
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        },
    },
    loginLogoSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('30%'),
        logo: {
            height: hp('14%'),
            width: hp('14%'),
            borderRadius: hp('7%'),
            backgroundColor: BKColor.iconBackground1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text1: {
            marginTop: hp('2%'),
            color: BKColor.textColor1,
            fontSize: fontSize.h2,
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        },
        text2: {
            marginTop: hp('2%'),
            color: BKColor.textColor2,
            fontSize: fontSize.h2,
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
        }
    }

});
