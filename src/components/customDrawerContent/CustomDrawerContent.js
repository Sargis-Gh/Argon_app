import React from 'react';
import { connect } from 'react-redux';
import { DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { signOut } from '../../utils/utils';
import { Icons } from '../../constants/Icons';
import { performSignOut } from '../../redux/action/authAction';
import { PageName, AuthPageWords, LanguageLocalizationNSKey } from '../../constants/constants';

import { navigationReplace } from '../../navigation/navigation';

class CustomDrawerContent extends React.Component {
    render() {
        const {
            user: {
                details: { firstName, lastName, id },
            },
        } = this.props;
        const isGuest = AuthPageWords.guest === id;
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
                <TouchableOpacity style={styles.logOutButton} onPress={this.signOut}>
                    {(isGuest && this.renderFooter(AuthPageWords.signIn, <Icons.LogIn />)) ||
                        this.renderFooter(AuthPageWords.signOut, <Icons.LogOut />)}
                </TouchableOpacity>
            </View>
        );
    }

    renderFooter = (text, icon) => (
        <>
            <Text style={styles.text}>{t(`texts.${text}`, LanguageLocalizationNSKey.auth)}</Text>
            {icon}
        </>
    );

    signOut = async () => {
        const { navigation, id, performSignOut } = this.props;
        await signOut(id);
        performSignOut();
        navigationReplace(navigation, PageName.auth);
    };
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    performSignOut: () => dispatch(performSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
