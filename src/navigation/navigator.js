import { NavigationContainer } from '@react-navigation/native';

import MyStack from './stack/StackNavigator'

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

export default AppNavigator
