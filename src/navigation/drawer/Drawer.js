import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import HomeScreen from '../../pages/home/HomeScreen';
import SettingsScreen from '../../pages/settings/SettingsScreen';
import { LanguageLocalizationNSKey, PageName } from '../../constants/constants';
import TermsAndConditions from '../../pages/termsAndConditions/TermsAndConditions';
import CustomDrawerContent from '../../components/customDrawerContent/CustomDrawerContent';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
    render() {
        return (
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                initialRouteName={t('title', LanguageLocalizationNSKey.home)}>
                <Drawer.Screen
                    name={PageName.home}
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        unmountOnBlur: true,
                        drawerIcon: Icons.Home,
                        title: t('title', LanguageLocalizationNSKey.home),
                    }}
                />
                <Drawer.Screen
                    name={PageName.settings}
                    component={SettingsScreen}
                    options={{
                        drawerIcon: Icons.Settings,
                        title: t('title', LanguageLocalizationNSKey.settings),
                    }}
                />
                <Drawer.Screen
                    name={PageName.termsAndConditions}
                    component={TermsAndConditions}
                    options={{
                        headerShown: false,
                        drawerIcon: Icons.TermsAndConditions,
                        title: t('termsAndConditions', LanguageLocalizationNSKey.common),
                    }}
                />
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;
