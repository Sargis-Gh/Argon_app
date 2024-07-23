import React from 'react'
import { View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import styles from './style'
import { OnBoardingData } from '../../data/data'
import OnboardingButtons from './components/Buttons/OnBoardingButtons'
import OnBoardingRenderItem from './components/renderItem/OnBoardingRenderItem'

class IntroSlider extends React.Component {
    _renderItem = ({ item }) => <OnBoardingRenderItem item={item} />
    render() {
        return <AppIntroSlider data={OnBoardingData} renderItem={this._renderItem} />
    }
}

class OnBoarding extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.background}>
                <IntroSlider />
                <OnboardingButtons navigation={navigation} />
            </View>
        )
    }
}
export default OnBoarding
