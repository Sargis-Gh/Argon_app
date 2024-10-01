import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import HomeScreen from '../../pages/home/HomeScreen';
import SettingsScreen from '../../pages/settings/SettingsScreen';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';
import TermsAndConditions from '../../pages/termsAndConditions/TermsAndConditions.js';
import CustomDrawerContent from '../../components/customDrawerContent/CustomDrawerContent';
import PrivacyPolicy from '../../pages/privacyPolicy/PrivacPolicy.js';

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
                        title: t('title', LanguageLocalizationNSKey.home),
                        drawerIcon: ({ focused }) => (
                            <Icons.Home fill={(focused && Styles.white) || Styles.appBackground} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={PageName.settings}
                    component={SettingsScreen}
                    options={{
                        title: t('title', LanguageLocalizationNSKey.settings),
                        drawerIcon: ({ focused }) => (
                            <Icons.Settings
                                fill={(focused && Styles.white) || Styles.appBackground}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={PageName.termsAndConditions}
                    component={TermsAndConditions}
                    options={{
                        headerShown: false,
                        title: t('termsAndConditions', LanguageLocalizationNSKey.common),
                        drawerIcon: ({ focused }) => (
                            <Icons.TermsAndConditions
                                fill={(focused && Styles.white) || Styles.appBackground}
                            />
                        ),
                    }}
                />
                <Drawer.Screen
                    name={PageName.privacyPolicy}
                    component={PrivacyPolicy}
                    options={{
                        headerShown: false,
                        title: t('texts.privacyPolicy', LanguageLocalizationNSKey.auth),
                        drawerIcon: ({ focused }) => (
                            <Icons.TermsAndConditions
                                fill={(focused && Styles.white) || Styles.appBackground}
                            />
                        ),
                    }}
                />
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;
