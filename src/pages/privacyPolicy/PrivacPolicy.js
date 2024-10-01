import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { LanguageLocalizationNSKey, TermsAndConditionsUrl } from '../../constants/constants';

import { navigationGoBack } from '../../navigation/navigation';

class PrivacyPolicy extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigationGoBack(navigation)}>
                        <Icons.Back />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {t('texts.privacyPolicy', LanguageLocalizationNSKey.auth)}
                    </Text>
                </View>
                <WebView source={{ uri: TermsAndConditionsUrl }} />
            </View>
        );
    }
}

export default PrivacyPolicy;
