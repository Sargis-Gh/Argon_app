import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import DrawerNavigator from '../drawer/Drawer';
import QRScreen from '../../pages/QR/QRScreen';
import SeriesScreen from '../../pages/series/SeriesScreen';
import MoviesScreen from '../../pages/movies/MoviesScreen';
import FavoritesScreen from '../../pages/favorites/FavoritesScreen';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';

const BottomTab = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
    render() {
        return (
            <BottomTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarBackground: this.renderTabBarBackground,
                }}>
                <BottomTab.Screen
                    name={PageName.drawer}
                    component={DrawerNavigator}
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({ focused }) => this.renderIcon(focused, Icons.Home),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('home', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.movies}
                    component={MoviesScreen}
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({ focused }) => this.renderIcon(focused, Icons.Movie),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('movies', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.qr}
                    component={QRScreen}
                    options={{
                        tabBarButton: ({ onPress }) => this.renderQRButton(onPress),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.favorites}
                    component={FavoritesScreen}
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({ focused }) => this.renderIcon(focused, Icons.FavoriteBottom),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('favorites', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.series}
                    component={SeriesScreen}
                    options={{
                        unmountOnBlur: true,
                        tabBarIcon: ({ focused }) => this.renderIcon(focused, Icons.Series),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('series', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                    }}
                />
            </BottomTab.Navigator>
        );
    }

    renderTabBarBackground = () => <View style={styles.container} />;

    renderQRButton = (onPress) => (
        <TouchableOpacity
            activeOpacity={1}
            delayPressIn={100}
            style={styles.touchableContent}
            onPress={onPress}>
            <Icons.QRIcon />
        </TouchableOpacity>
    );

    renderTabBarLabel = (pageName, focused) => (
        <Text
            style={{
                color: (focused && Styles.appBackground) || Styles.grey,
            }}>
            {pageName}
        </Text>
    );

    renderIcon = (focused, IconComponent) => (
        <IconComponent fill={(focused && Styles.appBackground) || Styles.grey} />
    );
}

export default BottomTabNavigator;
