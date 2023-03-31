import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontSize, fontFamily } from '../../values/BKStyles';
import { BKColor } from '../../values/BKColor';

export default StyleSheet.create({
    singleCategoryContainer: {
        width: wp('40%'),
        // height: wp('45.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('2%'),
        marginHorizontal: wp('2.5%'),
        itemImage: {
            width: wp('30%'),
            height: wp('30%'),
            // borderRadius: wp('12%'),
        },
        itemText: {
            fontSize: fontSize.h3,
            fontFamily: fontFamily.regular,
            fontWeight: '700',
            textAlign: 'center',
            marginTop: 10,
        },
    },
    categoryContainerSec: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius:20,
        // marginLeft: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('2%')
    }

});


