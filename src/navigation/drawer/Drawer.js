import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import HomeScreen from '../../pages/home/HomeScreen';
import SettingsScreen from '../../pages/settings/SettingsScreen';
import { LanguageLocalizationNSKey, PageName } from '../../constants/constants';

const Drawer = createDrawerNavigator();
class DrawerNavigator extends React.Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName={t('title', LanguageLocalizationNSKey.home)}>
                <Drawer.Screen
                    name={PageName.home}
                    component={HomeScreen}
                    options={{
                        drawerIcon: Icons.Home,
                        headerStyle: styles.headerContainer,
                        headerTitleStyle: styles.headerTitle,
                        title: t('title', LanguageLocalizationNSKey.home),
                    }}
                />
                <Drawer.Screen
                    name={PageName.settings}
                    component={SettingsScreen}
                    options={{
                        headerStyle: styles.headerContainer,
                        headerTitleStyle: styles.headerTitle,
                        title: t('title', LanguageLocalizationNSKey.settings),
                    }}
                />
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;
