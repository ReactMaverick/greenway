import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BKColor} from '../../common/values/BKColor';
import {fontSize, fontFamily} from '../../common/values/BKStyles';

export default StyleSheet.create({
  loginLogoSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('38%'),
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'cover',
    },
    text1: {
      marginTop: hp('2%'),
      color: BKColor.textColor1,
      fontSize: fontSize.h2,
      // fontWeight: '700',
      textAlign: 'center',
      fontFamily: fontFamily.medium,
    },
    text2: {
      color: BKColor.textColor2,
      fontSize: fontSize.h1,
      // fontWeight: '700',
      textAlign: 'center',
      fontFamily: fontFamily.bold,
    },
  },

  // regTopSection: {
  //     height: hp('20%'),
  //     justifyContent: 'center',
  //     text1: {
  //         color: BKColor.textColor1,
  //         fontSize: fontSize.h1,
  //         fontWeight: '700',
  //         fontFamily: fontFamily.regular,
  //         marginBottom: hp('1%'),
  //         marginLeft: wp('3%'),
  //     },
  // },
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
      backgroundColor: BKColor.textColor2,
    },
  },
  loginFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('4%'),
    // alignItems: 'center',
    textLeft: {
      color: BKColor.textColor1,
      fontSize: fontSize.h4,
      textAlign: 'center',
      fontFamily: fontFamily.medium,
    },
    textRight: {
      color: BKColor.textColor2,
      fontSize: fontSize.h4,
      textAlign: 'center',
      fontFamily: fontFamily.bold,
    },
  },
  // passwordFieldOuter: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     borderRadius: 13,
  //     borderStyle: 'solid',
  //     borderWidth: 1,
  //     borderColor: '#DDDDDD',
  //     paddingHorizontal: wp('2%'),
  //     paddingVertical: hp('0.5%'),
  // },
  errorText: {
    color: 'red',
    fontSize: fontSize.regular,
    fontFamily: fontFamily.regular,
    marginTop: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  textInput: {
    color: BKColor.textColor1,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.h3,
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: BKColor.inputBorder,
    paddingHorizontal: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp('6.5%'),
  },
  passwordInput: {
    width: '92%',
    fontFamily: fontFamily.regular,
    fontSize: fontSize.h3,
    color: BKColor.textColor1,
  },
});
