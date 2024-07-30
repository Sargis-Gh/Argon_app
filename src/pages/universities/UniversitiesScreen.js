import React from 'react';
import { FlatList, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';

import styles from './style';
import { Icons } from '../../constants/Icons';
import { Styles } from '../../constants/constants';
import { getUniversities } from '../../providers/university';

class UniversitiesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            universities: [],
        };
    }

    async componentDidMount() {
        try {
            const { data } = await getUniversities();
            this.setState({ universities: data, loading: false });
        } catch (error) {
            console.log('Error: ', error);
        }
    }

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

    renderContent = (loading, universities) => {
        if (loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size={Styles.large} />
                </View>
            );
        }
        return (
            <FlatList
                data={universities}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => this.renderUniversitiesItem(item)}
            />
        );
    };

    render() {
        const { loading, universities } = this.state;
        return (
            <SafeAreaView styles={styles.container}>
                {this.renderContent(loading, universities)}
            </SafeAreaView>
        );
    }
}

export default UniversitiesScreen;
