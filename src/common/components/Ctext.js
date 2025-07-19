import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FONT_POPPINS, p } from '../values/fontConstants';
import { BKColor } from '../values/BKColor';

export default function Ctext({
    style = StyleSheet.create({}),
    children,
    ...props
}) {
    return (
        <Text style={{ ...styles.text, ...style }} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: FONT_POPPINS,
        fontSize: p,
        color: BKColor.black,
    },
});
