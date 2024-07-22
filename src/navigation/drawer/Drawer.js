import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { PageName } from '../../constants/constants'
import HomeScreen from '../../pages/home/HomeScreen'
import SettingsScreen from '../../pages/settings/SettingsScreen'

const Drawer = createDrawerNavigator()

// class DrawerNavigator extends React.Component {
//     render() {
//         return (
//             <Drawer.Navigator
//                 screenOptions={{ headerShown: false }}
//                 initialRouteName={PageName.tabs}>
//                 <Drawer.Screen name={PageName.tabs} component={Tabs} />
//                 <Drawer.Screen name={PageName.settings} component={SettingsScreen} />
//             </Drawer.Navigator>
//         )
//     }
// }

class DrawerNavigator extends React.Component {
    render() {
        return (
            <Drawer.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={PageName.home}>
                <Drawer.Screen name={PageName.home} component={HomeScreen} />
                <Drawer.Screen name={PageName.settings} component={SettingsScreen} />
            </Drawer.Navigator>
        )
    }
}

export default DrawerNavigator
