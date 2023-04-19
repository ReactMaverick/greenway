import React, { useState, useEffect } from 'react';
import {

  StatusBar,
  statusBarStyle,
  statusBarTransition
} from 'react-native';
import { BKColor } from '../../values/BKColor';

function CustomStatusBar(props) {
    return (
        <StatusBar
        animated={true}
        backgroundColor={BKColor.textColor2}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={false}
      />
    );
}

export default CustomStatusBar;