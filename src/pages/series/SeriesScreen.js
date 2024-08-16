import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import FastImage from 'react-native-fast-image';
import { getSeasons } from '../../providers/endpoints';
import { genericErrorHandling } from '../../utils/errorHandlers';
import { PageName, DEVICE_SETTINGS, LanguageLocalizationNSKey } from '../../constants/constants';
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
        const { series, loading } = this.state;
        if (loading) return <CustomActivityIndicator />;
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
        return (
            <Carousel
                loop
                data={data}
                height={240}
                width={DEVICE_SETTINGS.windowWidth}
                renderItem={this.renderItem}
                panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
            />
        );
    };

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => {
                this.props.navigation.navigate(PageName.details, { id: item.id });
            }}>
            {item.image && (
                <FastImage
                    source={{ uri: item.image.medium }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            )}
        </TouchableOpacity>
    );

    initData = async () => {
        try {
            const series = await getSeasons();
            this.setState({
                series,
                loading: false,
            });
        } catch (error) {
            genericErrorHandling(error);
            this.setState({ loading: false });
        }
    };
}

export default SeriesScreen;
