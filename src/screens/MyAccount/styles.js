import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    regTopSection: {
        height: hp('20%'),
        // alignItems: 'center',
        justifyContent: 'center',
        text1: {
            color: BKColor.textColor1,
            fontSize: fontSize.h1,
            fontWeight: '700',
            // textAlign: 'center',
            fontFamily: fontFamily.regular,
            marginBottom: hp('1%'),
            marginLeft: wp('3%'),
        },
    },
    regContainer: {
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: hp('2%'),
        marginBottom: hp('4%'),
        // height: hp('90%'),
    },
    regBtmSection: {
        // height: hp('20%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp('4%'),
        text1: {
            color: BKColor.textColor2,
            fontSize: fontSize.h1,
            fontWeight: '700',
            fontFamily: fontFamily.regular,
        },
        button: {
            alignItems: 'center',
            padding: hp('2%'),
            width: '25%',
            justifyContent: 'center',
            borderRadius: 13,
            backgroundColor: BKColor.btnBackgroundColor1
        }
    },
    loginFooter: {
        flexDirection: 'row',
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
    passwordFieldOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 13,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.5%'),
    }
});
