import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({
    headText: { color: '#2E2E2E', fontSize: 16, margin: 5 },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
