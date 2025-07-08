import { StyleSheet } from 'react-native';
import { BKColor } from './BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const fontSize = {
  maxHeading: hp('14%'),
  heading1: hp('5.5%'),
  heading2: hp('4.5%'),
  h1: hp('3.2%'),
  bh: hp('3%'),
  heading: hp(2.6),
  h2: hp('2.5%'),
  h3: hp('2%'),
  h4: hp('1.8%'),
  regular: hp('1.6%'),
  h5: hp('1.4%'),
};

export const shadowStyle = {
  shadowColor: '#DDDDDD',
  shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: 0.9,
  shadowRadius: 2,
  elevation: 4,
};

export const lineStyle = {
  borderStyle: 'dashed',
  borderWidth: 1,
  borderRadius: 1,
  borderColor: BKColor.lineColor,
  marginVertical: 10,
};

export const tabBarIconBox = {
  width: hp('5%'),
  height: hp('5%'),
  backgroundColor: BKColor.secondaryColor,
  borderRadius: hp('2%'),
  justifyContent: 'center',
  alignItems: 'center',
};

export const pageContainerStyle = {
  // marginHorizontal: wp("3%"),
  // marginVertical: hp("1%"),
  // flex: 1,
  paddingHorizontal: wp('8%'),
  backgroundColor: BKColor.bgColor,
  height: hp('100%'),
};
export const pageContainerStyle2 = {
  // marginHorizontal: wp("3%"),
  // marginVertical: hp("1%"),
  // flex: 1,
  paddingHorizontal: wp('4.5%'),
  backgroundColor: BKColor.white,
  height: '100%',
};

//Global padding
export const gPadding = wp('3.5%');

export const categoryStyle = {
  paddingLeft: gPadding,
  paddingVertical: hp('1%'),
  ...shadowStyle,
};

export const categoryStyleWithoutShadow = {
  paddingHorizontal: wp('5%'),
  paddingVertical: hp('2%'),
};

// image background style
export const pageContainerIBGStyle = {
  padding: wp('5%'),
  paddingTop: wp('1%'),
  flex: 1,
};

export const cardStyle = Object.assign({}, shadowStyle, {
  borderRadius: 10,
  alignItems: 'center',
});

export const fontFamily = {
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
};

export const TextboxWrapper = {
  borderColor: BKColor.textBoxBorder,
  borderWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  width: wp('95%'),
  marginTop: hp('2%'),
  backgroundColor: BKColor.textboxBackground,
};
export const errorMessage = {
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h4,
  color: 'red',
  alignSelf: 'center',
  padding: hp('1%'),
};
// export const inputContainer = {
//   marginTop: hp('3%'),
// };

export const inputContainer = {
  marginTop: hp('3%'),
  borderRadius: 30,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: BKColor.inputBorder,
  justifyContent: 'center',
};
export const textInput = {
  color: BKColor.textColor1,
  // placeHolderColor: BKColor.textColor1,
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h3,
  // width: '100%',
  // backgroundColor: BKColor.textboxBackground,

  paddingHorizontal: wp('3%'),
  flexDirection: 'row',
  // justifyContent: 'space-between',
  // alignItems: 'center',
  //height: hp('6.5%'),
};
export const textInput2 = {
  color: BKColor.textColor1,
  // placeHolderColor: BKColor.textColor3,
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h3,
  width: '88%',
  // backgroundColor: BKColor.textColor2,
};
export const inputLevel = {
  marginTop: 10,
  color: BKColor.textColor1,
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h3,
  alignSelf: 'flex-start',
  marginBottom: hp('1%'),
};
export const inputBottomLevel = {
  marginTop: 10,
  color: BKColor.textColor1,
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h3,
  alignSelf: 'flex-end',
  marginBottom: hp('1%'),
};
export const placeHolderColor = '#cbded2';
export const inputIcon = {
  fontSize: 20,
  color: BKColor.textColor1,
  marginRight: 5,
};

export const borderStyle = {
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#eee6e6',
  borderRadius: 5,
};

export const activeButton = {
  button: {
    alignItems: 'center',
    paddingHorizontal: wp('3.5%'),
    paddingVertical: wp('2.5%'),
    marginTop: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    borderRadius: wp('12.5%'),
    backgroundColor: BKColor.textColor1,
  },
  text: {
    color: BKColor.white,
    fontSize: fontSize.h2,
    // textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  reviewButton: {
    padding: hp('1%'),
    marginTop: hp('2%'),
    width: '45%',
    borderRadius: 10,
    backgroundColor: BKColor.textColor1,
  },
  cancelButton: {
    padding: hp('1%'),
    marginTop: hp('2%'),
    width: '25%',
    borderRadius: 10,
    backgroundColor: BKColor.textColor2,
  },
};

export const passiveButton = {
  button: {
    alignItems: 'center',
    padding: wp('3.5%'),
    marginTop: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    borderRadius: wp('12.5%'),
    backgroundColor: BKColor.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: BKColor.inputBorder,
  },
  text: {
    color: BKColor.textColor2,
    fontSize: fontSize.h2,
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  icon: {
    color: BKColor.textColor2,
    fontSize: fontSize.h1,
  },
};

// snap carousel pagination style
export const paginationStyle = {
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  passiveDot: {},
  inactiveDotOpacity: 0.4,
  inactiveDotScale: 0.6,
  container: {
    paddingVertical: 0,
    marginTop: hp(0.8),
  },
};

export const buttonStyle = {
  container: {
    borderRadius: 30,
  },
  text: {
    fontSize: hp('2%'),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
};

export const boxHeader1 = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: hp('2%'),
  text: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.medium,
    fontStyle: 'normal',
    color: BKColor.textColor1,
  },
  text2: {
    fontSize: fontSize.h4,
    fontFamily: fontFamily.regular,
    fontStyle: 'normal',
    color: BKColor.textColor1,
  },
};

export const pageHeader = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: hp('10%'),
  text: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.bold,
    // fontStyle: 'normal',
    color: BKColor.textColor1,
  },
};

export const commonStyle = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
});
