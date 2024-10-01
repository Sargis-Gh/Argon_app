import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { LanguageLocalizationNSKey } from '../../constants/constants';

import NavigationBar from '../navigationBar/NavigationBar';

class WrongDataScreen extends React.Component {
    render() {
        const { clickRetryButton, navigation, title, navigationBar = true } = this.props;
        return (
            <View style={styles.container}>
                {navigationBar && <NavigationBar navigation={navigation} title={title} />}
                <View style={styles.body}>
                    <Icons.Error />
                    <Text style={styles.title}>
                        {t('errorMessageHeader', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.text}>
                        {t('errorMessageRetry', LanguageLocalizationNSKey.common)}
                    </Text>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.4}
                        style={styles.button}
                        onPress={clickRetryButton}>
                        <Text style={styles.buttonText}>
                            {t('retry', LanguageLocalizationNSKey.common)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default WrongDataScreen;
