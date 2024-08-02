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
import { getItem, setItem } from '../../utils/asyncStorage';
import { getUniversities } from '../../providers/university';
import CustomTextInput from '../../components/textInput/TextInput';
import UniversitieItem from '../../components/universityItem/UniversityItem';
import { Configs, LanguageLocalizationNSKey, Styles } from '../../constants/constants';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';

class UniversitiesScreen extends React.Component {
    state = {
        ofset: 1,
        loading: true,
        favorites: null,
        initialData: [],
        universities: [],
        refreshing: false,
    };

    async componentDidMount() {
        await this.initData();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderHeader()}
                {/* {this.renderSearchContainer()} */}
                {this.renderContent()}
            </SafeAreaView>
        );
    }

    renderContent = () => {
        const { loading, universities, favorites } = this.state;
        if (loading) return <CustomActivityIndicator />;
        return (
            <FlatList
                data={universities}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <UniversitieItem
                        item={item}
                        isFavorite={!!favorites?.[item.name]}
                        onPress={this.onPressFavoriteIcon}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
                ListHeaderComponent={this.renderSearchContainer()}
                ListFooterComponent={this.renderShowMoreButton()}
            />
        );
    };

    renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>
                {t('univeersities', LanguageLocalizationNSKey.common)}
            </Text>
        </View>
    );

    renderSearchContainer = () => (
        <CustomTextInput
            iconRight={true}
            Icon={<Icons.Search />}
            style={styles.searchContainer}
            textStyle={styles.searchContainerText}
            onChangeText={(text) => this.searchUniversity(text)}
            placeholderText={t('search', LanguageLocalizationNSKey.common)}
        />
    );

    renderShowMoreButton = () => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.showMoreButton}
            onPress={() => {
                const { universities, initialData, ofset } = this.state;
                this.setState({
                    universities: [
                        ...universities,
                        ...initialData.slice(
                            ofset * Configs.universitiesOpacity,
                            (ofset + 1) * Configs.universitiesOpacity,
                        ),
                    ],
                    ofset: ofset + 1,
                });
            }}>
            <Text style={styles.showMoreButtonText}>
                {t('showMore', LanguageLocalizationNSKey.common)}
            </Text>
            <Icons.ArrowDown />
        </TouchableOpacity>
    );

    initData = async () => {
        try {
            const { ofset } = this.state;
            const { data } = await getUniversities();
            const favorites = await getItem('favorites');
            const uniqueData = Array.from(new Map(data.map((item) => [item.name, item])).values());
            this.setState({
                favorites,
                loading: false,
                refreshing: false,
                initialData: uniqueData,
                universities: uniqueData.slice(0, ofset * Configs.universitiesOpacity),
            });
        } catch (error) {
            console.log('Error: ', error);
            this.setState({ loading: false });
        }
    };

    onPressFavoriteIcon = (item) => {
        const { favorites } = this.state;
        let newFavorites = {};
        if (!!favorites?.[item.name]) {
            newFavorites = { ...favorites };
            delete newFavorites[item.name];
        } else {
            newFavorites = { ...favorites, [item.name]: item };
        }
        this.setState({ favorites: newFavorites });
        setItem('favorites', newFavorites);
    };

    onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.initData();
    };

    searchUniversity = (value) => {
        const { initialData, ofset } = this.state;
        if (value == '') {
            this.setState({
                universities: initialData.slice(0, ofset * Configs.universitiesOpacity),
            });
            return;
        }
        const filteredData = initialData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()),
        );
        this.setState({ universities: filteredData });
    };
}

export default UniversitiesScreen;
