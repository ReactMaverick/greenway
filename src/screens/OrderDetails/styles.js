import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },
    orderDetailsHeadSec: {
        flex: 1,
        marginVertical: hp('5%')
    },
    orderDetailsSec: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: hp('2%')
    },
    orderTopHeading: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    orderTextLeft: {
        fontSize: fontSize.h3,
        fontWeight: '400',
        color: BKColor.textColor1,
    },
    orderText: {
        fontSize: fontSize.h3,
        fontWeight: '400',
        color: BKColor.textColor1,
        // textAlign: 'right'
    },
    itemHeadingSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%')
    },
    productItemHeading: {
        fontSize: fontSize.h3,
        fontWeight: '700',
        color: BKColor.textColor2,
        textTransform: 'uppercase'
    },
    productItemText: {
        fontSize: fontSize.h3,
        fontWeight: '400',
        // color: BKColor.textColor1,
    },
    itemImage: {
        width: wp('20%'),
        height: wp('20%'),
    },
    itemReviewImage: {
        width: wp('50%'),
        height: wp('50%'),
        alignSelf: 'center',
        marginBottom: 20
    },
    contactUsSec: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: hp('1%'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        borderRadius: 15,
        padding: wp('4%'),
        marginBottom: hp('2%')
    },
    productImageSec: {
        width: wp('25%')
    },
    productDetailsSec: {
        width: wp('58%')
    },
    productName: {
        fontSize: fontSize.h3,
        color: BKColor.textColor1,
        // marginBottom: hp('1%')
    },
    productQtySec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%')
    },
    productQtyText: {
        fontSize: fontSize.h3,
        color: BKColor.textColor2

    },
    productQty: {
        fontSize: fontSize.h3,
        color: BKColor.textColor1
    },
    productPrice: {
        fontSize: fontSize.h3,
        color: BKColor.textColor1
    },

    contactUsText: {
        fontSize: fontSize.h3,
        fontWeight: '500',
        color: BKColor.textColor1,
        marginTop: hp('1%')
    },
    orderLeftSec: {
        width: wp('69%')
    },
    myOrderLabel: {
        fontSize: fontSize.h2,
        fontWeight: '500',
        color: BKColor.textColor2
    },
    myOrderText: {
        fontSize: fontSize.h2,
        fontWeight: '500',
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
    orderRightSec: {
        width: wp('14%'),
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
    },
    headerPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalText: {
        fontWeight: '600',
        fontSize: fontSize.h2,
        color: BKColor.primaryColor,
        paddingBottom: 10
    },
    modalStar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        // justifyContent: "flex-start",
        textAlignVertical: 'top',
        height: 100,
    },
    extraSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    dropdownArea: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        paddingBottom: 10
    },
    returnProduct: {
        padding: hp('1%'),
        marginTop: hp('2%'),
        width: '50%',
        borderRadius: 10,
        backgroundColor: 'grey',
        fontSize: 11,
        fontWeight: '600',
        color: 'white'
    }

});
