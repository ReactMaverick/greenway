import React from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet, Animated, Easing } from 'react-native';
import { BKColor } from '../values/BKColor';

const CustomModal = ({
    visible,
    onClose,
    children,
    style = {},
    backdropColor = 'rgba(0,0,0,0.5)',
}) => {
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 200,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start();
        }
    }, [visible, opacity]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, { backgroundColor: backdropColor, opacity }]} />
            </TouchableWithoutFeedback>

            <View style={{ ...styles.modalContainer, ...style }}>
                {children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        padding: '4%',
        backgroundColor: BKColor.white,
        width: '90%',
        alignSelf: 'center',
        top: '5%',
    },
});

export default CustomModal;
