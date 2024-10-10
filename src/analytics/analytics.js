import analytics from '@react-native-firebase/analytics';

export const analyticsLogEvent = (eventName, parameters) => {
    analytics().logEvent(eventName, parameters);
};

export const analyticsSetUserId = (id) => {
    analytics().setUserId(id);
};
