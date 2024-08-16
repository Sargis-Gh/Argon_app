import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { LanguageLocalizationNSKey } from '../../constants/constants';

class Error extends React.Component {
    render() {
        const { resetError } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.errorMessageContainer}>
                    <Icons.Error />
                    <Text style={styles.errorMessageHeader}>
                        {t('errorMessageHeader', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.errorMessageBody}>
                        {t('errorMessageBody', LanguageLocalizationNSKey.common)}
                    </Text>
                </View>
                <TouchableOpacity style={styles.tryAgainButton} onPress={resetError}>
                    <Text style={styles.buttonText}>
                        {t('tryAgain', LanguageLocalizationNSKey.common)}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Error;
