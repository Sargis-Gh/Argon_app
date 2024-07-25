import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import styles from './style'
import { Text, View } from 'react-native'
import { t } from '../../localization/i18n'
import { Icons } from '../../constants/Icons'
import DrawerNavigator from '../drawer/Drawer'
import QRScreen from '../../pages/QR/QRScreen'
import QRButton from '../../components/qrButton/QRButton'
import ProfileScreen from '../../pages/profile/ProfileScreen'
import FavoritesScreen from '../../pages/favorites/FavoritesScreen'
import UniversitiesScreen from '../../pages/universities/UniversitiesScreen'
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants'

const Tab = createBottomTabNavigator()

class BottomTabAuthNavigator extends React.Component {
    renderTabBarLabel = (pageName, focused) => {
        return (
            <Text
                style={{
                    color: focused ? Styles.grey : Styles.articleColor,
                }}>
                {pageName}
            </Text>
        )
    }
    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: Styles.white,
                    },
                    tabBarBackground: () => (
                        <View style={styles.tabBarBackground}></View>
                    ),
                }}>
                <Tab.Screen
                    name={PageName.drawer}
                    component={DrawerNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Home fill={focused ? Styles.grey : Styles.articleColor} />
                        ),
                        tabBarLabel: ({ focused }) => (
                            this.renderTabBarLabel(t('home', LanguageLocalizationNSKey.footerTab), focused)
                        ),
                    }}
                />
                <Tab.Screen
                    name={PageName.universities}
                    component={UniversitiesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.University
                                fill={focused ? Styles.grey : Styles.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            this.renderTabBarLabel(t('university', LanguageLocalizationNSKey.footerTab), focused)
                        ),
                    }}
                />
                <Tab.Screen
                    name={PageName.qr}
                    component={QRScreen}
                    options={{
                        tabBarButton: (props) => <QRButton {...props} />,
                    }}
                />
                <Tab.Screen
                    name={PageName.favorites}
                    component={FavoritesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Favorite
                                fill={focused ? Styles.grey : Styles.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            this.renderTabBarLabel(t('favorite', LanguageLocalizationNSKey.footerTab), focused)
                        ),
                    }}
                />
                <Tab.Screen
                    name={PageName.profile}
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.Profile
                                fill={focused ? Styles.grey : Styles.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            this.renderTabBarLabel(t('profile', LanguageLocalizationNSKey.footerTab), focused)
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default BottomTabAuthNavigator
