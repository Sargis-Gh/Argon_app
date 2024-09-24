import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { LanguageLocalizationNSKey, TermsAndConditionsUrl } from '../../constants/constants';

import { navigationGoBack } from '../../navigation/navigation';

class TermsAndConditions extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigationGoBack(navigation)}>
                        <Icons.Back />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        {t('termsAndConditions', LanguageLocalizationNSKey.common)}
                    </Text>
                </View>
                <WebView source={{ uri: TermsAndConditionsUrl }} />
            </View>
        );
    }
}

export default TermsAndConditions;
