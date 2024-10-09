import crashlytics from '@react-native-firebase/crashlytics';

export const recordCrashlyticsError = (err, errorName) => {
    crashlytics().recordError(err, errorName);
};

export const crashlyticsLog = (log) => {
    crashlytics().log(log);
};

export const crashlyticsSetUserId = (id) => {
    crashlytics().setUserId(id);
};

export const crashlyticsSetAttribute = (key, value) => {
    crashlytics().setAttribute(key, value);
};
