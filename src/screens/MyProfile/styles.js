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
        // borderRadius: 20,
        // borderStyle: 'solid',
        // borderWidth: 1,
        // borderColor: BKColor.inputBorder,
        paddingVertical: hp('4%'),
        paddingHorizontal: hp('2%'),
        marginBottom: hp('4%'),
        // height: hp('90%'),
        text1: {
            color: BKColor.textColor1,
            fontSize: fontSize.h2,
            // textAlign: 'center',
            fontFamily: fontFamily.medium,
            // marginBottom: hp('2%'),
            marginLeft: wp('3%'),
        },
    },
    itemOuter: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom: hp('2%'),
        borderWidth:1,
        borderColor: BKColor.textColor1,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1.5%'),
        borderRadius: wp('12.5%')
    },
    textOuter: {
        flexDirection:"row",
        alignItems:"center",
    },
    

    // loginLogoSection: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: hp('30%'),
    //     logo: {
    //         backgroundColor: BKColor.iconBackground1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //     },
    //     text2: {
    //         marginTop: hp('2%'),
    //         color: BKColor.textColor2,
    //         fontSize: fontSize.h2,
    //         fontWeight: '700',
    //         textAlign: 'center',
    //         fontFamily: fontFamily.regular,
    //     }
    // }

    userProfileImgOuter: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:hp('1%'),
        // marginBottom:hp('2%'),
        padding: wp('2%'),
        borderRadius:100,
        backgroundColor: BKColor.textColor2,
        width: wp('30%'),
        height: wp('30%'),
    },


 userProfileImg: {
        width: wp('20%'),
        height: wp('20%'),
        resizeMode: 'contain',
    },

 userNameText: {
        fontSize: fontSize.h2,
        fontFamily: fontFamily.bold,
        color: BKColor.textColor1,
        paddingVertical: hp('2%'),
        lineHeight:24
    },

});
