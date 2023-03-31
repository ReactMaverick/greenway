import { Dimensions, StyleSheet } from 'react-native';
import BKColor from '../../values/BKColor'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: hp('1.5%'),
  },

  headerImage: {
    height: wp('12%'),
    width: wp('12%'),
    marginRight: wp('4%'),
    borderRadius: wp('6%'),
    backgroundColor: '#F9ECE9'
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: '#292825',
    fontSize: 18,
    fontWeight: '700',
  },

  outerMenu: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10
  },
  menuItem: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 20,
    alignItems: 'center'
  },
  menuIcon: {
    fontSize: 25,
    marginRight: 10,
    color: '#828282',
  },
  menuText: {
    fontFamily: 'Poppins-Medium',
    color: '#292825',
    fontWeight: '400',
    fontSize: 16
  }


});
