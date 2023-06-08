import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    contactUsSec: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: hp('1%'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        borderRadius: 15,
        padding: wp('4%')
    },

    contactUsText:{
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: BKColor. textColor1,
        // marginTop: hp('1%')
    },
    orderLeftSec: {
        width: wp('63%'),
    },
    myOrderLabel: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor2
    },
    myOrderText: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.regular,
        color: BKColor.textColor1
    },
    orderStatus: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.regular,
        color: BKColor.textColor2,
        marginTop: hp('1%')
    },
    orderStatusActive: {
        fontSize: fontSize.h3,
        color: '#579C43',
        marginTop: hp('1%')
    },
    orderRightSec: {
        width: wp('20%'),
        flexDirection:'row',
        justifyContent:'flex-end', 
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
