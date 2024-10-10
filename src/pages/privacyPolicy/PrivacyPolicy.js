import React from 'react';

import { t } from '../../localization/i18n';
import WebViewComponent from '../../components/webViewComponent/WebViewComponent';
import { LanguageLocalizationNSKey, PrivacyPolicyUrl } from '../../constants/constants';

class PrivacyPolicy extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <WebViewComponent
                uri={PrivacyPolicyUrl}
                navigation={navigation}
                title={t('texts.privacyPolicy', LanguageLocalizationNSKey.auth)}
            />
        );
    }
}

export default PrivacyPolicy;
