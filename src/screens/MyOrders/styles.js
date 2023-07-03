import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    orderItemOuter: {
        shadowColor: 'rgba(23, 149, 94, 0.90)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        margin: 2,
        elevation: 10,
        backgroundColor: BKColor.bgColor,
        borderRadius: 15,
        marginBottom: hp('3%')
    },

    contactUsSec: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: hp('1%'),
        // borderRadius: wp('12.5%'),
        padding: wp('4%')
    },

    contactUsText:{
        fontSize: fontSize.h3,
        fontFamily: fontFamily.bold,
        color: BKColor. textColor1,
        // marginTop: hp('1%')
    },
    orderLeftSec: {
        width: wp('63%'),
    },
    myOrderLabel: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1
    },
    myOrderText: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1
    },
    myOrderDateText: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1
    },
    orderStatus: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.bold,
        color: '#1ab800',
        marginTop: hp('0.5%')
    },
    orderStatusCancelled: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.bold,
        color: '#f20000',
        marginTop: hp('0.5%')
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
    },
    viewDetailsBtn: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: BKColor.textColor2,
        textAlign:'center',
        marginVertical:hp('1.5%')
    },
    orderCancelBtn: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: '#f20000',
        textAlign:'center',
        marginVertical:hp('1.5%')
    },
    orderReviewlBtn: {
        fontSize: fontSize.h3,
        fontFamily: fontFamily.medium,
        color: '#7d7d7d',
        textAlign:'center',
        marginVertical:hp('1.5%')
    },
    itemReviewImage: {
        width: wp('50%'),
        height: wp('50%'),
        alignSelf: 'center',
        marginBottom: 20
    },
    modalStar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalText: {
        fontWeight: '600',
        fontSize: fontSize.h2,
        color: BKColor.primaryColor,
        paddingBottom: 10
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
    headerPopup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 20,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

});
