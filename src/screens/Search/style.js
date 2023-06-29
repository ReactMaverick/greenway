import {Dimensions, StyleSheet, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BKColor} from '../../common/values/BKColor';
export default StyleSheet.create({
  searchSection: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  searchSectionText: {
    flexDirection: 'row',
    fontFamily: 'Poppins-bold',
    fontSize: 14,
    color: '#000',
    paddingLeft: 5,
    width: '88%',
  },
  searchIcon: {
    fontSize: 20,
    color: '#989898',
  },
  searchImage: {
    width: 50,
    height: 50,
  },
  searchResultText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#000',
    marginRight: 10,
    marginLeft: 10,
  },
  searchResultTextCat: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#AB0000',
    marginRight: 10,
    marginLeft: 10,
  },
  searchResult: {
    margin: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  headText: {color: '#2E2E2E', fontSize: 16, margin: 5},
  headerIcon: {
    height: wp('10%'),
    width: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#E1EFE5',
    justifyContent: 'center',
    alignItems: 'center',
    icon: {},
  },
  pageContainerStyle2: {
    // marginHorizontal: wp("3%"),
    // marginVertical: hp("1%"),
    // flex: 1,
    paddingHorizontal: wp('4.5%'),
    backgroundColor: BKColor.white,
    height: '100%',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('3%'),
  },
});
