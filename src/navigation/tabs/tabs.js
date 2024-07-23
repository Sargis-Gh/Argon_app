import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Text, View } from 'react-native'
import DrawerNavigator from '../drawer/Drawer'
import QRScreen from '../../pages/QR/QRScreen'
import QRButton from '../../components/qrButton/QRButton'
import ProfileScreen from '../../pages/profile/ProfileScreen'
import FavoritesScreen from '../../pages/favorites/FavoritesScreen'
import { AppColors, Icons, PageName } from '../../constants/constants'
import UniversitiesScreen from '../../pages/universities/UniversitiesScreen'

const Tab = createBottomTabNavigator()

class BottomTabAuthNavigator extends React.Component {
    render() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: AppColors.white,
                    },
                    tabBarBackground: () => (
                        <View style={{ backgroundColor: AppColors.white }}></View>
                    ),
                }}>
                <Tab.Screen
                    name={PageName.drawer}
                    component={DrawerNavigator}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.home fill={focused ? AppColors.grey : AppColors.articleColor} />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? AppColors.grey : AppColors.articleColor,
                                }}>
                                {PageName.home}
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name={PageName.universities}
                    component={UniversitiesScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.university
                                fill={focused ? AppColors.grey : AppColors.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? AppColors.grey : AppColors.articleColor,
                                }}>
                                {PageName.universities}
                            </Text>
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
                            <Icons.favorite
                                fill={focused ? AppColors.grey : AppColors.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? AppColors.grey : AppColors.articleColor,
                                }}>
                                {PageName.favorites}
                            </Text>
                        ),
                    }}
                />
                <Tab.Screen
                    name={PageName.profile}
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icons.profile
                                fill={focused ? AppColors.grey : AppColors.articleColor}
                            />
                        ),
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: focused ? AppColors.grey : AppColors.articleColor,
                                }}>
                                {PageName.profile}
                            </Text>
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

export default BottomTabAuthNavigator
