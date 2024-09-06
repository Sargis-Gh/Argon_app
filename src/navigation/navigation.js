import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const getCurrentRouteName = () => navigationRef.getCurrentRoute().name;

/*
 * The refresh current scene functionality is missing from the version 6 navigation library.
 * It's a custom way to support refreshing the current scene without reloading component
 */
export const navigationRefreshWithoutReload = (params) => {
    if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute();
        navigationRef.navigate(currentRoute?.name, {
            ...params,
            ...currentRoute?.params,
            paramPropKey: new Date().toISOString(),
        });
    }
};

export const navigationGoBack = (navigation) => navigation.goBack();
export const navigationReplace = (navigation, name) => navigation.replace(name);
export const navigationPush = (navigation, name, params) => navigation.push(name, params);
