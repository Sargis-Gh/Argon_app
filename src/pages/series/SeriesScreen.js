import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { getShows } from '../../providers/endpoints';
import { LanguageLocalizationNSKey, PageName, Styles } from '../../constants/constants';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';

class SeriesScreen extends React.Component {
    state = {
        series: [],
        loading: true,
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        if (this.state.loading) return <CustomActivityIndicator />;
        const { series } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {t('series', LanguageLocalizationNSKey.bottomTab)}
                    </Text>
                </View>
                <FlatList
                    data={series}
                    keyExtractor={(item, index) => item[index].id}
                    renderItem={({ item }) => this.renderContent(item)}
                />
            </View>
        );
    }

    renderContent = (data) => {
        const width = Dimensions.get(Styles.window).width;
        return (
            <Carousel
                loop
                data={data}
                height={240}
                width={width}
                renderItem={({ item }) => this.renderItem(item)}
                panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
            />
        );
    };

    renderItem = (item) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => {
                this.props.navigation.navigate(PageName.details, { id: item.id });
            }}>
            {item.image && <Image style={styles.image} source={{ uri: item.image.medium }} />}
        </TouchableOpacity>
    );

    initData = async () => {
        try {
            const series = await getShows();
            this.setState({
                series,
                loading: false,
            });
        } catch (error) {
            console.log('Error: ', error);
            this.setState({ loading: false });
        }
    };
}

export default SeriesScreen;
