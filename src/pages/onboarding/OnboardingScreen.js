import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { View } from 'react-native'
import { introData } from '../../data/data'
import OnBoardingRenderItem from './renderItem/OnBoardingRenderItem'
import OnboardingButtons from './components/Buttons/OnBoardingButtons'
import { t } from '../../localization/i18n'

class IntroSlider extends React.Component {
    _renderItem = ({ item }) => <OnBoardingRenderItem item={item} />
    render() {
        const OnBoardingData = introData.map((item) => ({
            ...item,
            title: t(item.title, 'onboarding'),
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

class OnBoarding extends React.Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1 }}>
                <IntroSlider />
                <OnboardingButtons navigation={navigation} />
            </View>
        )
    }
}
export default OnBoarding
