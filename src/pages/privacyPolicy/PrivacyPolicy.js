import React from 'react';

import { t } from '../../localization/i18n';
import WebViewComponent from '../../components/webViewComponent/WebViewComponent';
import { LanguageLocalizationNSKey, TermsAndConditionsUrl } from '../../constants/constants';

class PrivacyPolicy extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <WebViewComponent
                navigation={navigation}
                uri={TermsAndConditionsUrl}
                title={t('texts.privacyPolicy', LanguageLocalizationNSKey.auth)}
            />
        );
    }
}

export default PrivacyPolicy;
