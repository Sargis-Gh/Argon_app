import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { introData } from '../../../data/data'
import styles from '../renderItem/style'
import OnBoardingRenderItem from '../renderItem/OnBoardingRenderItem'
import OnboardingButtons from './Buttons/OnBoardingButtons'
import { t } from '../../../localization/i18n'

class IntroSlider extends React.Component {
    _renderItem = ({ item }) => <OnBoardingRenderItem item={item} />
    render() {
        const OnBoardingData = introData.map((item) => ({
            ...item,
            title: t(item.title),
        }))
        return (
            <AppIntroSlider
                data={OnBoardingData}
                renderItem={this._renderItem}
                // renderSkipButton={this._renderSkipButton}
                // renderDoneButton={this._renderDoneButton}
                // renderNextButton={this._renderNextButton}
                // showSkipButton={true}
            />
        )
    }
}

class Slider extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <IntroSlider />
                <OnboardingButtons />
            </View>
        )
    }
}
export default Slider
