import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { introData } from '../../../data/data'
import styles from '../renderItem/style'
import { withTranslation } from 'react-i18next'
import OnBoardingRenderItem from '../renderItem/OnBoardingRenderItem'
import OnboardingButtons from './Buttons/OnBoardingButtons'

const withTranslationHOC = (WrappedComponent) => {
    class HOC extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    return withTranslation()(HOC)
}

class IntroSlider extends React.Component {
    _renderItem = ({ item }) => (
        <OnBoardingRenderItem item={item} />
    )
    render() {
        const { t } = this.props
        const OnBoardingData = introData.map((item) => ({
            ...item,
            title: t(item.title),
        }))
        return (
            <AppIntroSlider
                data={introData}
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
        const { t } = this.props
        return (
            <View style={{ flex: 1 }}>
                <IntroSlider t={t} />
                <OnboardingButtons t={t}/>
            </View>
        )
    }
}
export default withTranslationHOC(Slider)
