import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    contactUsSec: {
        // flexDirection: "row",
        // alignItems: 'center',
        // marginVertical: hp('1%'),
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: BKColor.boxBorder,
        backgroundColor: BKColor.bgColor,
        // borderRadius: 11,
        shadowColor: 'rgba(23, 149, 94, 0.90)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        margin: 5,
        elevation: 10,
        borderRadius: 15,
        padding: wp('4%'),
        marginBottom: hp('2%')
    },

    contactUsText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1,
        marginTop: hp('0.5%')
    },
    orderLeftSec: {
        width: wp('69%')
    },
    myOrderLabel: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor2
    },
    myAddHeading: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1
    },
    customerAddressText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1
    },
    orderStatus: {
        fontSize: fontSize.h3,
        color: BKColor.textColor2,
        marginTop: hp('1%')
    },
    orderStatusActive: {
        fontSize: fontSize.h3,
        color: '#579C43',
        marginTop: hp('1%')
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
            marginVertical: hp('2%'),
            width: '100%',
            justifyContent: 'center',
            borderRadius: 13,
            backgroundColor: BKColor.textColor3,
            borderWidth: 1,
            borderColor: BKColor.textColor4,
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
            fontWeight: '600',
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
        },
    },
    headerPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    headText: {
        color: BKColor.primaryColor,
        fontFamily: fontFamily.medium,
        fontSize: fontSize.hx,
    },
    // modalText: {
    //     fontFamily: fontFamily.regular,
    //     fontSize: fontSize.hx,
    //     color: BKColor.primaryColor,
    // },
    popupBody: {
        alignItems: 'center',
        paddingBottom: 10
    },
    addAddress: {

        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // paddingVertical: hp('2%'),
        button: {
            alignItems: 'center',
            padding: hp('2%'),
            // width: '25%',
            justifyContent: 'center',
            borderRadius: 13,
            borderWidth: 1,
            borderColor: BKColor.inputBorder,
            marginVertical: hp('4%')
            // backgroundColor: BKColor.textColor2
        }
    },
    textInput: {
        // color: BKColor.textColor1,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.h3,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.inputBorder,
        paddingHorizontal: wp('3%'),
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        height: hp('6.5%'),
        alignItems: 'center',
    },
    addAddressText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.white,
    },
    addressEditIcon: {
        // backgroundColor: BKColor.textColor1,
        alignItems: 'center',
        marginBottom: hp('1%'),
        color: BKColor.textColor1,
        fontSize: fontSize.bh,
        borderRadius: wp('12.5%'),
        padding: wp('1%'),
        marginHorizontal:wp('0.5%')
    },
    addAddressIcon: {
        color: BKColor.textColor1,
        fontSize: fontSize.heading,
        marginRight: wp('2%')
    },
    addShippingBtn: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1
    },
    bgPlaceholderColor: {
        // borderWidth:1,
        // borderColor: BKColor.textColor1,
        borderRadius:20,
    },
    itemTextStyle: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.regular,
        color: BKColor.textColor1,
    },
    addressModalText: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1
    },
    cancelBtnIcon: {
        fontSize: fontSize.h1,
        color: BKColor.textColor1,
        // borderRadius: wp('12.5%')
    },
    selectedTextStyle: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.regular,
        color: BKColor.textColor1,
      },
      placeholderStyle: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.regular,
        color: '#cbded2'
      }
});
