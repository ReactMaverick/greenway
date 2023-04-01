import { BKColor } from './BKColor';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const fontSize = {
  maxHeading: hp('14%'),
  heading1: hp('5.5%'),
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
  paddingHorizontal: wp('4.5%'),
  backgroundColor: '#FFFFFF',
  height: hp('100%')
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
  regular: 'Manrope-Regular',
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
export const inputContainer = {
  marginTop: hp('3%'),
};
export const textInput = {
  color: BKColor.textColor1,
  // placeHolderColor: BKColor.textColor3,
  fontFamily: fontFamily.regular,
  fontSize: fontSize.h3,
  width: '100%',
  // backgroundColor: BKColor.textboxBackground,
  borderRadius: 13,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#DDDDDD',
  padding: hp('1.5%'),

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};
export const inputLevel = {
  marginTop: 10,
  color: BKColor.textColor4,
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
  marginBottom: hp('1%')
};
export const placeHolderColor = BKColor.textColor1;
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
    padding: hp('2%'),
    marginTop: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: BKColor.textColor2
  },
  text: {
    color: '#FFFFFF',
    fontSize: fontSize.h3,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  reviewButton: {
    padding: hp('1%'),
    marginTop: hp('2%'),
    width: '45%',
    borderRadius: 10,
    backgroundColor: BKColor.btnBackgroundColor1
  },
  cancelButton:{
    padding: hp('1%'),
    marginTop: hp('2%'),
    width: '20%',
    borderRadius: 10,
    backgroundColor: BKColor.btnBackgroundColor1
}
};

export const passiveButton = {
  button: {
    alignItems: 'center',
    padding: hp('2%'),
    marginTop: hp('4%'),
    width: '100%',
    justifyContent: 'center',
    borderRadius: 13,
    backgroundColor: BKColor.white,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  text: {
    color: BKColor.textColor2,
    fontSize: fontSize.h3,
    fontWeight: '200',
    textAlign: 'center',
    fontFamily: fontFamily.regular,
  },
  icon: {
    color: BKColor.textColor2,
    fontSize: fontSize.h1,
  }
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
  marginTop: fontSize.h1,
  text: {
    fontSize: hp('2%'),
    fontWeight: '700',
    fontFamily: fontFamily.regular,
    fontStyle: 'normal',
    color: BKColor.textColor2,
  },
};

export const pageHeader = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: hp('10%'),
  text: {
    fontSize: fontSize.h2,
    fontWeight: '700',
    fontFamily: fontFamily.regular,
    fontStyle: 'normal',
    color: BKColor.textColor1,
  },
};