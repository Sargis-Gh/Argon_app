import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import { Icons } from '../../constants/Icons';
import { buildImageUrl, changeFavoriteStatus } from '../../utils/utils';
import { CreditType, DefaultSource, PageName } from '../../constants/constants';

import { navigationNavigate } from '../../navigation/navigation';

class MovieItem extends React.Component {
    shouldComponentUpdate(nextProps) {
        const { isFavorite } = this.props;
        return nextProps.isFavorite !== isFavorite;
    }

    render() {
        const { item, type, isFavorite } = this.props;
        const isMovie = CreditType.movie === type;
        return (
            <TouchableOpacity
                activeOpacity={1}
                delayPressIn={100}
                style={styles.movieContainer(isMovie)}
                onPress={this.openMovieDetails}>
                <FastImage
                    style={styles.image}
                    defaultSource={DefaultSource.film}
                    resizeMode={FastImage.resizeMode.stretch}
                    source={{ uri: buildImageUrl(item?.poster_path) }}>
                    <TouchableOpacity
                        delayPressIn={100}
                        activeOpacity={0.8}
                        onPress={this.handleFavoriteButtonClick}>
                        {(isFavorite && <Icons.Favorite />) || <Icons.NotFavorite />}
                    </TouchableOpacity>
                    {!!item?.vote_average && (
                        <View style={styles.ratingContainer}>
                            <Icons.StarHalf />
                            <Text style={styles.ratingText}>{item?.vote_average?.toFixed(1)}</Text>
                        </View>
                    )}
                </FastImage>
                <View style={styles.movieDetails}>
                    <Text style={styles.movieTitle}>
                        {(CreditType.movie === type && item?.title) || item?.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    handleFavoriteButtonClick = () => {
        const { userId, favorites, setFavorites, item, type, isFavorite } = this.props;
        changeFavoriteStatus(isFavorite, userId, favorites, setFavorites, item, type);
    };

    openMovieDetails = () => {
        const {
            type,
            navigation,
            item: { id },
        } = this.props;
        navigationNavigate(navigation, PageName.movieDetails, { id, type });
    };
}

export default MovieItem;
