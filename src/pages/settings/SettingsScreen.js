import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './style';
import Languages from './components/languages/Languages';
import { AsyncStorageKeys, LanguageLocalizationKey } from '../../constants/constants';

class SettingsScreen extends React.Component {
    state = {
        loading: true,
        selectedLanguage: LanguageLocalizationKey.en,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { loading, selectedLanguage } = this.state;
        if (loading) return this.renderLoadingContent();
        return (
            <View style={styles.container}>
                <Languages selectedLanguage={selectedLanguage} />
            </View>
        );
    }

    renderLoadingContent = () => (
        <View style={styles.renderLoadingContent}>
            <ActivityIndicator />
        </View>
    );

    initData = async () => {
        const selectedLanguage = await AsyncStorage.getItem(AsyncStorageKeys.language);
        this.setState({ selectedLanguage, loading: false });
    };
}

export default SettingsScreen;
