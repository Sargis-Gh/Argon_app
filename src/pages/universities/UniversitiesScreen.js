import React from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { getUniversities } from '../../providers/university';
import { LanguageLocalizationNSKey, Styles } from '../../constants/constants';

class UniversitiesScreen extends React.Component {
    state = {
        loading: true,
        dataLength: 20,
        universities: [],
        refreshing: false,
    };

    async componentDidMount() {
        await this.fetchUniversities();
    }

    fetchUniversities = async () => {
        try {
            const { data } = await getUniversities();
            this.setState({ universities: data, loading: false });
        } catch (error) {
            console.log('Error: ', error);
            this.setState({ loading: false });
        }
    };

    onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.fetchUniversities();
        this.setState({ refreshing: false });
    };

    renderUniversitiesItem = (item) => (
        <View style={styles.item}>
            <View style={styles.itemInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.location}>
                    <Icons.Location fill={Styles.grey} />
                    <Text style={styles.countryName}>{item.country}</Text>
                </View>
            </View>
            <View style={styles.addToFavorites}>
                <Icons.Favorite fill={Styles.textInputGrey} />
            </View>
        </View>
    );

    renderContent = () => {
        const { loading, universities } = this.state;
        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size={Styles.large} />
                </View>
            );
        }
        return (
            <FlatList
                data={universities.slice(0, this.state.dataLength)}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => this.renderUniversitiesItem(item)}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
                ListFooterComponent={this.renderShowMoreButton()}
            />
        );
    };

    renderShowMoreButton = () => {
        const { dataLength } = this.state;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.showMoreButton}
                onPress={() => {
                    this.setState({ dataLength: dataLength + 20 });
                }}>
                <Text style={styles.showMoreButtonText}>
                    {t('showMore', LanguageLocalizationNSKey.common)}
                </Text>
                <Icons.ArrowDown />
            </TouchableOpacity>
        );
    };

    render() {
        return <SafeAreaView styles={styles.container}>{this.renderContent()}</SafeAreaView>;
    }
}

export default UniversitiesScreen;
