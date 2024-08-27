import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl } from '../../utils/utils';
import { getHomeData } from '../../providers/home';
import { navigationNavigate } from '../../navigation/navigation';
import CustomBlurView from '../../components/customBlurView/CustomBlurView';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    PageName,
    HomeScreenDataTitles,
    LanguageLocalizationNSKey,
} from '../../constants/constants';
import { genericErrorHandling } from '../../utils/errorHandlers';

class HomeScreen extends React.Component {
    state = {
        data: [],
        loading: true,
    };
    componentDidMount() {
        this.initData();
    }

    render() {
        const { navigation } = this.props;
        const { data, loading } = this.state;
        if (loading) return <CustomActivityIndicator />;
        return (
            <View style={styles.container}>
                {this.renderHeader(navigation)}
                <FlatList
                    data={data}
                    keyExtractor={(item) => item?.title}
                    ListFooterComponent={<View style={styles.listFooterComponent} />}
                    renderItem={({ item }) =>
                        this.renderCarousel(item.data, navigation, item.title)
                    }
                />
            </View>
        );
    }

    renderHeader = (navigation) => (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={navigation.openDrawer}>
                <Icons.Menu />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('title', LanguageLocalizationNSKey.home)}</Text>
        </View>
    );

    renderCarousel = (data, navigation, title) => {
        const isStandard = title !== HomeScreenDataTitles[1];
        const renderItem = isStandard ? this.renderStandardItem : this.renderNonStandardItem;
        const bottomDivider = title !== HomeScreenDataTitles[HomeScreenDataTitles.length - 1];
        return (
            <CustomCarousel
                data={data}
                title={title}
                navigation={navigation}
                isStandard={isStandard}
                bottomDivider={bottomDivider}
                renderItem={renderItem}
            />
        );
    };

    renderStandardItem = ({ item }, navigation) => (
        <TouchableOpacity
            style={styles.item}
            activeOpacity={1}
            onPress={() => {
                navigationNavigate(navigation, PageName.details, { id: item?.id });
            }}>
            <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.stretch}
                source={{ uri: buildImageUrl(item?.backdrop_path) }}
            />
            <TouchableOpacity style={styles.standardItemDetails} activeOpacity={0.9}>
                <CustomBlurView />
                <Icons.Play />
                <View>
                    <Text style={styles.continue}>
                        {t('continue', LanguageLocalizationNSKey.common)}
                    </Text>
                    <Text style={styles.readyPlayer}>
                        {t('readyPlayer', LanguageLocalizationNSKey.common)}
                    </Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    renderNonStandardItem = ({ item }, navigation) => (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.item}
            onPress={() => {
                navigationNavigate(navigation, PageName.details, { id: item?.id });
            }}>
            <FastImage
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: buildImageUrl(item?.backdrop_path) }}
            />
            <View style={styles.nonStandardItemDetails}>
                <CustomBlurView />
                <Text style={styles.title}>{item?.title}</Text>
            </View>
            <View style={styles.rating}>
                <CustomBlurView />
                <Icons.Rating />
                <Text style={styles.ratingValue}>{item?.vote_average.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );

    initData = async () => {
        try {
            const data = await getHomeData();
            this.setState({ data, loading: false });
        } catch (error) {
            this.setState({ data: [] });
            genericErrorHandling(error);
        }
    };
}

export default HomeScreen;
