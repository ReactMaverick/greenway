import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BKColor} from '../../common/values/BKColor';
import {fontSize, fontFamily} from '../../common/values/BKStyles';

export default StyleSheet.create({

  congratulationText1: {
    fontSize: fontSize.heading2,
    fontFamily: fontFamily.bold,
    color: BKColor.textColor2,
  },
  congratulationText2: {
    fontSize: fontSize.h2,
    fontFamily: fontFamily.medium,
    color: BKColor.textColor1
  }
});
