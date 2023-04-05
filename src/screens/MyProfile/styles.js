import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    // regTopSection: {
    //     height: hp('20%'),
    //     // alignItems: 'center',
    //     justifyContent: 'center',
    //     text1: {
    //         color: BKColor.textColor1,
    //         fontSize: fontSize.h1,
    //         fontWeight: '700',
    //         // textAlign: 'center',
    //         fontFamily: fontFamily.regular,
    //         marginBottom: hp('1%'),
    //         marginLeft: wp('3%'),
    //     },
    // },
    regContainer: {
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.boxBorder,
        paddingVertical: hp('4%'),
        paddingHorizontal: hp('2%'),
        marginBottom: hp('4%'),
        // height: hp('90%'),
        text1: {
            color: BKColor.textColor1,
            fontSize: fontSize.h3,
            fontWeight: '300',
            // textAlign: 'center',
            fontFamily: fontFamily.regular,
            // marginBottom: hp('2%'),
            marginLeft: wp('3%'),
        },
    },
    itemOuter: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom: hp('2%'),
        backgroundColor: BKColor.iconBackground1,
        padding: wp('5%'),
        borderRadius: 10
    },
    textOuter: {
        flexDirection:"row",
        alignItems:"center",
    },

    loginLogoSection: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('30%'),
        logo: {
            // backgroundColor: BKColor.iconBackground1,
            justifyContent: 'center',
            alignItems: 'center',
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
