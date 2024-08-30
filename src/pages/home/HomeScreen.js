import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity, View, Text, FlatList, BackHandler } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl } from '../../utils/utils';
import { getHomeData } from '../../providers/home';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomBlurView from '../../components/customBlurView/CustomBlurView';
import CustomCarousel from '../../components/customCarousel/CustomCarousel';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    PageName,
    CreditType,
    filmDefaultSource,
    BackHandlerEvents,
    HomeScreenDataTitles,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationPush } from '../../navigation/navigation';

class HomeScreen extends React.Component {
    state = {
        data: [],
        loading: true,
        wrongData: false,
    };

    componentDidMount() {
        this.initData();
        this.backHandler = BackHandler.addEventListener(
            BackHandlerEvents.hardwareBackPress,
            this.handleBackPress,
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackPress = () => {
        return true;
    };

    render() {
        const { navigation } = this.props;
        const { data, loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        if (wrongData)
            return (
                <WrongDataScreen navigationBar={false} clickRetryButton={this.clickRetryButton} />
            );
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
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.8}
                onPress={navigation.openDrawer}>
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
            activeOpacity={1}
            delayPressIn={100}
            style={styles.item}
            onPress={() => {
                navigationPush(navigation, PageName.movieDetails, {
                    id: item?.id,
                    type: CreditType.movie,
                    title: t('title', LanguageLocalizationNSKey.home),
                });
            }}>
            <FastImage
                style={styles.image}
                defaultSource={filmDefaultSource}
                resizeMode={FastImage.resizeMode.stretch}
                source={{ uri: buildImageUrl(item?.backdrop_path) }}
            />
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.8}
                style={styles.standardItemDetails}>
                <CustomBlurView />
                <Icons.Play />
                <View>
                    <Text style={styles.continue}>
                        {t('texts.continue', LanguageLocalizationNSKey.home)}
                    </Text>
                    <Text style={styles.readyPlayer}>
                        {t('texts.readyPlayer', LanguageLocalizationNSKey.home)}
                    </Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    renderNonStandardItem = ({ item }, navigation) => (
        <TouchableOpacity
            activeOpacity={1}
            delayPressIn={100}
            style={styles.item}
            onPress={() => {
                navigationPush(navigation, PageName.movieDetails, {
                    id: item?.id,
                    type: CreditType.movie,
                });
            }}>
            <FastImage
                style={styles.image}
                defaultSource={filmDefaultSource}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: buildImageUrl(item?.backdrop_path) }}
            />
            <View style={styles.nonStandardItemDetails}>
                <CustomBlurView />
                <Text style={styles.title}>{item?.title}</Text>
            </View>
            <View style={styles.rating}>
                <CustomBlurView />
                <Icons.StarHalf />
                <Text style={styles.ratingValue}>{item?.vote_average.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    initData = async () => {
        try {
            const data = await getHomeData();
            this.setState({ data, loading: false, wrongData: false });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            genericErrorHandling(error);
        }
    };
}

export default HomeScreen;
