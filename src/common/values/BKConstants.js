import {Dimensions, Platform} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const footerHeight = Platform.OS=="android" ? hp("8.9%"): hp("12%");
export const footerIconHeight = hp("5.5%");
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const platform = Platform.OS;
export const statusBarHeight = getStatusBarHeight();
export const navbarHeight = hp("11%");