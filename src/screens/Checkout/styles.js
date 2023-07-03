import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    regContainer: {
        marginBottom: hp('2%'),
        text1: {
            color: BKColor.textColor1,
            fontSize: fontSize.h3,
            fontWeight: '600',
            fontFamily: fontFamily.regular,
            marginLeft: wp('3%'),
        },
        text2: {
            color: BKColor.textColor1,
            fontSize: fontSize.h2,
            fontWeight: '700',
            fontFamily: fontFamily.regular,
            marginBottom: hp('0.5%'),
            lineHeight: 20
        },
        text3: {
            color: BKColor.textColor1,
            fontSize: fontSize.h3,
            fontFamily: fontFamily.medium,
            marginBottom: hp('0.5%'),
        },
        orderHeading: {
            color: BKColor.textColor1,
            fontSize: fontSize.h2,
            fontWeight: '700',
            fontFamily: fontFamily.regular,
            marginBottom: hp('0.5%'),
            lineHeight: 20

        }
    },
    customerAddressText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1
    },
    itemOuter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp('2%'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        padding: wp('4%'),
        borderRadius: 15
    },
    textOuter: {
        flexDirection: "row",
        alignItems: "center",
    },
    customerDetailsSec: {
        flexDirection: 'row',
        // alignItems:'center',
        marginBottom: hp('2%')
    },
    addressHeading: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1,
        lineHeight: 25,
        marginLeft: wp('3%')
    },
    // checkBoxIcon: {
    //     width: '10%',
    // },
    // customerDetails: {
    //     width: '90%',
    // },
    contactUsSec: {
        flexDirection: 'row',
        alignItems:'center'
    },
    contactUsText: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor1,
        flex: 1,
        // flexWrap: 'wrap',
        marginBottom: hp('0.5%')
    },
    contactUsLabel: {
        fontSize: fontSize.h4,
        fontFamily: fontFamily.medium,
        // flexWrap: 'wrap',
        marginBottom: hp('0.5%'),
        color: BKColor.textColor1
    },
    orderSec: {
        width: '50%',
        backgroundColor: BKColor.boxBorder,
        paddingVertical: hp('2%')
    },
    productSec: {
        flex:1,
        alignItems: 'flex-start',
    },
    totalSec: {
        flex:1,
        alignItems:'flex-end',
    },
    orderTotal: {
        color: BKColor.textColor1,
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor2,
        marginBottom: hp('0.5%'),
    },
    customerOrderSec: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: BKColor.boxBorder
    },
    orderOuter: {
        marginBottom: hp('2%'),
    },
    // paymentSec: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginBottom: hp('1%')
    // },
    paymentOuterSec: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: hp('2%')
    },
    paymentType: {
        color: BKColor.textColor1,
        fontSize: fontSize.h3,
        fontFamily: fontFamily.regular,
        // marginBottom: hp('0.5%'),
        marginLeft: wp('2%')
    },
    checkOutOuter: {
        backgroundColor: BKColor.bgColor,
        borderRadius: 15,
        shadowColor: 'rgba(23, 149, 94, 0.90)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        margin: 5,
        elevation: 10,
        padding: wp('4%'),
        marginBottom:hp('2%')
    },
    sameBillingText: {
        marginLeft: wp('2%')
    }

});
