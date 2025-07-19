import { View, Text, Image } from 'react-native'
import React from 'react'
import { platform } from '../../common/values/BKConstants'
import { commonStyle } from '../../common/values/BKStyles'
import Ctext from '../../common/components/Ctext'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Style } from './Style'
import { STARTINGPAGE_BACK_TEXTURE } from '../../common/values/images'
import LinearGradient from 'react-native-linear-gradient'

export default function GetStarted() {
    return (
        <KeyboardAvoidingView
            behavior={platform === 'ios' ? 'padding' : 'height'}
            style={commonStyle.keyboardAvoidingView}>
            <SafeAreaView style={{ ...commonStyle.safeAreaView, position: 'relative' }}>
                <View style={Style.background}>
                    <LinearGradient
                        colors={['#000000', '#000000']}
                        style={{ width: '100%', height: '30%' }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    />
                    <Image style={{ width: '100%', height: '100%' }} resizeMode='cover' source={STARTINGPAGE_BACK_TEXTURE} />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}