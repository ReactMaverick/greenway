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
            fontWeight: '700',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
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
        marginBottom: hp('1%')
    },
    checkBoxIcon: {
        width: '10%',
    },
    customerDetails: {
        width: '90%',
    },
    contactUsSec: {
        flexDirection:'row'
    },
    contactUsText: {
        fontSize: fontSize.h3,
        fontWeight: '500',
        flex: 1,
        flexWrap: 'wrap',
        marginBottom: hp('0.5%')
    },
    contactUsLabel: {
        fontSize: fontSize.h3,
        fontWeight: '500',
        flexWrap: 'wrap',
        marginBottom: hp('0.5%'),
        color: BKColor.textColor1
    },
    orderSec: {
        width: '50%',
        backgroundColor: BKColor.boxBorder,
        paddingVertical: hp('2%')
    },
    productSec: {
        width: '50%',
        justifyContent: 'center',
        borderrightWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        padding: wp('3%')
    },
    totalSec: {
        width: '50%',
        height: '100%',
        borderLeftWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        padding: wp('3%')
    },
    orderTotal: {
        color: BKColor.textColor1,
        fontSize: fontSize.h3,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        marginBottom: hp('0.5%'),
    },
    customerOrderSec: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder
    },
    orderOuter: {
        marginBottom: hp('2%'),
    },
    paymentSec: {
        flexDirection:'row',
        alignItems:'center',
        // marginBottom: hp('1%')
    },
    paymentOuterSec: {
        flexDirection:'row',
        alignItems:'center',
        marginRight: hp('2%')
    },
    paymentType:{
        color: BKColor.textColor1,
        fontSize: fontSize.h3,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: fontFamily.regular,
        marginBottom: hp('0.5%'),
        marginLeft: wp('2%')
    }

});
