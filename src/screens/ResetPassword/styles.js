import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';
import { fontSize, fontFamily } from '../../common/values/BKStyles';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },
    fpContainer: {
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: hp('2%'),
        height: hp('90%'),
    },
    rpTopSection: {
        height: hp('16%'),
        justifyContent: 'center',
        alignItems: 'center',
        text1: {
            color: BKColor.textColor2,
            fontSize: fontSize.h2,
            fontWeight: '600',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
            marginBottom: hp('2%'),
        },
        text2: {
            color: BKColor.textColor2,
            fontSize: fontSize.h4,
            fontWeight: '300',
            textAlign: 'center',
            fontFamily: fontFamily.regular,
            marginBottom: hp('1%'),
        },
    }

});
