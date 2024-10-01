import React from 'react';
import { connect } from 'react-redux';
import { DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { signOut } from '../../utils/utils';
import { Icons } from '../../constants/Icons';
import { performSignOut } from '../../redux/action/userAction';
import { PageName, AuthPageWords, LanguageLocalizationNSKey } from '../../constants/constants';

import { navigationReplace } from '../../navigation/navigation';

class CustomDrawerContent extends React.Component {
    render() {
        const {
            user: { firstName, lastName, email },
        } = this.props;
        const isGuest = AuthPageWords.guest === email;
        const name = (isGuest && t('texts.guest', LanguageLocalizationNSKey.auth)) || firstName;
        return (
            <View {...this.props} style={styles.container}>
                <View style={styles.header}>
                    <Icons.Profile />
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>{lastName}</Text>
                </View>
                <View style={styles.drawerItems}>
                    <DrawerItemList {...this.props} />
                </View>
                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => this.handleButtonPress(isGuest)}>
                    {this.renderFooter(
                        (isGuest && [AuthPageWords.signIn, <Icons.LogIn />]) || [
                            AuthPageWords.signOut,
                            <Icons.LogOut />,
                        ],
                    )}
                </TouchableOpacity>
            </View>
        );
    }

    renderFooter = ([text, icon]) => (
        <>
            <Text style={styles.text}>{t(`texts.${text}`, LanguageLocalizationNSKey.auth)}</Text>
            {icon}
        </>
    );

    handleButtonPress = async (isGuest) => {
        const {
            navigation,
            performSignOut,
            user: { email },
        } = this.props;
        navigationReplace(navigation, PageName.auth);
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
