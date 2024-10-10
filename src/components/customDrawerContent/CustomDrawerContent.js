import React from 'react';
import { connect } from 'react-redux';
import { DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { signOut } from '../../utils/utils';
import { Icons } from '../../constants/Icons';
import { analyticsLogEvent } from '../../analytics/analytics';
import { performSignOut } from '../../redux/action/userAction';
import {
    PageName,
    AuthPageWords,
    AnalyticsLogEventName,
    AnalyticsDescriptions,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationReplace } from '../../navigation/navigation';

class CustomDrawerContent extends React.Component {
    render() {
        const {
            user: { firstName, lastName, email },
        } = this.props;
        const isGuest = AuthPageWords.guest === email;
        const buttonText = (isGuest && AuthPageWords.signIn) || AuthPageWords.signOut;
        const name = (isGuest && t('texts.guest', LanguageLocalizationNSKey.auth)) || firstName;
        return (
            <View {...this.props} style={styles.container}>
                <View style={styles.header}>
                    <Icons.Profile />
                    <Text style={styles.userText}>{name}</Text>
                    <Text style={styles.userText}>{lastName}</Text>
                </View>
                <View style={styles.drawerItems}>
                    <DrawerItemList {...this.props} />
                </View>
                <TouchableOpacity
                    delayPressIn={100}
                    activeOpacity={0.4}
                    style={styles.button}
                    onPress={this.handleButtonPress}>
                    <Text style={styles.text(isGuest)}>
                        {t(`texts.${buttonText}`, LanguageLocalizationNSKey.auth)}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    handleButtonPress = async () => {
        const {
            navigation,
            performSignOut,
            user: { email },
        } = this.props;
        navigationReplace(navigation, PageName.auth);
        const isGuest = AuthPageWords.guest === email;
        analyticsLogEvent(AnalyticsLogEventName.buttonClick, {
            pageName: PageName.drawer,
            description:
                (isGuest && AnalyticsDescriptions.signIn) || AnalyticsDescriptions.createAccount,
        });
        if (isGuest) return;
        await signOut(email);
        performSignOut();
    };
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    performSignOut: () => dispatch(performSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
