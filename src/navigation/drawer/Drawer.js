import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { t } from '../../localization/i18n';
import HomeScreen from '../../pages/home/HomeScreen';
import SettingsScreen from '../../pages/settings/SettingsScreen';
import { LanguageLocalizationNSKey } from '../../constants/constants';

const Drawer = createDrawerNavigator();
class DrawerNavigator extends React.Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName={t('title', LanguageLocalizationNSKey.home)}>
                <Drawer.Screen
                    name={t('title', LanguageLocalizationNSKey.home)}
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name={t('title', LanguageLocalizationNSKey.settings)}
                    component={SettingsScreen}
                />
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;
