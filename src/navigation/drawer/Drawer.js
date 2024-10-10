import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import styles from './style.js';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import HomeScreen from '../../pages/home/HomeScreen';
import SettingsScreen from '../../pages/settings/SettingsScreen';
import PrivacyPolicy from '../../pages/privacyPolicy/PrivacyPolicy.js';
import TermsAndConditions from '../../pages/termsAndConditions/TermsAndConditions.js';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';
import CustomDrawerContent from '../../components/customDrawerContent/CustomDrawerContent';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
    render() {
        return (
            <Drawer.Navigator
                screenOptions={{
                    drawerActiveTintColor: Styles.white,
                    drawerActiveBackgroundColor: Styles.appBackground,
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName={t('title', LanguageLocalizationNSKey.home)}>
                <Drawer.Screen
                    name={PageName.home}
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        unmountOnBlur: true,
                        title: ({ focused }) =>
                            this.renderPageTitle(
                                focused,
                                t('title', LanguageLocalizationNSKey.home),
                            ),
                        drawerIcon: ({ focused }) => this.renderDrawerIcon(focused, Icons.Home),
                    }}
                />
                <Drawer.Screen
                    name={PageName.settings}
                    component={SettingsScreen}
                    options={{
                        title: ({ focused }) =>
                            this.renderPageTitle(
                                focused,
                                t('title', LanguageLocalizationNSKey.settings),
                            ),
                        headerTitle: ({ focused }) =>
                            this.renderPageTitle(
                                focused,
                                t('title', LanguageLocalizationNSKey.settings),
                            ),
                        drawerIcon: ({ focused }) => this.renderDrawerIcon(focused, Icons.Settings),
                    }}
                />
                <Drawer.Screen
                    name={PageName.termsAndConditions}
                    component={TermsAndConditions}
                    options={{
                        headerShown: false,
                        title: ({ focused }) =>
                            this.renderPageTitle(
                                focused,
                                t('termsAndConditions', LanguageLocalizationNSKey.common),
                            ),
                        drawerIcon: ({ focused }) =>
                            this.renderDrawerIcon(focused, Icons.TermsAndConditions),
                    }}
                />
                <Drawer.Screen
                    name={PageName.privacyPolicy}
                    component={PrivacyPolicy}
                    options={{
                        headerShown: false,
                        title: ({ focused }) =>
                            this.renderPageTitle(
                                focused,
                                t('texts.privacyPolicy', LanguageLocalizationNSKey.auth),
                            ),
                        drawerIcon: ({ focused }) =>
                            this.renderDrawerIcon(focused, Icons.TermsAndConditions),
                    }}
                />
            </Drawer.Navigator>
        );
    }

    renderDrawerIcon = (focused, IconComponent) => (
        <IconComponent fill={(focused && Styles.white) || Styles.appBackground} />
    );

    renderPageTitle = (focused, title) => <Text style={styles.pageTitle(focused)}>{title}</Text>;
}

export default DrawerNavigator;
