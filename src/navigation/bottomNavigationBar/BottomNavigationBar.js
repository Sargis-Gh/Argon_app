import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import DrawerNavigator from '../drawer/Drawer';
import QRScreen from '../../pages/QR/QRScreen';
import ProfileScreen from '../../pages/profile/ProfileScreen';
import FavoritesScreen from '../../pages/favorites/FavoritesScreen';
import UniversitiesScreen from '../../pages/universities/UniversitiesScreen';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';

const BottomTab = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
    renderTabBarLabel = (pageName, focused) => {
        return (
            <Text
                style={{
                    color: focused ? Styles.black : Styles.grey,
                }}>
                {pageName}
            </Text>
        );
    };

    render() {
        return (
            <BottomTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Styles.white,
                    },
                    tabBarBackground: () => <View style={styles.container}></View>,
                }}>
                <BottomTab.Screen
                    name={PageName.drawer}
                    component={DrawerNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Home fill={focused ? Styles.black : Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('home', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.universities}
                    component={UniversitiesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.University fill={focused ? Styles.black : Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('university', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.qr}
                    component={QRScreen}
                    options={{
                        tabBarButton: ({ onPress }) => (
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.touchableContent}
                                onPress={onPress}>
                                <Icons.QRIcon />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.favorites}
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Favorite fill={focused ? Styles.black : Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('favorite', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.profile}
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Profile fill={focused ? Styles.black : Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('profile', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}

export default BottomTabNavigator;
