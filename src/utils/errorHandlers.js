import { AppWords, CrashlyticsErrorNames } from '../constants/constants';
import { crashlyticsSetAttribute, recordCrashlyticsError } from '../crashlytics/crashlytics';

export const errorHandling = (error) => {
    recordCrashlyticsError(error, CrashlyticsErrorNames.genericError);
};

export const apiErrorHandling = (error, page) => {
    crashlyticsSetAttribute(AppWords.page, page);
    recordCrashlyticsError(error, CrashlyticsErrorNames.apiError);
};

export const errorBoundary = (error) => {
    recordCrashlyticsError(error, CrashlyticsErrorNames.crashlyticsErrorBoundary);
};
