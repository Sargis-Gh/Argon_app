import { NavigationContainer } from '@react-navigation/native';

import MyStack from './stack/StackNavigator';

import { navigationRef } from './navigation';

const AppNavigator = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <MyStack />
        </NavigationContainer>
    );
};

export default AppNavigator;
