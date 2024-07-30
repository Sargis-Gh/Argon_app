import { useNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = useNavigationContainerRef();

/*
 * The refresh current scene functionality is missing from the version 6 navigation library.
 * It's a custom way to support refreshing the current scene without reloading component
 */
export function navigationRefreshWithoutReload(params) {
    if (navigationRef.isReady()) {
        const currentRoute = navigationRef.getCurrentRoute();
        navigationRef.navigate(currentRoute?.name, {
            ...currentRoute?.params,
            ...params,
            paramPropKey: new Date().toISOString(),
        });
    }
}

export function navigationNavigate(navigation, name, params) {
    navigation.navigate(name, params);
}
