import React from 'react';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

import styles from './style';
import { t } from '../../localization/i18n';
import { Icons } from '../../constants/Icons';
import { buildImageUrl } from '../../utils/utils';
import Divider from '../../components/divider/Divider';
import { getPersonDetails } from '../../providers/personDetails';
import { genericErrorHandling } from '../../utils/errorHandlers';
import CustomBlurView from '../../components/customBlurView/CustomBlurView';
import WrongDataScreen from '../../components/wrongDataScreen/WrongDataScreen';
import CustomActivityIndicator from '../../components/activityIndicator/CustomActivityIndicator';
import {
    Styles,
    PageName,
    CreditType,
    filmDefaultSource,
    carouselItemCountLimit,
    LanguageLocalizationNSKey,
} from '../../constants/constants';

import { navigationGoBack, navigationPush } from '../../navigation/navigation';

class PersonDetailsScreen extends React.Component {
    state = {
        person: {},
        loading: true,
        tvCredits: {},
        wrongData: false,
        movieCredits: {},
    };

    componentDidMount() {
        this.initData();
    }

    render() {
        const { navigation } = this.props;
        const { title } = this.props.route.params;
        const { person, movieCredits, tvCredits, loading, wrongData } = this.state;
        if (loading) return <CustomActivityIndicator />;
        if (wrongData)
            return (
                <WrongDataScreen
                    title={title}
                    navigation={navigation}
                    pageName={PageName.home}
                    clickRetryButton={this.clickRetryButton}
                />
            );
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {this.renderHeader(person, navigation)}
                {this.renderAboutPerson(person, tvCredits, navigation, movieCredits)}
            </ScrollView>
        );
    }

    renderHeader = ({ profile_path, name }, navigation) => (
        <View
            style={
                (!!profile_path && styles.headerContainer) || styles.headerContainerWithoutImage
            }>
            {!!profile_path && (
                <FastImage
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{ uri: buildImageUrl(profile_path) }}
                />
            )}
            {!!name && <Text style={styles.name}>{name}</Text>}
            <TouchableOpacity
                delayPressIn={100}
                activeOpacity={0.8}
                style={styles.backIcon}
                onPress={() => {
                    navigationGoBack(navigation);
                }}>
                <CustomBlurView />
                <Icons.Left />
            </TouchableOpacity>
        </View>
    );

    renderAboutPerson = (
        { biography, birthday, popularity },
        tvCredits,
        navigation,
        movieCredits,
    ) => (
        <View style={styles.aboutContainer}>
            <View style={styles.horizontalContainer}>
                {!!popularity &&
                    this.renderInfoContainer(
                        <Icons.StarHalf />,
                        popularity?.toFixed(1),
                        t('popularity', LanguageLocalizationNSKey.personDetails),
                    )}
                {!!birthday &&
                    this.renderInfoContainer(
                        <Icons.Schedule />,
                        birthday,
                        t('birthday', LanguageLocalizationNSKey.personDetails),
                    )}
            </View>
            {(!!popularity || !!birthday) && <Divider />}
            {!!movieCredits.cast.length > 0 &&
                this.renderCarousel(
                    navigation,
                    movieCredits.cast,
                    CreditType.movie,
                    t('filmsFeaturing', LanguageLocalizationNSKey.personDetails),
                )}
            {!!tvCredits.cast.length > 0 &&
                this.renderCarousel(
                    navigation,
                    tvCredits.cast,
                    CreditType.tvShow,
                    t('tvShowsFeaturing', LanguageLocalizationNSKey.personDetails),
                )}
            {(!!movieCredits.cast.length > 0 || !!tvCredits.cast.length > 0) && <Divider />}
            {!!biography && (
                <View style={styles.verticalContainer}>
                    <Text style={styles.title}>
                        {t('biography', LanguageLocalizationNSKey.personDetails)}
                    </Text>
                    <Text style={styles.text}>{biography}</Text>
                </View>
            )}
            <View style={styles.footer}></View>
        </View>
    );

    renderInfoContainer = (icon, info, title) => (
        <View style={styles.infoContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.subInfoContainer}>
                {icon}
                <Text style={styles.text}>{info}</Text>
            </View>
        </View>
    );

    renderCarousel = (navigation, cast, type, title) => (
        <>
            <Text style={styles.carouselTitle}>{title}</Text>
            <Carousel
                loop={true}
                autoFillData={false}
                pagingEnabled={true}
                mode={Styles.parallax}
                {...styles.baseOptions}
                data={cast.slice(0, carouselItemCountLimit)}
                panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
                renderItem={(item) => this.renderItem(item, navigation, type)}
            />
        </>
    );

    renderItem = ({ item }, navigation, type, title) => (
        <TouchableOpacity
            activeOpacity={1}
            delayPressIn={100}
            style={styles.item}
            onPress={() => {
                navigationPush(navigation, PageName.movieDetails, {
                    type,
                    id: item?.id,
                    title: t('actors', LanguageLocalizationNSKey.common),
                });
            }}>
            <FastImage
                style={styles.itemImage}
                defaultSource={filmDefaultSource}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: buildImageUrl(item?.backdrop_path) }}
            />
            {!!item?.title && (
                <View style={styles.details}>
                    <CustomBlurView />
                    <Text style={styles.title}>{item?.title}</Text>
                </View>
            )}
            {!!item?.vote_average && (
                <View style={styles.rating}>
                    <CustomBlurView />
                    <Icons.Rating />
                    <Text style={styles.title}>{item?.vote_average.toFixed(1)}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    clickRetryButton = () => {
        this.setState({ loading: true });
        setTimeout(this.initData, 400);
    };

    initData = async () => {
        const { id } = this.props.route.params;
        try {
            const { person, tvCredits, movieCredits } = await getPersonDetails(id);
            this.setState({ person, tvCredits, movieCredits, loading: false, wrongData: false });
        } catch (error) {
            this.setState({ wrongData: true, loading: false });
            genericErrorHandling(error);
        }
    };
}

export default PersonDetailsScreen;
