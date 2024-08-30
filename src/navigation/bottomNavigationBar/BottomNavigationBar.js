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
    renderTabBarLabel = (pageName, focused) => {
        return (
            <Text
                style={{
                    color: (focused && Styles.appBackground) || Styles.grey,
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
                    tabBarStyle: styles.tabBarStyle,
                    tabBarBackground: () => <View style={styles.container}></View>,
                }}>
                <BottomTab.Screen
                    name={PageName.drawer}
                    component={DrawerNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Home fill={(focused && Styles.appBackground) || Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('home', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                        unmountOnBlur: true,
                    }}
                />
                <BottomTab.Screen
                    name={PageName.movies}
                    component={MoviesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Movie fill={(focused && Styles.appBackground) || Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('movies', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                        unmountOnBlur: true,
                    }}
                />
                <BottomTab.Screen
                    name={PageName.qr}
                    component={QRScreen}
                    options={{
                        tabBarButton: ({ onPress }) => (
                            <TouchableOpacity
                                delayPressIn={100}
                                activeOpacity={1}
                                style={styles.touchableContent}
                                onPress={onPress}>
                                <Icons.QRIcon fill={Styles.appBackground} />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <BottomTab.Screen
                    name={PageName.favorites}
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Favorite
                                fill={(focused && Styles.appBackground) || Styles.grey}
                            />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('favorites', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                        unmountOnBlur: true,
                    }}
                />
                <BottomTab.Screen
                    name={PageName.series}
                    component={SeriesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Series fill={(focused && Styles.appBackground) || Styles.grey} />
                        ),
                        tabBarLabel: ({ focused }) =>
                            this.renderTabBarLabel(
                                t('series', LanguageLocalizationNSKey.bottomTab),
                                focused,
                            ),
                        unmountOnBlur: true,
                    }}
                />
            </BottomTab.Navigator>
        );
    }
}

export default BottomTabNavigator;
