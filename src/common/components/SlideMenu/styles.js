import { Dimensions, StyleSheet } from 'react-native';
import BKColor from '../../values/BKColor'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fontFamily, fontSize } from '../../values/BKStyles';

export default StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#17955E",
    paddingBottom: hp('1.5%'),
  },

  headerImage: {
    height: wp('18%'),
    width: wp('12.5%'),
    marginRight: wp('4%'),
    // borderRadius: wp('6%'),
    // backgroundColor: '#F9ECE9'
  },
  headerText: {
    fontFamily: fontFamily.bold,
    color: '#0B4A2F',
    fontSize: fontSize.h3,
    // fontWeight: '700',
  },

  outerMenu: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  menuItem: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 20,
    alignItems: 'center'
  },
  menuIcon: {
    fontSize: fontSize.h2,
    marginRight: 10,
    color: '#0B4A2F',
  },
  menuText: {
    fontFamily: fontFamily.medium,
    color: '#0B4A2F',
    // fontWeight: '400',
    fontSize: fontSize.h4
  }


});
