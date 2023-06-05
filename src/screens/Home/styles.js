import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { BKColor } from '../../common/values/BKColor';

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },
    headerIcon: {
        height: wp('10%'),
        width: wp('10%'),
        borderRadius: wp('5%'),
        backgroundColor: '#E1EFE5',
        justifyContent: 'center',
        alignItems: 'center',
        icon: {
        }
    },
});
