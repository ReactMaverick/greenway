import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize, fontFamily } from '../../values/BKStyles';
import { BKColor } from '../../values/BKColor';

export default StyleSheet.create({
    faqAccordionSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp('1.5%'),
        marginTop: hp('4%'),
        width: '100%',
        borderRadius: 13,
        backgroundColor: BKColor.iconBackground1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.boxBorder,
        faqAccordionText: {
          color: BKColor.textColor1,
          fontSize: fontSize.h2,
          fontWeight: '700',
          fontFamily: fontFamily.regular,
        },
        accordionIcon: {
          color: BKColor.textColor2,
          fontSize: fontSize.h1,
        },
      },
      faqAccordionSecActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: hp('1.5%'),
        marginVertical: hp('2%'),
        width: '100%',
        borderRadius: 13,
        backgroundColor: BKColor.textColor2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#dddddd',
        faqAccordionText: {
          color: BKColor.white,
          fontSize: fontSize.h2,
          fontWeight: '700',
          fontFamily: fontFamily.regular,
        },
        accordionIcon: {
          color: BKColor.white,
          fontSize: fontSize.h1,
        }
      },
      faqAccordionDesc: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: BKColor.boxBorder,
        borderRadius: 15,
        padding: wp('3%'),
        // marginVertical: hp('2%')
      },
      faqAccordionDescText: {
        fontSize: fontSize.h3,
        color: BKColor.textColor1,
        // textAlign:'justify'
      }

});


