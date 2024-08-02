import React from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import styles from './style';
import { getItem, removeItem } from '../../utils/asyncStorage';
import { Styles } from '../../constants/constants';
import UniversitieItem from '../../components/universityItem/UniversityItem';

class FavoritesScreen extends React.Component {
    state = {
        loading: true,
        favorites: null,
    };

    async componentDidMount() {
        await this.initData();
    }

    renderContent = () => {
        const { favorites, loading } = this.state;
        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size={Styles.large} />
                </View>
            );
        }
        return (
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <UniversitieItem item={item} />}
            />
        );
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Favorites</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ favorites: null });
                            removeItem('favorites');
                        }}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
                {this.renderContent()}
            </SafeAreaView>
        );
    }

    initData = async () => {
        try {
            const favorites = await getItem('favorites');
            this.setState({
                favorites: favorites ? Object.values(favorites) : [],
                loading: false,
            });
        } catch (error) {
            console.log('Error: ', error);
            this.setState({ loading: false });
        }
    };
}

export default FavoritesScreen;
