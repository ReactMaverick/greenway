import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },

    contactUsSec: {
        // flexDirection: "row",
        // alignItems: 'center',
        marginVertical: hp('1%'),
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: BKColor.boxBorder,
        borderRadius: 15,
        padding: wp('4%')
    },

    contactUsText:{
        fontSize: fontSize.h3,
        fontWeight: '500',
        color: BKColor. textColor1,
        marginTop: hp('0.5%')
    },
    orderLeftSec: {
        width: wp('69%')
    },
    myOrderLabel: {
        fontSize: fontSize.h2,
        fontWeight: '500',
        color: BKColor.textColor2
    },
    myAddHeading: {
        fontSize: fontSize.h2,
        fontWeight: '500',
        color: BKColor.textColor1
    },
    myOrderText: {
        fontSize: fontSize.h2,
        fontWeight: '500',
        color: BKColor.textColor2
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
    headerPopup:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingBottom:10
    },
    headText:{
        color: BKColor.primaryColor,
        fontFamily: fontFamily.medium,
        fontSize: fontSize.hx,
    },
    modalText:{
        fontFamily: fontFamily.regular,
        fontSize: fontSize.hx,
        color: BKColor.primaryColor,
    },
    popupBody:{
        alignItems:'center',
        paddingBottom:10
    },
    addAddress: {
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp('2%'),
       
        button: {
            alignItems: 'center',
            padding: hp('2%'),
            width: '20%',
            justifyContent: 'center',
            borderRadius: 13,
            backgroundColor: BKColor.btnBackgroundColor1
        }
    },
    textInput: {
        // color: BKColor.textColor4,
        // placeHolderStyle: BKColor.textColor2,
        fontFamily: fontFamily.regular,
        fontSize: fontSize.h3,
        width: '100%',
        // backgroundColor: BKColor.textboxBackground,
        borderRadius: 13,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: hp('1.5%'),
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center'
    }
});